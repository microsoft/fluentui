import { useTeachingPopoverFooterStyles_unstable } from './useTeachingPopoverFooterStyles.styles.css';
import type { TeachingPopoverFooterState } from './TeachingPopoverFooter.types';

jest.mock('./TeachingPopoverFooter.module.css', () => ({
  root: 'root',
  vertical: 'vertical',
  horizontal: 'horizontal',
  buttonVertical: 'button-vertical',
  buttonHorizontal: 'button-horizontal',
  brandPrimary: 'brand-primary',
  brandSecondary: 'brand-secondary',
}));

const makeState = (footerLayout?: 'horizontal' | 'vertical', appearance?: 'brand') =>
  ({
    footerLayout,
    appearance,
    root: { className: 'caller-root' },
    primary: { className: 'caller-primary' },
    secondary: { className: 'caller-secondary' },
  } as unknown as TeachingPopoverFooterState);

describe('useTeachingPopoverFooterStyles_unstable (CSS Modules)', () => {
  it('defaults to the vertical layout', () => {
    const state = makeState();
    useTeachingPopoverFooterStyles_unstable(state);

    expect(state.root.className).toBe('fui-TeachingPopoverFooter root vertical caller-root');
    expect(state.primary.className).toBe('fui-TeachingPopoverFooter__primary button-vertical caller-primary');
    expect(state.secondary?.className).toBe('fui-TeachingPopoverFooter__secondary button-vertical caller-secondary');
  });

  it('applies horizontal and brand classes', () => {
    const state = makeState('horizontal', 'brand');
    useTeachingPopoverFooterStyles_unstable(state);

    expect(state.root.className).toContain('root horizontal');
    expect(state.primary.className).toBe(
      'fui-TeachingPopoverFooter__primary button-horizontal brand-primary caller-primary',
    );
    expect(state.secondary?.className).toBe(
      'fui-TeachingPopoverFooter__secondary button-horizontal brand-secondary caller-secondary',
    );
  });

  it('skips the optional secondary slot', () => {
    const state = makeState();
    state.secondary = undefined;

    expect(() => useTeachingPopoverFooterStyles_unstable(state)).not.toThrow();
  });
});
