import React, { useState, createContext } from "react";
import { Route, NavLink } from "react-router-dom";
import Projects from "./components/Projects";
import Project from "./components/Project";
import "./App.css";

export const navContext = createContext();

export default function App() {
  const [projects, setProjects] = useState();
  const [actions, setActions] = useState()
  const [currentAction, setCurrentAction] = useState();
  const [currentProject, setCurrentProject] = useState();
  return (
    <navContext.Provider value={{currentProject, currentAction, projects, actions, setCurrentProject, setCurrentAction, setProjects, setActions}}>
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
