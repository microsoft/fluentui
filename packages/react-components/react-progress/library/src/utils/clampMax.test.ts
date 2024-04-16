import { clampMax } from './clampMax';

describe('ProgressBar clampMax util', () => {
  const originalConsoleError = console.error;
  beforeAll(() => {
    console.error = jest.fn();
  });
  afterAll(() => {
    console.error = originalConsoleError;
  });
  it('sends an error message when max is negative', () => {
    const max = -1;
    const errorMsg = `The prop 'max' must be greater than 0. Received max: ${max}`;
    clampMax(max);
    expect(console.error).toHaveBeenCalledWith(errorMsg);
  });
  it('sets max to the proper value when max is negative', () => {
    const max = -1;
    const testMax = clampMax(max);
    expect(testMax).toBe(1);
  });
  it('sends an error message when max is zero', () => {
    const max = 0;
    const errorMsg = `The prop 'max' must be greater than 0. Received max: ${max}`;
    clampMax(max);
    expect(console.error).toHaveBeenCalledWith(errorMsg);
  });
  it('sets max to the proper value when max is zero', () => {
    const max = 0;
    const testMax = clampMax(max);
    expect(testMax).toBe(1);
  });
  it('does not send an error message when max is valid', () => {
    const max = 7;
    clampMax(max);
    expect(console.error).not.toHaveBeenCalled();
  });
  it('sets max to the right value when max is valid', () => {
    const max = 7;
    const testMax = clampMax(max);
    expect(testMax).toBe(max);
  });
});
