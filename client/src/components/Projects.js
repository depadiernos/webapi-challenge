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

  const handleChange = e => {
    setCurrentProject({ ...currentProject, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    const data = {
      name: currentProject.name,
      description: currentProject.description,
      completed: currentProject.completed
    };
    e.preventDefault();
    await editProject(currentProject.id, data);
    setProjects(projects =>
      projects.map(project =>
        project.id === currentProject.id ? currentProject : project
      )
    );
    setCurrentProject();
  };

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
      {currentProject && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={currentProject.name}
            onChange={handleChange}
          />
          <input
            type="textarea"
            name="description"
            value={currentProject.description}
            onChange={handleChange}
          />
          <button>Save</button>
          <button
            onClick={e => {
              e.preventDefault();
              setCurrentProject();
            }}
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}
