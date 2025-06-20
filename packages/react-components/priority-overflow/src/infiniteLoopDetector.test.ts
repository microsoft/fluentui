import { infiniteLoopDetector } from './infiniteLoopDetector';

describe('infiniteLoopDetector', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should return false for first call', () => {
    const detector = infiniteLoopDetector();
    expect(detector()).toBe(false);
  });

  it('should return false when time difference is >= 100ms', () => {
    const detector = infiniteLoopDetector();
    detector(); // first call at t=0
    jest.advanceTimersByTime(100); // fast forward time by 100ms

    expect(detector()).toBe(false);
  });

  it('should return true when more than 100 calls occur within 100ms', () => {
    const detector = infiniteLoopDetector();

    // Call detector 101 times in quick succession
    for (let i = 0; i < 101; i++) {
      if (i < 100) {
        expect(detector()).toBe(false);
      } else {
        jest.advanceTimersByTime(99); // fast forward time by 99ms
        expect(detector()).toBe(true);
      }
    }
  });

  it('should return false when the 101st call occurs after 100ms', () => {
    const detector = infiniteLoopDetector();

    // Call detector 101 times in quick succession
    for (let i = 0; i < 101; i++) {
      if (i < 100) {
        expect(detector()).toBe(false);
      } else {
        jest.advanceTimersByTime(101); // fast forward time by 100ms
        expect(detector()).toBe(false);
      }
    }
  });

  it('should reset when called after 100ms', () => {
    const detector = infiniteLoopDetector();

    // Call detector 101 times in quick succession
    for (let i = 0; i < 101; i++) {
      if (i < 100) {
        expect(detector()).toBe(false);
      }
    }

    jest.advanceTimersByTime(99); // fast forward time by 99msms
    expect(detector()).toBe(true); // should reset and return true

    jest.advanceTimersByTime(1); // fast forward time by 1ms to complete the 100ms window
    expect(detector()).toBe(false); // should reset and return false
  });
});
