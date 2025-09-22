const Shift = require('../models/Shift');

// Base Shift class
class BaseShift {
  constructor(userId, startTime, endTime, assignedBy, notes = '') {
    this.userId = userId;
    this.startTime = startTime;
    this.endTime = endTime;
    this.assignedBy = assignedBy;
    this.notes = notes;
  }

  async create() {
    const shiftData = {
      userId: this.userId,
      shiftType: this.shiftType,
      startTime: this.startTime,
      endTime: this.endTime,
      assignedBy: this.assignedBy,
      notes: this.notes
    };
    return await Shift.create(shiftData);
  }

  validate() {
    if (this.startTime >= this.endTime) {
      throw new Error('Start time must be before end time');
    }
    return true;
  }
}

// Morning Shift (6:00 AM - 2:00 PM)
class MorningShift extends BaseShift {
  constructor(userId, startTime, endTime, assignedBy, notes = '') {
    super(userId, startTime, endTime, assignedBy, notes);
    this.shiftType = 'morning';
  }

  validate() {
    super.validate();
    const startHour = this.startTime.getHours();
    if (startHour < 5 || startHour > 8) {
      throw new Error('Morning shift should start between 5:00 AM and 8:00 AM');
    }
    return true;
  }
}

// Evening Shift (2:00 PM - 10:00 PM)
class EveningShift extends BaseShift {
  constructor(userId, startTime, endTime, assignedBy, notes = '') {
    super(userId, startTime, endTime, assignedBy, notes);
    this.shiftType = 'evening';
  }

  validate() {
    super.validate();
    const startHour = this.startTime.getHours();
    if (startHour < 13 || startHour > 16) {
      throw new Error('Evening shift should start between 1:00 PM and 4:00 PM');
    }
    return true;
  }
}

// Night Shift (10:00 PM - 6:00 AM)
class NightShift extends BaseShift {
  constructor(userId, startTime, endTime, assignedBy, notes = '') {
    super(userId, startTime, endTime, assignedBy, notes);
    this.shiftType = 'night';
  }

  validate() {
    super.validate();
    const startHour = this.startTime.getHours();
    if (startHour < 21 || startHour > 23) {
      throw new Error('Night shift should start between 9:00 PM and 11:00 PM');
    }
    return true;
  }
}

// Factory Pattern Implementation
class ShiftFactory {
  static createShift(shiftType, userId, startTime, endTime, assignedBy, notes = '') {
    const start = new Date(startTime);
    const end = new Date(endTime);

    switch (shiftType.toLowerCase()) {
      case 'morning':
        return new MorningShift(userId, start, end, assignedBy, notes);
      case 'evening':
        return new EveningShift(userId, start, end, assignedBy, notes);
      case 'night':
        return new NightShift(userId, start, end, assignedBy, notes);
      default:
        throw new Error(`Unknown shift type: ${shiftType}`);
    }
  }

  static getShiftTypes() {
    return ['morning', 'evening', 'night'];
  }

  static getShiftTimeRanges() {
    return {
      morning: { start: '05:00', end: '14:00' },
      evening: { start: '14:00', end: '22:00' },
      night: { start: '22:00', end: '06:00' }
    };
  }
}

module.exports = {
  ShiftFactory,
  BaseShift,
  MorningShift,
  EveningShift,
  NightShift
};
