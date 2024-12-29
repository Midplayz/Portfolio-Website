import React from "react";
import resumeData from "../data/resume.json";
import "./resume.css";

const ResumePage = () => {
  return (
    <div className="resume-page">
      <h1 className="resume-title">{resumeData.name}</h1>
      <p className="resume-about">{resumeData.about}</p>

      <div className="contact">
        <p>
          Email:{" "}
          <a href={`mailto:${resumeData.contact.email}`}>
            {resumeData.contact.email}
          </a>
        </p>
        <p>Phone: {resumeData.contact.phone}</p>
        <p>
          Portfolio:{" "}
          <a
            href={resumeData.contact.portfolio}
            target="_blank"
            rel="noopener noreferrer"
          >
            {resumeData.contact.portfolio}
          </a>
        </p>
      </div>

      {resumeData.sections.map((section, index) => (
        <div key={index} className="resume-section">
          <h2>{section.title}</h2>
          <ul>
            {section.items.map((item, itemIndex) => {
              if (typeof item === "string") {
                return <li key={itemIndex}>{item}</li>;
              }
              if (item.link) {
                return (
                  <li key={itemIndex}>
                    {item.title} -{" "}
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.provider}
                    </a>
                  </li>
                );
              }
              return (
                <li key={itemIndex}>
                  <strong>{item.role || item.degree}</strong>
                  {item.company && <span>{item.company}</span>}
                  <br />
                  {item.location && <span>{item.location}</span>}
                  <br />
                  {item.duration && <span>{item.duration}</span>}
                  {item.description && <p>{item.description}</p>}
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      <div className="resume-footer">
        Designed, Developed, and Maintained by{" "}
        <a
          href={resumeData.contact.portfolio}
          target="_blank"
          rel="noopener noreferrer"
        >
          {resumeData.name}
        </a>
      </div>
    </div>
  );
};

export default ResumePage;
