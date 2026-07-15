type ScalarEasing = {
  easing: string;
  easingFn: (time: number) => number;
  velocityFn: (time: number) => number;
};

export type ScalarSegment = {
  start: number;
  target: number;
  duration: number;
  startTime: number;
  easing: ScalarEasing;
};

const clampUnit = (value: number): number => Math.min(Math.max(value, 0), 1);

const easingToLinear = (easingFn: ScalarEasing['easingFn'], sampleCount = 40): string => {
  const stops = Array.from({ length: sampleCount + 1 }, (_, index) => {
    const time = index / sampleCount;
    return `${easingFn(time).toFixed(4)} ${(time * 100).toFixed(1)}%`;
  });

  return `linear(${stops.join(', ')})`;
};

const createEasing = (easingFn: ScalarEasing['easingFn'], velocityFn: ScalarEasing['velocityFn']): ScalarEasing => ({
  easing: easingToLinear(easingFn),
  easingFn,
  velocityFn,
});

export const baseTransferEasing = createEasing(
  time => time * time * (3 - 2 * time),
  time => 6 * time * (1 - time),
);

const createInterruptEasing = (initialVelocity: number): ScalarEasing => {
  const cubic = initialVelocity - 2;
  const quadratic = 3 - 2 * initialVelocity;

  return createEasing(
    time => ((cubic * time + quadratic) * time + initialVelocity) * time,
    time => (3 * cubic * time + 2 * quadratic) * time + initialVelocity,
  );
};

export class InterruptibleScalar {
  private segment: ScalarSegment | undefined;
  private settledValue: number;

  public constructor(initialValue: number, private readonly getDuration: (distance: number) => number) {
    this.settledValue = initialValue;
  }

  public moveTo(target: number, now: number): ScalarSegment {
    if (!this.segment || this.isComplete(now)) {
      const start = this.segment?.target ?? this.settledValue;
      this.segment = {
        start,
        target,
        duration: this.getDuration(Math.abs(target - start)),
        startTime: now,
        easing: baseTransferEasing,
      };
      return this.segment;
    }

    const current = this.segment;
    const progress = clampUnit((now - current.startTime) / current.duration);
    const start = this.valueAt(now);
    const distance = target - start;
    const duration = this.getDuration(Math.abs(distance));
    const previousDistance = current.target - current.start;
    const previousVelocity = current.easing.velocityFn(progress);
    const initialVelocity =
      Math.abs(distance) > 1e-6 ? previousVelocity * (previousDistance / distance) * (duration / current.duration) : 0;

    this.segment = {
      start,
      target,
      duration,
      startTime: now,
      easing: createInterruptEasing(initialVelocity),
    };
    return this.segment;
  }

  public valueAt(now: number): number {
    if (!this.segment) {
      return this.settledValue;
    }

    const progress = clampUnit((now - this.segment.startTime) / this.segment.duration);
    return this.segment.start + (this.segment.target - this.segment.start) * this.segment.easing.easingFn(progress);
  }

  public isComplete(now: number): boolean {
    return !this.segment || now >= this.segment.startTime + this.segment.duration;
  }

  public complete(): void {
    if (this.segment) {
      this.settledValue = this.segment.target;
      this.segment = undefined;
    }
  }

  public reset(value: number): void {
    this.settledValue = value;
    this.segment = undefined;
  }
}
