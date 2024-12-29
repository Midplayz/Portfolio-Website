import React from "react";
import resumeData from "../data/resume.json";
import "./resume.css";
import resumeFile from "../assets/resume.pdf"; 

const ResumePage = () => {
  return (
    <div className="resume-page">
      <h1 className="resume-title">{resumeData.name}</h1>

      <div className="download-container">
        <a href={resumeFile} download className="download-button">
          Download Resume
        </a>
      </div>

      <p className="resume-about">{resumeData.about}</p>

      <div className="contact">
        <p>
          Email:{" "}
          <a href={`mailto:${resumeData.contact.email}`}>
            {resumeData.contact.email}
          </a>
        </p>
        <p>Phone: {resumeData.contact.phone}</p>
      </div>

      {resumeData.sections.map((section, index) => {
        if (section.title === "Experience") {
          return (
            <div key={index} className="resume-section experience-section">
              <h2>{section.title}</h2>
              <ul>
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <strong>{item.role}</strong>
                    <span className="company">{item.company}</span>
                    <div className="details">
                      <span>{item.duration}</span>
                      <span>• {item.location}</span>
                    </div>
                    {item.description && <p>{item.description}</p>}
                  </li>
                ))}
              </ul>
            </div>
          );
        }
        return (
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
        );
      })}
    </div>
  );
};

export default ResumePage;
