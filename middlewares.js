const projectDb = require("./data/helpers/projectModel");
const actionDb = require("./data/helpers/actionModel");

const logger = () => (req, res, next) => {
  console.log(`[${new Date().toISOString()}]: ${req.method} - ${req.url}`);
  next();
};

const validateProjectId = () => async (req, res, next) => {
  const projectId = await projectDb.get(req.params.id);
  if (!projectId) {
    return res.status(400).json({ message: "invalid project id" });
  }
  req.project = projectId;
  next();
};

const validateProject = () => (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({ message: "missing project data" });
  }
  if (!req.body.name) {
    return res.status(400).json({ message: "missing required name field" });
  }
  if (!req.body.description) {
    return res
      .status(400)
      .json({ message: "missing required description field" });
  }
  next();
};

const validateAction = () => (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({ message: "missing post data" });
  }
  if (!req.body.description) {
    return res.status(400).json({ message: "missing required description field" });
  }  if (!req.body.notes) {
    return res.status(400).json({ message: "missing required notes field" });
  }  if (!req.body.completed) {
    return res.status(400).json({ message: "missing required completed field or completed field not boolean" });
  }
  next();
};

const validateActionId = () => async (req, res, next) => {
  const action = await actionDb.get(req.params.actionId);
  const project = await projectDb.get(req.params.id);
  if (!project) {
    return res.status(400).json({ message: "invalid user id" });
  } else if (!action) {
    return res.status(400).json({ message: "invalid post id" });
  }
  req.action = action;
  next();
};

module.exports = {
  logger,
  validateProject,
  validateProjectId,
  validateAction,
  validateActionId
};
