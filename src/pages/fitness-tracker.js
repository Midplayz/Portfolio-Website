import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import "./fitness-tracker.css";

const FitnessTracker = () => {
  const [markedDates, setMarkedDates] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());
  const [streak, setStreak] = useState({ totalGreenDays: 0, totalDaysPassed: 0 });
  const userId = "srivishnu";

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

  const updateMarkedDate = async (date, currentStatus) => {
    const nextStatus =
      currentStatus === "Done" ? "Missed" : currentStatus === "Missed" ? "Break" : "Done";
    const updatedDates = { ...markedDates, [date]: nextStatus };
    setMarkedDates(updatedDates);

    const docRef = doc(db, "fitness-tracker", userId);
    await setDoc(docRef, updatedDates, { merge: true });
  };

  const calculateStreak = () => {
    let currentStreak = 0;
    let totalGreenDays = 0;
    const todayDate = new Date().toISOString().split("T")[0];

    const sortedDates = Object.entries(markedDates).sort(([a], [b]) => new Date(a) - new Date(b));

    for (const [date, status] of sortedDates) {
      if (new Date(date) > new Date(todayDate)) {
        continue;
      }

      if (status === "Done") {
        totalGreenDays++;
        currentStreak++;
      } else if (status === "Break") {
        continue;
      } else if (status === "Missed") {
        currentStreak = 0;
      }
    }

    const totalDaysPassed = sortedDates.filter(([date]) => new Date(date) <= new Date(todayDate))
      .length;

    setStreak({
      currentStreak,
      totalGreenDays,
      totalDaysPassed,
    });
  };

  const getDaysInMonth = (year, month) => {
    const days = [];
    const date = new Date(year, month, 1);
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const handlePreviousMonth = () => {
    const newDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
    setCurrentDate(newDate);
  };

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  return (
    <div className="fitness-tracker">
      <h1>Fitness Tracker</h1>
      <div className="calendar-navigation">
        <button onClick={handlePreviousMonth} disabled={currentMonth === 0 && currentYear === 2025}>
          &lt;
        </button>
        <h2>{currentDate.toLocaleString("default", { month: "long", year: "numeric" })}</h2>
        <button
          onClick={handleNextMonth}
        >
          &gt;
        </button>
      </div>
      <div className="calendar">
        {getDaysInMonth(currentYear, currentMonth).map((date) => {
          const dateKey = date.toISOString().split("T")[0];
          const isToday = date.toDateString() === new Date().toDateString();
          const status = markedDates[dateKey];
          return (
            <div
              key={dateKey}
              className={`day ${isToday ? "today" : ""} ${status ? status.toLowerCase() : ""}`}
              onClick={() => date <= new Date() && updateMarkedDate(dateKey, status)}
            >
              {date.getDate()}
            </div>
          );
        })}
      </div>

      <div className="streak-info">
        <h3>Current Streak: {streak.currentStreak}</h3>
        <h3>Total Done: {streak.totalGreenDays}/{streak.totalDaysPassed}</h3>
      </div>
    </div>
  );
};

export default FitnessTracker;
