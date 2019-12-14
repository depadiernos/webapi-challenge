import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { navContext } from "../App";
import { getProjects, addProject, editProject } from "../utils/api";

export default function Projects() {
  const {
    projects,
    setProjects,
    currentProject,
    setCurrentProject
  } = useContext(navContext);
  useEffect(() => {
    getProjects()
      .then(res => {
        setProjects(res);
      })
      .catch(err => console.log(err));
  }, [setProjects]);
  return (
    <div>
      <h1>Projects</h1>
      {projects &&
        !currentProject &&
        projects.map(project => {
          return (
            <div key={project.id}>
              <div>
                <Link to={`/${project.id}`}>
                  <h3>{project.name}</h3>
                </Link>
                <p>{project.description}</p>
              </div>
              <input type="checkbox" value={project.completed} />
              <button
                onClick={() =>
                  setCurrentProject(
                    projects.filter(
                      selectedProject => selectedProject.id === project.id
                    )
                  )
                }
              >
                Edit
              </button>
              <button>Delete</button>
            </div>
          );
        })}
    </div>
  );
}
