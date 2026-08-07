import * as React from 'react';
import { render } from '@testing-library/react';
import { ThemeClassNameProvider_unstable as ThemeClassNameProvider } from '@fluentui/react-shared-contexts';
import { tokens } from '@fluentui/react-theme';

import { useIsDarkTheme } from './VegaDeclarativeChartHooks';

/**
 * Custom-property names, derived the same way the hook derives them, so this suite cannot
 * drift from @fluentui/tokens (`'var(--color-neutral-background-1)'` → the bare name).
 */
const varNameOf = (tokenReadString: string): string => /^var\((--[^,)]+)/.exec(tokenReadString)![1];
const BACKGROUND_VAR = varNameOf(tokens.colorNeutralBackground1);
const FOREGROUND_VAR = varNameOf(tokens.colorNeutralForeground1);

const WEB_LIGHT = { background: '#ffffff', foreground: '#242424' };
const WEB_DARK = { background: '#292929', foreground: '#ffffff' };

/**
 * Renders an element carrying the theme's custom properties as INLINE styles.
 *
 * jsdom's `getComputedStyle` resolves custom properties only when they are set inline (it
 * does not cascade them from stylesheets), so an inline style is how a themed scope is
 * expressed in these unit tests. React commits inline styles before layout effects run,
 * which is when `useCssVarValue` performs its read.
 */
const DarkThemeProbe: React.FC<{ background: string; foreground: string }> = ({ background, foreground }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isDarkTheme = useIsDarkTheme(ref);

  return (
    <div
      ref={ref}
      data-testid="probe"
      data-is-dark-theme={String(isDarkTheme)}
      style={{ [BACKGROUND_VAR]: background, [FOREGROUND_VAR]: foreground } as React.CSSProperties}
    />
  );
};

const readIsDark = (container: HTMLElement): string =>
  container.querySelector('[data-testid="probe"]')!.getAttribute('data-is-dark-theme')!;

describe('useIsDarkTheme', () => {
  it('reports light when the resolved background is lighter than the foreground', () => {
    const { container } = render(<DarkThemeProbe {...WEB_LIGHT} />);

    expect(readIsDark(container)).toBe('false');
  });

  it('reports dark when the resolved background is darker than the foreground', () => {
    const { container } = render(<DarkThemeProbe {...WEB_DARK} />);

    expect(readIsDark(container)).toBe('true');
  });

  it('falls back to web light when the custom properties do not resolve', () => {
    const { container } = render(<DarkThemeProbe background="" foreground="" />);

    expect(readIsDark(container)).toBe('false');
  });

  /**
   * REGRESSION (theming Phase 2b): `useCssVarValue` is read-once-per-(element, variable),
   * so without an explicit `deps` trigger a provider theme swap left the chart stuck on
   * the theme that was active at first mount. The pre-2b implementation read
   * `ThemeContext_unstable` and WAS reactive to exactly this change, so losing it would be
   * a silent behavioural break.
   */
  it('re-reads when the provider theme class changes (element identity unchanged)', () => {
    const { container, rerender } = render(
      <ThemeClassNameProvider value="fui-theme-web-light">
        <DarkThemeProbe {...WEB_LIGHT} />
      </ThemeClassNameProvider>,
    );

    expect(readIsDark(container)).toBe('false');
    const elementBefore = container.querySelector('[data-testid="probe"]');

    rerender(
      <ThemeClassNameProvider value="fui-theme-web-dark">
        <DarkThemeProbe {...WEB_DARK} />
      </ThemeClassNameProvider>,
    );

    // Same DOM node — this is what makes the memo/read-once behaviour observable.
    expect(container.querySelector('[data-testid="probe"]')).toBe(elementBefore);
    expect(readIsDark(container)).toBe('true');
  });

  it('re-reads again when the provider theme class changes back', () => {
    const { container, rerender } = render(
      <ThemeClassNameProvider value="fui-theme-web-dark">
        <DarkThemeProbe {...WEB_DARK} />
      </ThemeClassNameProvider>,
    );

    expect(readIsDark(container)).toBe('true');

    rerender(
      <ThemeClassNameProvider value="fui-theme-web-light">
        <DarkThemeProbe {...WEB_LIGHT} />
      </ThemeClassNameProvider>,
    );

    expect(readIsDark(container)).toBe('false');
  });
});
