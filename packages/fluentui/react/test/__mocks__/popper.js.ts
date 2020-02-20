import * as PopperJs from 'popper.js';

// Popper.js does not work with JSDOM: https://github.com/FezVrasta/popper.js/issues/478
export default class Popper {
  static placements = (PopperJs as any).placements;

  constructor() {
    return {
      destroy: () => {},
      scheduleUpdate: () => {},
      enableEventListeners: () => {},
    };
  }
}
