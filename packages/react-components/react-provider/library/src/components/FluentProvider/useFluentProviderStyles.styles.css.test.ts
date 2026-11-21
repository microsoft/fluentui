import { slot } from '@fluentui/react-utilities';
import type { FluentProviderState } from './FluentProvider.types';
import { fluentProviderClassNames, useFluentProviderStyles_unstable } from './useFluentProviderStyles.styles.css';

jest.mock('./FluentProvider.module.css', () => ({
  root: 'provider-root',
  rtl: 'provider-rtl',
}));

const createState = (dir: 'ltr' | 'rtl', className?: string): FluentProviderState => ({
  components: { root: 'div' },
  root: slot.always({ className }, { elementType: 'div' }),
  applyStylesToPortals: true,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  customStyleHooks_unstable: {},
  dir,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  overrides_unstable: {},
  theme: undefined,
  themeClassName: 'provider-theme',
  serverStyleProps: { cssRule: '', attributes: {} },
});

describe('useFluentProviderStyles_unstable (CSS Modules)', () => {
  it.each(['ltr', 'rtl'] as const)('applies root, theme, and %s direction classes', dir => {
    const state = createState(dir);

    expect(useFluentProviderStyles_unstable(state)).toBe(state);
    expect(state.root.className).toBe(
      `${fluentProviderClassNames.root} provider-theme provider-root${dir === 'rtl' ? ' provider-rtl' : ''}`,
    );
  });

  it('preserves caller classes last', () => {
    const state = createState('rtl', 'caller-class another-class');

    useFluentProviderStyles_unstable(state);

    expect(state.root.className).toBe(
      `${fluentProviderClassNames.root} provider-theme provider-root provider-rtl caller-class another-class`,
    );
  });

  it('does not require a theme or caller class', () => {
    const state = createState('ltr');
    state.themeClassName = '';

    useFluentProviderStyles_unstable(state);

    expect(state.root.className).toBe(`${fluentProviderClassNames.root} provider-root`);
  });
});
