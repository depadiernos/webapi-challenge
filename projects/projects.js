const express = require("express");
const db = require("../data/helpers/projectModel");
const { validateProject, validateProjectId } = require("../middlewares");

const router = express.Router();

router.post("/", validateProject(), async (req, res, next) => {
  try {
    const project = { name: req.body.name, description: req.body.description };
    const newProject = await db.insert(project);
    res.status(201).json(newProject);
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const projects = await db.get();
    res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", validateProjectId(), (req, res, next) => {
  try {
    res.status(200).json(req.project);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", validateProjectId(), async (req, res, next) => {
  try {
    const deletedProject = await db.remove(req.params.id);
    if (deletedProject) res.status(204).json(req.project);
  } catch (err) {
    next(err);
  }
});

router.put(
  "/:id",
  validateProject(),
  validateProjectId(),
  async (req, res, next) => {
    try {
      const project = {
        name: req.body.name,
        description: req.body.description
      };
      const success = await db.update(req.params.id, project);
      const newProject = success && (await db.get(req.params.id));
      res.status(200).json(newProject);
    } catch (err) {
      next(err);
    }
  }
);

router.get("/:id/actions", validateProjectId(), async (req, res, next) => {
  try {
    const actions = await db.getProjectActions(req.params.id);
    res.status(200).json(actions);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
