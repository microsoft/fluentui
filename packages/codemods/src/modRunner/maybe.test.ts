import { Maybe, Just, Nothing } from '../maybe';

describe('Maybe', () => {
  it('new just has correct boolean', () => {
    expect(Just(1).just).toBe(true);
  });

  it('new just has correct value', () => {
    expect(Just(0).value).toBe(0);
  });

  it('just will error if you pass it undefined', () => {
    let error = false;
    try {
      Just(undefined);
    } catch (_) {
      error = true;
    }
    expect(error).toBe(true);
  });

  it('', () => {
    expect(Just(1).just).toBe(true);
  });
  it('new just has correct boolean', () => {
    expect(Just(1).just).toBe(true);
  });
});
