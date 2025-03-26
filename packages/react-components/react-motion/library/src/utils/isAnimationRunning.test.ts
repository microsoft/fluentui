import { isAnimationRunning } from './isAnimationRunning';

// Heads up!
// Unit tests are funny as JSDOM doesn't support the Web Animation API

function createModernAnimationMock(playState: Animation['playState'], overallProgress: number): Animation {
  return {
    playState,
    overallProgress,
  } as Partial<Animation> as Animation;
}

function createLegacyAnimationMock(
  playState: Animation['playState'],
  currentTime: number,
  duration: number,
): Animation {
  return {
    playState,
    currentTime,
    effect: {
      getTiming: () => ({
        duration,
      }),
    },
  } as Partial<Animation> as Animation;
}

describe('isAnimationRunning', () => {
  it('returns "true" if the animation is running & started', () => {
    expect(isAnimationRunning(createModernAnimationMock('running', 0.5))).toBe(true);
  });

  it('returns "false" if the animation is running & not started yet', () => {
    expect(isAnimationRunning(createModernAnimationMock('running', 0))).toBe(false);
    expect(isAnimationRunning(createModernAnimationMock('running', 1))).toBe(false);
  });

  it('returns "false" if the animation is not running', () => {
    expect(isAnimationRunning(createModernAnimationMock('paused', 0.5))).toBe(false);
    expect(isAnimationRunning(createModernAnimationMock('finished', 1))).toBe(false);
    expect(isAnimationRunning(createModernAnimationMock('idle', 0))).toBe(false);
  });

  it('fallbacks to "currentTime" is "overallProgress" is not supported', () => {
    expect(isAnimationRunning(createLegacyAnimationMock('running', 500, 1000))).toBe(true);

    expect(isAnimationRunning(createLegacyAnimationMock('running', 0, 1000))).toBe(false);
    expect(isAnimationRunning(createLegacyAnimationMock('running', 1000, 1000))).toBe(false);
  });
});
