import { renderHook } from '@testing-library/react';
import { useRadioGroup_unstable } from './useRadioGroup';
import type { RadioGroupProps } from './RadioGroup.types';
import { useRadioGroupStyles_unstable } from './useRadioGroupStyles.styles.css';

jest.mock('./RadioGroup.module.css', () => ({
  root: 'css-root',
  vertical: 'css-vertical',
}));

const renderStyles = (props: RadioGroupProps = {}) =>
  renderHook(() => useRadioGroupStyles_unstable(useRadioGroup_unstable(props, null))).result.current;

describe('useRadioGroupStyles_unstable (CSS Modules)', () => {
  it('uses the default vertical layout', () => {
    expect(renderStyles().root.className).toBe('fui-RadioGroup css-root css-vertical');
  });
  it.each(['horizontal', 'horizontal-stacked'] as const)('does not apply vertical flex styling to %s', layout => {
    expect(renderStyles({ layout }).root.className).toBe('fui-RadioGroup css-root');
  });
  it('preserves all caller class names last and returns the same state', () => {
    const { result } = renderHook(() => {
      const state = useRadioGroup_unstable({ className: 'caller-root' }, null);
      expect(useRadioGroupStyles_unstable(state)).toBe(state);
      return state;
    });
    expect(result.current.root.className?.split(' ').pop()).toBe('caller-root');
  });
});
