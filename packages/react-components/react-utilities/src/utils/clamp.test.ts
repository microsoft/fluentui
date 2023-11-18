import { clamp } from './clamp';

describe('clamp', () => {
  it('clamps a value that is out of the max range', () => {
    expect(clamp(100, 0, 10)).toEqual(10);
  });

  it('clamps a value that is below the min range', () => {
    expect(clamp(100, 0, -10)).toEqual(0);
  });
});
