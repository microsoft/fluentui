import { useLabel_unstable } from './useLabel';
import { labelClassNames, useLabelStyles_unstable } from './useLabelStyles.styles.css';

jest.mock('./Label.module.css', () => ({
  root: 'css-root',
  disabled: 'css-disabled',
  required: 'css-required',
  small: 'css-small',
  medium: 'css-medium',
  large: 'css-large',
  semibold: 'css-semibold',
}));

describe('useLabelStyles_unstable (CSS Modules)', () => {
  it('applies size, weight, disabled, and required classes to their slots', () => {
    const state = useLabel_unstable(
      { children: 'Label', size: 'large', weight: 'semibold', disabled: true, required: true },
      null,
    );

    expect(useLabelStyles_unstable(state)).toBe(state);
    expect(state.root.className).toBe(`${labelClassNames.root} css-root css-disabled css-large css-semibold`);
    expect(state.required?.className).toBe(`${labelClassNames.required} css-required css-disabled`);
  });

  it('uses the default size and weight and preserves caller classes last', () => {
    const state = useLabel_unstable(
      { children: 'Label', className: 'caller-root', required: { className: 'caller-required' } },
      null,
    );

    useLabelStyles_unstable(state);

    expect(state.root.className).toBe(`${labelClassNames.root} css-root css-medium caller-root`);
    expect(state.required?.className).toBe(`${labelClassNames.required} css-required caller-required`);
  });

  it('does not style an absent required slot', () => {
    const state = useLabel_unstable({ children: 'Label' }, null);

    useLabelStyles_unstable(state);

    expect(state.required).toBeUndefined();
  });
});
