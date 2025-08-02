const MAX_LOOP_LENGTH = 100;
const DETECTION_WINDOW_END = 100;

export const infiniteLoopDetector = () => {
  let loopCounter = 0;
  let windowStart: number | null = null;

  return () => {
    const mark = performance.now();
    if (windowStart === null) {
      windowStart = mark;
      loopCounter = 1;
      return false;
    }

    loopCounter++;
    const timeDiff = mark - windowStart;

    if (timeDiff >= DETECTION_WINDOW_END) {
      windowStart = null;
      loopCounter = 0;
      return false;
    }

    if (timeDiff < DETECTION_WINDOW_END && loopCounter > MAX_LOOP_LENGTH) {
      return true;
    }

    return false;
  };
};
