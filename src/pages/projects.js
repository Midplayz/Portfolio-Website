import React, { useState } from "react";
import projectData from "../data/projects.json";
import "./projects.css";

const ProjectsPage = () => {
  const [filters, setFilters] = useState({ engine: [], platform: [] });
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 20;

  const filteredProjects = projectData.filter((project) => {
    if (filters.engine.length && !filters.engine.some((e) => project.engine.includes(e))) return false;
    if (filters.platform.length && !filters.platform.some((p) => project.platforms.includes(p))) return false;
    return true;
  });

  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
      <div className="projects-page">
        <div className="projects-container">
          {/* Filters */}
          <aside className="filters">
            <h3>Filters</h3>
            <div>
              <h4>Game Engine</h4>
              <div className="filter-item">
                <input
                  type="checkbox"
                  id="unity"
                  value="Unity"
                  checked={filters.engine.includes("Unity")}
                  onChange={(e) => handleFilterChange(e, "engine")}
                />
                <label htmlFor="unity">Unity</label>
              </div>
              <div className="filter-item">
                <input
                  type="checkbox"
                  id="unreal"
                  value="Unreal Engine"
                  checked={filters.engine.includes("Unreal Engine")}
                  onChange={(e) => handleFilterChange(e, "engine")}
                />
                <label htmlFor="unreal">Unreal Engine</label>
              </div>
              <div className="filter-item">
                <input
                  type="checkbox"
                  id="godot"
                  value="Godot"
                  checked={filters.engine.includes("Godot")}
                  onChange={(e) => handleFilterChange(e, "engine")}
                />
                <label htmlFor="godot">Godot</label>
              </div>
              <div className="filter-item">
                <input
                  type="checkbox"
                  id="stencyl"
                  value="Stencyl"
                  checked={filters.engine.includes("Stencyl")}
                  onChange={(e) => handleFilterChange(e, "engine")}
                />
                <label htmlFor="stencyl">Stencyl</label>
              </div>
            </div>
            <div>
              <h4>Platform</h4>
              <div className="filter-item">
                <input
                  type="checkbox"
                  id="pc"
                  value="PC"
                  checked={filters.platform.includes("PC")}
                  onChange={(e) => handleFilterChange(e, "platform")}
                />
                <label htmlFor="pc">PC</label>
              </div>
              <div className="filter-item">
                <input
                  type="checkbox"
                  id="mobile"
                  value="Mobile"
                  checked={filters.platform.includes("Mobile")}
                  onChange={(e) => handleFilterChange(e, "platform")}
                />
                <label htmlFor="mobile">Mobile</label>
              </div>
              <div className="filter-item">
                <input
                  type="checkbox"
                  id="web"
                  value="Web"
                  checked={filters.platform.includes("Web")}
                  onChange={(e) => handleFilterChange(e, "platform")}
                />
                <label htmlFor="web">Web</label>
              </div>

            </div>
            <button onClick={clearFilters}>Clear Filters</button>
          </aside>


          {/* Projects Grid */}
          <section className="projects">
            <h1>My Projects</h1>
            <div className="projects-grid">
              {paginatedProjects.map((project) => (
                <div key={project.id} className="project-card">
                  <img src={project.logo} alt={`${project.name} logo`} />
                  <div className="project-info">
                    <h2>{project.name}</h2>
                    <p>{project.date}</p>
                    <div className="tags">
                      {project.engine.map((e) => (
                        <span key={e}>{e}</span>
                      ))}
                      {project.platforms.map((p) => (
                        <span key={p}>{p}</span>
                      ))}
                    </div>
                  </div>
                  <a href={`/projects/${project.slug}`} className="view-more">Learn More</a>
                </div>
              ))}
            </div>
            {/* Pagination */}
            <div className="pagination">
              {Array.from({ length: Math.ceil(filteredProjects.length / itemsPerPage) }).map((_, idx) => (
                <button
                  key={idx + 1}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={currentPage === idx + 1 ? "active" : ""}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
  );

  // Filter Handlers
  function handleFilterChange(e, filterType) {
    const { value, checked } = e.target;
    setFilters((prev) => {
      const updatedFilters = { ...prev };
      if (checked) {
        updatedFilters[filterType].push(value);
      } else {
        updatedFilters[filterType] = updatedFilters[filterType].filter((f) => f !== value);
      }
      return updatedFilters;
    });
  }

  function clearFilters() {
    setFilters({ engine: [], platform: [] });
    setCurrentPage(1);
  }
};

export default ProjectsPage;
