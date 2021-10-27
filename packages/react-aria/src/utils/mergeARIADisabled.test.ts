import { mergeARIADisabled } from './mergeARIADisabled';

describe('mergeARIADisabled', () => {
  it('should merge disabled and aria-disabled into one boolean, priority is in disabled', () => {
    expect(mergeARIADisabled({ disabled: false, 'aria-disabled': false })).toBe(false);
    expect(mergeARIADisabled({ disabled: false, 'aria-disabled': true })).toBe(false);
    expect(mergeARIADisabled({})).toBe(false);
  });
});
