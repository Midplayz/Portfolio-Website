import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import "./fitness-tracker.css";

const FitnessTracker = () => {
  const [markedDates, setMarkedDates] = useState({});
  const [today, setToday] = useState(new Date());
  const [streak, setStreak] = useState(0);
  const year = 2025;
  const userId = "user123";

  useEffect(() => {
    fetchMarkedDates();
  }, []);

  useEffect(() => {
    calculateStreak();
  }, [markedDates]);

  const fetchMarkedDates = async () => {
    const collectionRef = collection(db, "fitness-tracker");
    const snapshot = await getDocs(collectionRef);
    const data = {};
    snapshot.forEach((doc) => {
      if (doc.id === userId) {
        Object.assign(data, doc.data());
      }
    });
    setMarkedDates(data);
  };

  const updateMarkedDate = async (date, status) => {
    const updatedDates = { ...markedDates, [date]: status };
    setMarkedDates(updatedDates);

    const docRef = doc(db, "fitness-tracker", userId);
    await setDoc(docRef, updatedDates, { merge: true });
  };

  const calculateStreak = () => {
    let currentStreak = 0;
    let totalGreenDays = 0;
    const todayDate = today.toISOString().split("T")[0];
    Object.entries(markedDates).forEach(([date, status]) => {
      if (status === "Done") totalGreenDays++;
      if (status === "Done" || status === "Break") {
        if (date <= todayDate) currentStreak++;
      } else if (date <= todayDate) {
        currentStreak = 0;
      }
    });
    setStreak({ totalGreenDays, totalDaysPassed: Object.keys(markedDates).length });
  };

  const getDaysInMonth = (month) => {
    const days = [];
    const date = new Date(year, month, 1);
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  return (
    <div className="fitness-tracker">
      <h1>Fitness Tracker</h1>
      <div className="calendar">
        {[...Array(12).keys()].map((month) => (
          <div key={month} className="month">
            <h3>{new Date(year, month).toLocaleString("default", { month: "long" })}</h3>
            <div className="days">
              {getDaysInMonth(month).map((date) => {
                const dateKey = date.toISOString().split("T")[0];
                const isToday = dateKey === today.toISOString().split("T")[0];
                const status = markedDates[dateKey];
                return (
                  <div
                    key={dateKey}
                    className={`day ${isToday ? "today" : ""} ${status ? status.toLowerCase() : ""}`}
                    onClick={() =>
                      new Date(dateKey) <= today &&
                      updateMarkedDate(dateKey, status === "Done" ? "Missed" : "Done")
                    }
                  >
                    {date.getDate()}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="streak-info">
        <h3>Streak: {streak.totalGreenDays}/{streak.totalDaysPassed}</h3>
      </div>
    </div>
  );
};

export default FitnessTracker;
