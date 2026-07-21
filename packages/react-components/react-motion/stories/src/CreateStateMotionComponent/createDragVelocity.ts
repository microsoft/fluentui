export type PositionSample = {
  position: number;
  time: number;
};

export const estimateVelocity = (samples: readonly PositionSample[], now: number, sampleWindow: number): number => {
  const windowStart = now - sampleWindow;
  const recentSamples = samples.filter(sample => sample.time >= windowStart && sample.time <= now);
  if (recentSamples.length < 2) {
    return 0;
  }

  const meanTime = recentSamples.reduce((sum, sample) => sum + sample.time, 0) / recentSamples.length;
  const meanPosition = recentSamples.reduce((sum, sample) => sum + sample.position, 0) / recentSamples.length;
  let covariance = 0;
  let timeVariance = 0;

  for (const sample of recentSamples) {
    const timeDelta = sample.time - meanTime;
    covariance += timeDelta * (sample.position - meanPosition);
    timeVariance += timeDelta * timeDelta;
  }

  return timeVariance === 0 ? 0 : (covariance / timeVariance) * 1000;
};

export const smoothVelocity = (
  currentVelocity: number,
  targetVelocity: number,
  elapsed: number,
  smoothingTime: number,
): number => {
  if (smoothingTime <= 0) {
    return targetVelocity;
  }
  if (elapsed <= 0) {
    return currentVelocity;
  }

  const smoothing = 1 - Math.exp(-elapsed / smoothingTime);
  return currentVelocity + (targetVelocity - currentVelocity) * smoothing;
};
