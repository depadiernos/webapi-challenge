import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { navContext } from "../App";
import { getProject } from "../utils/api";

export default function Project(props) {
  const { currentProject, setCurrentProject, actions, setActions } = useContext(
    navContext
  );
  useEffect(() => {
    getProject(props.match.params.id)
      .then(res => {
        setCurrentProject(res);
        setActions(res.actions);
      })
      .catch(err => console.log(err));
  }, [props.match.params.id]);
  return (
    <div>
      <Link to="/">
        <button>&lt;- Back to Projects page</button>
      </Link>
      {currentProject && (
        <div>
          <h1>{currentProject.name}</h1>
          <p>{currentProject.description}</p>
        </div>
      )}
      {actions &&
        actions.map(actions => {
          return (
            <div key={actions.id}>
              <div>
                <h3>{actions.description}</h3>
                <p>{actions.notes}</p>
              </div>
              <input type="checkbox" value={actions.completed} />{" "}
              <button>Edit</button>
              <button>Delete</button>
            </div>
          );
        })}
    </div>
  );
}
