const express = require('express');
const router = express.Router();
const {
  getAllShifts,
  getMyShifts,
  assignShift,
  adminUpdateShift,
  updateShiftStatus,
  deleteShift,
  getShiftStats,
  getShiftInfo
} = require('../controllers/shiftController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

// Public routes
router.get('/info', getShiftInfo);

// Protected routes - require authentication
router.use(protect);

// User routes
router.get('/my', getMyShifts);
router.put('/:id/status', updateShiftStatus);

// Admin routes
router.get('/all', isAdmin, getAllShifts);
router.post('/assign', isAdmin, assignShift);
router.put('/:id', isAdmin, adminUpdateShift);
router.delete('/:id', isAdmin, deleteShift);
router.get('/stats', isAdmin, getShiftStats);

module.exports = router;
