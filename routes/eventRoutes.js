const express = require('express');
const { createEvent, getEvents, registerForEvent } = require('../controller/eventController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createEvent);
router.get('/', getEvents);
router.post('/:id/register', authMiddleware, registerForEvent);

module.exports = router;
