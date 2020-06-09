import { isControlled } from './controlled';

interface IProps {
  value?: string | number | null;
  defaultValue?: string;
}

describe('isControlled', () => {
  it('returns false if no value provided', () => {
    expect(isControlled<IProps>({}, 'value')).toBe(false);
  });

  it('returns false if value is undefined', () => {
    expect(isControlled<IProps>({ value: undefined }, 'value')).toBe(false);
  });

  it('returns false if value is null', () => {
    expect(isControlled<IProps>({ value: null }, 'value')).toBe(false);
  });

  it('returns true if value is empty string', () => {
    expect(isControlled<IProps>({ value: '' }, 'value')).toBe(true);
  });

  it('returns true if value is 0', () => {
    expect(isControlled<IProps>({ value: 0 }, 'value')).toBe(true);
  });

  it('returns true if value is arbitrary string', () => {
    expect(isControlled<IProps>({ value: 'hello' }, 'value')).toBe(true);
  });
});
