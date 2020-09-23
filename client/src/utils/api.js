import fetch from "node-fetch";

const url = "http://localhost:5000";
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json"
};

export const getProjects = async () => {
  try {
    const res = await fetch(`${url}/api/projects`, { method: "GET" });
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      return data;
    }
  } catch (err) {
    console.log(err);
  }
};

export const getProject = async id => {
  const res = await fetch(`${url}/api/projects/${id}`, { method: "GET" });
  if (res.status >= 200 && res.status < 300) {
    const data = await res.json();
    return data;
  }
};

export const getActions = async id => {
  const res = await fetch(`${url}/api/projects/${id}/actions`, {
    method: "GET"
  });
  if (res.status >= 200 && res.status < 300) {
    const data = await res.json();
    return data;
  }
};
export const getAction = async (id, actionId) => {
  const res = await fetch(`${url}/api/projects/${id}/actions/${actionId}`, {
    method: "GET"
  });
  if (res.status >= 200 && res.status < 300) {
    const data = await res.json();
    return data;
  }
};

export const addProject = async data => {
  const res = await fetch(`${url}/api/projects`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data)
  });
  if (res.status >= 200 && res.status < 300) {
    const data = await res.json();
    return data;
  }
};

export const addAction = async (id, data) => {
  const res = await fetch(`${url}/api/projects/${id}/actions`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data)
  });
  if (res.status >= 200 && res.status < 300) {
    const data = await res.json();
    return data;
  }
};

export const editProject = async (id, data) => {
  const res = await fetch(`${url}/api/projects/${id}`, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(data)
  });
  if (res.status >= 200 && res.status < 300) {
    const data = await res.json();
    return data;
  }
};

export const editAction = async (id, actionId, data) => {
  const res = await fetch(`${url}/api/projects/${id}/actions/${actionId}`, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(data)
  });
  if (res.status >= 200 && res.status < 300) {
    const data = await res.json();
    return data;
  }
};
