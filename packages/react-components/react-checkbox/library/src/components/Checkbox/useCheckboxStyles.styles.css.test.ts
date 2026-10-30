import { renderHook } from '@testing-library/react-hooks';
import { useCheckbox_unstable } from './useCheckbox';
import { useCheckboxStyles_unstable as applyStyles } from './useCheckboxStyles.styles.css';

jest.mock('./Checkbox.module.css', () => ({
  after: 'css-after',
  before: 'css-before',
  checked: 'css-checked',
  circular: 'css-circular',
  disabled: 'css-disabled',
  indicator: 'css-indicator',
  input: 'css-input',
  label: 'css-label',
  large: 'css-large',
  medium: 'css-medium',
  mixed: 'css-mixed',
  root: 'css-root',
  unchecked: 'css-unchecked',
}));

describe('useCheckboxStyles_unstable (CSS Modules)', () => {
  it('uses the default state without changing the state identity', () => {
    const { result } = renderHook(() => useCheckbox_unstable({}, null));
    const state = result.current;

    expect(applyStyles(state)).toBe(state);
    expect(state.root.className).toBe('fui-Checkbox css-root css-medium css-after css-unchecked');
  });

  it('preserves caller classes last on every present slot', () => {
    const { result } = renderHook(() =>
      useCheckbox_unstable(
        {
          className: 'caller-root',
          input: { className: 'caller-input' },
          indicator: { className: 'caller-indicator' },
          label: { className: 'caller-label' },
        },
        null,
      ),
    );
    const state = applyStyles(result.current);

    expect(state.root.className?.endsWith(' caller-root')).toBe(true);
    expect(state.input?.className?.endsWith(' caller-input')).toBe(true);
    expect(state.indicator?.className?.endsWith(' caller-indicator')).toBe(true);
    expect(state.label?.className?.endsWith(' caller-label')).toBe(true);
  });

  it('does not create absent optional slots', () => {
    const { result } = renderHook(() => useCheckbox_unstable({ label: null, indicator: null }, null));
    const state = applyStyles(result.current);
    expect(state.label).toBeUndefined();
    expect(state.indicator).toBeUndefined();
  });

  it.each([false, true, 'mixed'] as const)(
    'maps checked=%s independently of size, shape and label position',
    checked => {
      for (const disabled of [false, true]) {
        for (const size of ['medium', 'large'] as const) {
          for (const labelPosition of ['before', 'after'] as const) {
            const { result } = renderHook(() =>
              useCheckbox_unstable({ checked, disabled, size, shape: 'circular', labelPosition, label: 'Label' }, null),
            );
            const state = applyStyles(result.current);
            expect(state.root.className).toContain(`css-${size} css-circular css-${labelPosition}`);
            expect(state.root.className).toContain(
              `css-${checked === 'mixed' ? 'mixed' : checked ? 'checked' : 'unchecked'}`,
            );
            expect(state.root.className?.includes('css-disabled')).toBe(disabled);
            expect(state.input.className).toBe('fui-Checkbox__input css-input');
            expect(state.indicator?.className).toBe('fui-Checkbox__indicator css-indicator');
            expect(state.label?.className).toBe('fui-Checkbox__label css-label');
          }
        }
      }
    },
  );
});
