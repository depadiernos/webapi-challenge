const express = require("express");
const db = require("../data/helpers/actionModel");
const {
  validateAction,
  validateActionId,
  validateProjectId
} = require("../middlewares");

const router = express.Router({ mergeParams: true });

router.get(
  "/:actionId",
  validateProjectId(),
  validateActionId(),
  (req, res, next) => {
    try {
      res.status(200).json(req.action);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/:actionId",
  validateProjectId(),
  validateActionId(),
  async (req, res, next) => {
    try {
      const deletedAction = await db.remove(req.params.actionId);
      deletedAction && res.status(200).json(req.action);
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/:actionId",
  validateAction(),
  validateProjectId(),
  validateActionId(),
  async (req, res, next) => {
    try {
      const action = {
        description: req.body.description,
        notes: req.body.notes,
        completed: req.body.completed,
        project_id: req.params.id
      };
      const newAction = await db.update(req.params.actionId, action);
      res.status(200).json(newAction);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/",
  validateAction(),
  validateProjectId(),
  async (req, res, next) => {
    try {
      const action = {
        description: req.body.description,
        notes: req.body.notes,
        completed: req.body.completed,
        project_id: req.params.id
      };
      const newAction = await db.insert(action);
      res.status(201).json(newAction);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
