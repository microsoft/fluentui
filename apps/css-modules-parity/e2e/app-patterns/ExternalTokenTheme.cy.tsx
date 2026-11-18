import * as React from 'react';
import { FluentProvider } from '@fluentui/react-provider';
import { ThemeProvider_unstable, useFluent_unstable } from '@fluentui/react-shared-contexts';
import { teamsHighContrastTheme, webDarkTheme, webLightTheme } from '@fluentui/react-theme';
import type { Theme } from '@fluentui/react-theme';
import type { JSXElement } from '@fluentui/react-utilities';
import { coreComponents } from '../components/core';
import { defaultRoot, describeParity } from '../harness';
import type { AppPattern, ComponentSpec } from '../harness';
import { patternMatrix, pick } from './matrix';
import type { PatternFactory } from './matrix';
import { P } from './patternComponents';
import { useExternalTokenThemeStyles } from './useExternalTokenThemeStyles.styles';

const themes = { webLight: webLightTheme, webDark: webDarkTheme, teamsHighContrast: teamsHighContrastTheme };
type ThemeName = keyof typeof themes;

const THEME_CLASS_NAME = 'parity-external-theme';
/** Element directly around the sampled component. */
const HOST_CLASS_NAME = 'parity-external-theme-host';

const toCSSVariables = (theme: Theme) =>
  (Object.keys(theme) as (keyof Theme)[]).map(token => `--${token}: ${theme[token]};`).join(' ');

/** Theme tokens as an app ships them in a static stylesheet, scoped to a container class instead of `:root`. */
const externalThemeCSS = (Object.keys(themes) as ThemeName[])
  .map(name => `.${THEME_CLASS_NAME}-${name} { ${toCSSVariables(themes[name])} }`)
  .join('\n');

/**
 * Inserts the token stylesheet into the provider's document (the harness copies it into the shadow root with
 * `FUI_PARITY_SHADOW_DOM=1`) and resets the inherited theme, so the `FluentProvider` below writes no token variables:
 * every token comes from the app's stylesheet.
 */
const ExternalTheme = ({ theme, children }: { theme: ThemeName; children: React.ReactNode }): JSXElement => {
  const { targetDocument } = useFluent_unstable();
  React.useInsertionEffect(() => {
    if (!targetDocument) {
      return undefined;
    }
    const style = targetDocument.createElement('style');
    style.dataset.parityExternalTheme = '';
    style.textContent = externalThemeCSS;
    targetDocument.head.append(style);
    return () => style.remove();
  }, [targetDocument]);

  return (
    <div className={`${THEME_CLASS_NAME}-${theme}`}>
      <ThemeProvider_unstable value={undefined}>
        <FluentProvider theme={undefined}>{children}</FluentProvider>
      </ThemeProvider_unstable>
    </div>
  );
};

const host = (element: JSXElement, className?: string) => (
  <div className={className ? `${HOST_CLASS_NAME} ${className}` : HOST_CLASS_NAME}>{element}</div>
);

const findHostRoot = (container: HTMLElement) =>
  defaultRoot(container.querySelector<HTMLElement>(`.${HOST_CLASS_NAME}`)!);

/** Switches the external theme at runtime (`toggles`): every variant and state is sampled in both themes. */
const switchTheme =
  (from: ThemeName, to: ThemeName): PatternFactory =>
  () => ({
    useAppPattern: function useThemeSwitch(toggled: boolean): AppPattern {
      return { wrap: element => <ExternalTheme theme={toggled ? to : from}>{host(element)}</ExternalTheme> };
    },
    toggles: true,
    findRoot: findHostRoot,
  });

/** An app container redefining `--colorNeutralStroke1` and `--colorNeutralStroke1Hover` around the component. */
const strokeOverride: PatternFactory = name =>
  name === 'Button' || name === 'Card'
    ? {
        useAppPattern: function useStrokeOverride(): AppPattern {
          const classes = useExternalTokenThemeStyles();
          return {
            wrap: element => <ExternalTheme theme="webLight">{host(element, classes.strokeOverride)}</ExternalTheme>,
          };
        },
        findRoot: findHostRoot,
      }
    : undefined;

/** A light `FluentProvider` inside a dark region themed by the external stylesheet. */
const nestedLight: PatternFactory = () => ({
  useAppPattern: function useNestedLight(): AppPattern {
    return {
      wrap: element => (
        <ExternalTheme theme="webDark">
          <FluentProvider theme={webLightTheme}>{host(element)}</FluentProvider>
        </ExternalTheme>
      ),
    };
  },
  findRoot: findHostRoot,
});

const components: Record<string, ComponentSpec> = {
  ...pick(coreComponents, ['Button', 'Checkbox', 'Input', 'Link']),
  Card: {
    ...P.Card,
    sampledSlots: [],
    interactive: true,
    props: { children: <div>Card</div>, onClick: () => undefined },
    variants: [{ appearance: 'filled' }, { appearance: 'outline' }, { appearance: 'subtle' }],
  },
};

/**
 * Tokens from an app stylesheet instead of the provider's `theme` (`FluentProvider theme={undefined}`), as apps that
 * share one token stylesheet across frameworks do, switched at runtime, partially overridden by a container, and with a
 * nested themed provider inside.
 */
describeParity(
  'app pattern: external token theme',
  patternMatrix(components, {
    'webLight to webDark': switchTheme('webLight', 'webDark'),
    'webDark to teamsHighContrast': switchTheme('webDark', 'teamsHighContrast'),
    'stroke token override': strokeOverride,
    'nested light provider in dark': nestedLight,
  }),
  { scenarios: ['app pattern'] },
);
