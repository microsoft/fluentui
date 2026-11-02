/**
 * Checks if the animation is running at the moment.
 */
export function isAnimationRunning(animation: Animation & { readonly overallProgress?: number | null }): boolean {
  if (animation.playState === 'running') {
    // Heads up!
    //
    // There is an edge case where the animation is running, but the overall progress is 0 or 1. In this case, we
    // consider the animation to be not running. If it will be reversed it will flip from 1 to 0, and we will observe a
    // glitch.

    // "overallProgress" is not supported in all browsers, so we need to check if it exists.
    // We will fall back to the currentTime and duration if "overallProgress" is not supported.
    if (animation.overallProgress !== undefined) {
      const overallProgress = animation.overallProgress ?? 0;

      return overallProgress > 0 && overallProgress < 1;
    }

    const currentTime = Number(animation.currentTime ?? 0);
    const totalTime = Number(animation.effect?.getTiming().duration ?? 0);

    return currentTime > 0 && currentTime < totalTime;
  }

  return false;
}
