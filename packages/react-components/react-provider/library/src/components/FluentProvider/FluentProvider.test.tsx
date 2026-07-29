import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { teamsLightTheme } from '@fluentui/react-theme';
import { fuiSelector, resetIdsForTests } from '@fluentui/react-utilities';
import { render } from '@testing-library/react';
import * as React from 'react';

import { FluentProvider } from './FluentProvider';
import { isConformant } from '../../testing/isConformant';

/**
 * FluentProvider's public identity class after the statics removal (DECISIONS.md D16.1).
 * `fluentProviderClassNames.root` is NOT usable here: it is retained only as the identity
 * prefix that seeds the runtime theme class, and the bare `fui-FluentProvider` static it
 * holds is no longer rendered. `fuiSelector` escapes the `/`, which is legal in a class
 * token but terminates a class selector (D16.5).
 */
const PROVIDER_ROOT_SELECTOR = fuiSelector('group/fui-fluent-provider');

jest.mock('@fluentui/react-utilities', () => ({
  ...jest.requireActual('@fluentui/react-utilities'),
  ...jest.requireActual('../../testing/createUseIdMock').createUseIdMock(),
}));

describe('FluentProvider', () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const noop = () => {};
  let logErrorSpy: jest.Spied<typeof console.error>;

  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(noop);
    logErrorSpy = jest.spyOn(console, 'error').mockImplementation(noop);
  });

  isConformant({
    disabledTests: [
      'component-handles-classname',
      // Statics removal (DECISIONS.md D16.1/D16.6). FluentProvider no longer renders the
      // bare `fui-FluentProvider` static — only the runtime `fui-FluentProvider<useId>`
      // theme class and the `group/fui-fluent-provider` marker — so this test's
      // rendered-class assertion no longer describes the component.
      // `component-has-group-marker` (now a default test) is its replacement (D16.5).
      'component-has-static-classnames-object',
    ],
    Component: FluentProvider,
    displayName: 'FluentProvider',
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // This package never registered `@fluentui/react-conformance-griffel`, so there is no
    // `make-styles-overrides-win` to disable here — but the contract it guards still needs
    // covering now that useFluentProviderStyles.styles.ts composes with clsx instead of
    // mergeClasses (DECISIONS.md D9).
    //
    // This is enabled even though `component-handles-classname` above is disabled: that
    // test compares class names across three separate renders, and FluentProvider's
    // `state.themeClassName` embeds a `useId()` counter that differs per render.
    // `classname-overrides-win` renders once and only asserts ordering within that one
    // class attribute, so the unstable id is not a factor.
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });

  afterEach(() => {
    resetIdsForTests();
  });

  /**
   * Note: see more visual regression tests for FluentProvider in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const { container } = render(
      <FluentProvider theme={{ colorBrandBackground2: '#fff' }}>Default FluentProvider</FluentProvider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it(`should emit an error on duplicated IDs`, () => {
    const containerA = document.createElement('div');
    const containerB = document.createElement('div');

    document.body.appendChild(containerA);
    document.body.appendChild(containerB);

    render(<FluentProvider theme={teamsLightTheme} />, { container: containerA });
    expect(document.body.querySelectorAll(PROVIDER_ROOT_SELECTOR)).toHaveLength(1);

    // This resets IDs, so the next FluentProvider will have the same IDs as the first one
    resetIdsForTests();

    render(<FluentProvider theme={teamsLightTheme} />, { container: containerB });
    expect(document.body.querySelectorAll(PROVIDER_ROOT_SELECTOR)).toHaveLength(2);

    expect(logErrorSpy).toHaveBeenCalledTimes(1);
    expect(logErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('@fluentui/react-provider: There are conflicting ids in your DOM.'),
    );
  });

  it('does not render style element when not in SSR', () => {
    const { container } = render(<FluentProvider theme={teamsLightTheme} />);
    expect(container.querySelector('style')).toBeNull();
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
