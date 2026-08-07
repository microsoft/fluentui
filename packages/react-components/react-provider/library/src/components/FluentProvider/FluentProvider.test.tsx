import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { webDarkThemeClassName } from '@fluentui/react-theme';
import { fuiSelector } from '@fluentui/react-utilities';
import { render } from '@testing-library/react';
import * as React from 'react';

import { FluentProvider } from './FluentProvider';
import { isConformant } from '../../testing/isConformant';

/**
 * FluentProvider's public identity class after the statics removal (DECISIONS.md D16.1).
 * `fluentProviderClassNames.root` is NOT usable here: the bare `fui-FluentProvider`
 * static it holds is no longer rendered (and since theming Phase 2b no runtime
 * `fui-FluentProvider<useId>` class exists either). `fuiSelector` escapes the `/`, which
 * is legal in a class token but terminates a class selector (D16.5).
 */
const PROVIDER_ROOT_SELECTOR = fuiSelector('group/fui-fluent-provider');

describe('FluentProvider', () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const noop = () => {};

  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(noop);
    jest.spyOn(console, 'error').mockImplementation(noop);
  });

  isConformant({
    disabledTests: [
      'component-handles-classname',
      // Statics removal (DECISIONS.md D16.1/D16.6). FluentProvider no longer renders the
      // bare `fui-FluentProvider` static — only the `group/fui-fluent-provider` marker
      // (and, when set, the static theme class) — so this test's rendered-class assertion
      // no longer describes the component.
      // `component-has-group-marker` (now a default test) is its replacement (D16.5).
      'component-has-static-classnames-object',
    ],
    Component: FluentProvider,
    displayName: 'FluentProvider',
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
    // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });

  /**
   * Note: see more visual regression tests for FluentProvider in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const { container } = render(<FluentProvider>Default FluentProvider</FluentProvider>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('applies the themeClassName to the root element (theming Phase 2b)', () => {
    const { container } = render(
      <FluentProvider themeClassName={webDarkThemeClassName}>Dark FluentProvider</FluentProvider>,
    );

    const root = container.querySelector(PROVIDER_ROOT_SELECTOR) as HTMLElement;
    expect(root.classList.contains(webDarkThemeClassName)).toBe(true);
  });

  it('does not render any style element — the provider injects no styles', () => {
    const { container } = render(<FluentProvider themeClassName={webDarkThemeClassName} />);
    expect(container.querySelector('style')).toBeNull();
    expect(document.querySelector('style')).toBeNull();
  });

  /*
   * Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
   *
   * These cases used to also assert `toHaveStyle({ textAlign: 'left' | 'right' })`.
   * That worked because Griffel INJECTED its atomic rules into the jsdom document at
   * runtime (`.f1o700av{text-align:left}` / `.fes3tcz{text-align:right}` — the compiled
   * [ltr, rtl] pair), so `getComputedStyle` could resolve them.
   *
   * FluentProvider.module.css now expresses the same thing as a single logical
   * declaration, `text-align: start` (DECISIONS.md D5), and jest maps `*.module.css` to a
   * class-name proxy — no stylesheet is loaded, so there is nothing for
   * `getComputedStyle` to resolve and the assertion is not expressible here.
   *
   * The `dir` attribute assertions below are the part that still carries signal, and they
   * matter MORE after the migration: logical properties resolve against the DOM's computed
   * direction, so this attribute is now the actual input to the styling. The rendered
   * `text-align` itself is covered by the RTL visual-regression stories.
   */
  describe('applies "dir" attribute', () => {
    it('ltr', () => {
      const { getByText } = render(<FluentProvider dir="ltr">Test</FluentProvider>);
      const element = getByText('Test');

      expect(element).toHaveAttribute('dir', 'ltr');
    });

    it('rtl', () => {
      const { getByText } = render(<FluentProvider dir="rtl">Test</FluentProvider>);
      const element = getByText('Test');

      expect(element).toHaveAttribute('dir', 'rtl');
    });
  });
});
