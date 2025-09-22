const Shift = require('../models/Shift');

class ShiftAssignmentStrategy {
  // Must return an object describing assignment plan
  // For single assignment: { type: 'single', startTime, endTime }
  // For batch assignment: { type: 'batch', items: [{ startTime, endTime }, ...] }
  // Additionally may include conflict messages: { canAssign: boolean, reason?: string }
  /* eslint-disable @typescript-eslint/no-unused-vars */
  async plan(userId, shiftType, payload) {
    throw new Error('plan() must be implemented');
  }
}

function getShiftWindowForType(shiftType, dateOnly) {
  // dateOnly: a string like '2025-09-22' or Date object representing the day
  const base = new Date(dateOnly);
  const year = base.getFullYear();
  const month = base.getMonth();
  const day = base.getDate();

  const start = new Date(year, month, day, 0, 0, 0, 0);

  const setTime = (d, h, m) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), h, m, 0, 0);

  switch ((shiftType || '').toLowerCase()) {
    case 'morning': {
      const startTime = setTime(start, 6, 0);
      const endTime = setTime(start, 14, 0);
      return { startTime, endTime };
    }
    case 'evening': {
      const startTime = setTime(start, 14, 0);
      const endTime = setTime(start, 22, 0);
      return { startTime, endTime };
    }
    case 'night': {
      const startTime = setTime(start, 22, 0);
      const endTime = setTime(new Date(year, month, day + 1, 0, 0, 0, 0), 6, 0); // next day 6:00
      return { startTime, endTime };
    }
    default:
      throw new Error(`Unknown shift type: ${shiftType}`);
  }
}

async function hasConflict(userId, startTime, endTime) {
  const conflictingShift = await Shift.findOne({
    userId: userId,
    startTime: { $lt: endTime },
    endTime: { $gt: startTime },
    status: { $in: ['assigned', 'confirmed'] }
  });
  return Boolean(conflictingShift);
}

class UserDefinedStrategy extends ShiftAssignmentStrategy {
  // payload: { date: 'YYYY-MM-DD' }
  async plan(userId, shiftType, payload) {
    if (!payload?.date) throw new Error('date is required for userDefined strategy');
    const { startTime, endTime } = getShiftWindowForType(shiftType, payload.date);

    const conflict = await hasConflict(userId, startTime, endTime);
    if (conflict) {
      return { type: 'single', canAssign: false, reason: 'User already has a shift during this time period' };
    }

    return { type: 'single', canAssign: true, startTime, endTime };
  }
}

class AutoWeeklyStrategy extends ShiftAssignmentStrategy {
  // payload: { startDate: 'YYYY-MM-DD' }
  async plan(userId, shiftType, payload) {
    if (!payload?.startDate) throw new Error('startDate is required for autoWeekly strategy');
    const baseDate = new Date(payload.startDate);
    const items = [];
    for (let i = 0; i < 7; i += 1) {
      const d = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + i);
      const { startTime, endTime } = getShiftWindowForType(shiftType, d);
      // For weekly plan: check conflict per day for the same user
      // If any day conflicts, skip that day (do not fail entire batch)
      const conflict = await hasConflict(userId, startTime, endTime);
      if (!conflict) items.push({ startTime, endTime });
    }
    if (items.length === 0) {
      return { type: 'batch', canAssign: false, reason: 'All selected week days conflict for the user' };
    }
    return { type: 'batch', canAssign: true, items };
  }
}

module.exports = {
  ShiftAssignmentStrategy,
  UserDefinedStrategy,
  AutoWeeklyStrategy,
  getShiftWindowForType
};


