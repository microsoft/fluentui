import { estimateVelocity, smoothVelocity } from './createDragVelocity';

describe('estimateVelocity', () => {
  it('measures horizontal velocity across a recent sample window', () => {
    expect(
      estimateVelocity(
        [
          { position: 0, time: 0 },
          { position: 50, time: 50 },
          { position: 100, time: 100 },
        ],
        100,
        100,
      ),
    ).toBeCloseTo(1000, 5);
  });

  it('ignores samples outside the window and settles when input is stale', () => {
    const samples = [
      { position: 0, time: 0 },
      { position: 100, time: 100 },
      { position: 120, time: 180 },
      { position: 140, time: 200 },
    ];

    expect(estimateVelocity(samples, 200, 50)).toBeCloseTo(1000, 5);
    expect(estimateVelocity(samples, 251, 50)).toBe(0);
  });

  it('returns zero without enough distinct samples', () => {
    expect(estimateVelocity([], 100, 80)).toBe(0);
    expect(estimateVelocity([{ position: 20, time: 100 }], 100, 80)).toBe(0);
  });
});

describe('smoothVelocity', () => {
  it('is frame-rate independent for the same elapsed time', () => {
    const oneFrame = smoothVelocity(0, 1000, 32, 40);
    const twoFrames = smoothVelocity(smoothVelocity(0, 1000, 16, 40), 1000, 16, 40);

    expect(oneFrame).toBeCloseTo(twoFrames, 10);
  });
});
