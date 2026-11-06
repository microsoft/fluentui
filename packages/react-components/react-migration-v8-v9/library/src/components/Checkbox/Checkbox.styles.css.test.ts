import { useCheckboxStyles } from './Checkbox.styles.css';

jest.mock('./Checkbox.module.css', () => ({ root: 'root' }));

describe('useCheckboxStyles (CSS Modules)', () => {
  it('returns the CSS Module class names', () => {
    expect(useCheckboxStyles()).toEqual({ root: 'root' });
  });
});
