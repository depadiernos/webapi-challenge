import React, { useState, createContext } from "react";
import { Route, NavLink } from "react-router-dom";
import Projects from "./components/Projects";
import Project from "./components/Project";
import "./App.css";

export const navContext = createContext();

export default function App() {
  const initialProjectState = {
    id: "",
    name: "",
    description: "",
    completed: false
  }
  const initialActionState = {
    id: "",
    project_id: "",
    notes: "",
    description: "",
    completed: false
  }
  
  const [projects, setProjects] = useState();
  const [actions, setActions] = useState()
  const [currentAction, setCurrentAction] = useState(initialActionState);
  const [currentProject, setCurrentProject] = useState(initialProjectState);
  return (
    <navContext.Provider value={{currentProject, currentAction, projects, actions, setCurrentProject, setCurrentAction, setProjects, setActions, initialActionState, initialProjectState}}>
      <div className="App">
        <nav>
          <NavLink to='/'></NavLink>
        </nav>
        <Route exact path="/" component={Projects} />
        <Route path="/:id" component={Project} />
      </div>
    </navContext.Provider>
  );
}
