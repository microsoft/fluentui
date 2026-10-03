import { mapConcurrently } from '../concurrency';

describe('mapConcurrently', () => {
  it('preserves input order while bounding active work', async () => {
    let active = 0;
    let peak = 0;
    const results = await mapConcurrently(
      [3, 1, 2, 0],
      async value => {
        active++;
        peak = Math.max(peak, active);
        await new Promise(resolve => setTimeout(resolve, value));
        active--;
        return value * 2;
      },
      { concurrency: 2, verbose: false },
    );

    expect(peak).toBe(2);
    expect(results).toEqual([6, 2, 4, 0]);
  });
});
