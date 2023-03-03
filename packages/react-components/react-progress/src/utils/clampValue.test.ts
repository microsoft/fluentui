import { clampValue } from './clampValue';
describe('ProgressBar and value', () => {
  const originalConsoleError = console.error;
  beforeAll(() => {
    console.error = jest.fn();
  });
  afterAll(() => {
    console.error = originalConsoleError;
  });
  it('sends an error message when the value is negative', () => {
    const value = -1;
    const max = 1;
    const errorMsg = `The prop 'value' must be greater than or equal to zero. Received value: ${value}`;
    clampValue(value, max);
    expect(console.error).toHaveBeenCalledWith(errorMsg);
  });
  it('sets the value to zero when value is negative', () => {
    const value = -1;
    const max = 1;
    const testValue = clampValue(value, max);
    expect(testValue).toBe(0);
  });
  it('sends an error message when the value is greater than max', () => {
    const value = 23;
    const max = 10;
    const errorMsg = `The prop 'value' must be less than or equal to 'max'. Received value: ${value}, max: ${max}`;
    clampValue(value, max);
    expect(console.error).toHaveBeenCalledWith(errorMsg);
  });
  it('sets the value to max when value is greater than max', () => {
    const value = 23;
    const max = 10;
    const testValue = clampValue(value, max);
    expect(testValue).toBe(10);
  });
  it('does not send an error message when the value is not undefined and valid', () => {
    const value = 5;
    const max = 10;
    clampValue(value, max);
    expect(console.error).not.toHaveBeenCalled();
  });
});
