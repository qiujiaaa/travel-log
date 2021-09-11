const { Router } = require('express');

const LogEntry = require('../models/LogEntry');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const entries = await LogEntry.find();
    res.json(entries);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const logEntry = new LogEntry(req.body);
    const created = await logEntry.save();
    res.json(created);
  } catch (error) {
    if (error.name === 'ValidationErro') {
      res.status(422);
    }
    next(error);
  }
});

module.exports = router;
