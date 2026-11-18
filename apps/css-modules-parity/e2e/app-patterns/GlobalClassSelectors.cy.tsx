import * as React from 'react';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import type { JSXElement } from '@fluentui/react-utilities';
import { coreComponents } from '../components/core';
import { describeParity } from '../harness';
import type { AppPattern, ComponentSpec } from '../harness';
import { around, partSpecs } from './appPatternParts';
import { patternMatrix, tolerate } from './matrix';
import type { PatternFactory } from './matrix';
// Imported after the components, so style-loader inserts it after the Fluent CSS Modules stylesheets.
import styles from './GlobalClassSelectors.module.css';

const components: Record<string, ComponentSpec> = {
  Button: coreComponents.Button,
  MenuItem: partSpecs.MenuItem,
  Checkbox: coreComponents.Checkbox,
};

/** Declarations of `GlobalClassSelectors.module.css`, under `scope`. */
const rulesUnder = (scope: string, important = false) => {
  const value = (name: string) => `var(--${name})${important ? ' !important' : ''}`;
  const look = `background-color: ${value('colorPaletteBerryBackground2')}; color: ${value(
    'colorPaletteBerryForeground2',
  )};`;
  return [
    `${scope} .fui-Button, ${scope} .fui-MenuItem { ${look} }`,
    `${scope} .fui-Button__icon { color: ${value('colorPaletteBlueForeground2')}; }`,
    `${scope} .fui-Checkbox__indicator { ${look} }`,
  ].join('\n');
};

/** The same rules as plain CSS inserted before every other stylesheet, like an app's global CSS loaded first. */
const PrependedStyles = ({ css, children }: { css: string; children: JSXElement }): JSXElement => {
  const { targetDocument } = useFluent_unstable();
  React.useInsertionEffect(() => {
    if (!targetDocument) {
      return undefined;
    }
    const style = targetDocument.createElement('style');
    style.textContent = css;
    targetDocument.head.prepend(style);
    return () => style.remove();
  }, [css, targetDocument]);
  return children;
};

const inContainer =
  (className: string, css?: string): PatternFactory =>
  (componentName, spec) => {
    const { wrap, findRoot } = around(componentName, spec, children => {
      const container = <div className={className}>{children}</div>;
      return css ? <PrependedStyles css={css}>{container}</PrependedStyles> : container;
    });
    return {
      useAppPattern: function useContainerPattern(): AppPattern {
        return { wrap };
      },
      findRoot,
    };
  };

/**
 * App CSS after Fluent CSS: a plain CSS rule now beats component rules of equal specificity (the documented plain CSS
 * class name difference). Before, Griffel's runtime component styles came after the app's stylesheet.
 */
const appCSSWins = {
  'root background-color': ['--colorPaletteBerryBackground2'],
  'root color': ['--colorPaletteBerryForeground2'],
  'fui-Button__icon color': ['--colorPaletteBlueForeground2'],
  // The icon's `currentColor` borders follow its color.
  'fui-Button__icon border-top-color': ['--colorPaletteBlueForeground2'],
  'fui-Button__icon border-bottom-color': ['--colorPaletteBlueForeground2'],
  'fui-Button__icon border-inline-start-color': ['--colorPaletteBlueForeground2'],
  'fui-Button__icon border-inline-end-color': ['--colorPaletteBlueForeground2'],
  'fui-Checkbox__indicator background-color': ['--colorPaletteBerryBackground2'],
  'fui-Checkbox__indicator color': ['--colorPaletteBerryForeground2'],
};

const FIRST_SCOPE = 'parity-app-first-scoped';
const FIRST_WHERE_SCOPE = 'parity-app-first-where-scoped';
const FIRST_IMPORTANT_SCOPE = 'parity-app-first-important';

/**
 * Apps styling Fluent through `:global(.fui-*)` selectors in their own CSS Modules, scoped under a container class
 * (reduced from app stylesheets restyling every Button, MenuItem and Checkbox of a region).
 */
describeParity(
  'app pattern: global Fluent class selectors',
  patternMatrix(components, {
    // App CSS inserted after Fluent CSS (imported later).
    '(0,2,0) after Fluent CSS': tolerate(inContainer(styles.scoped), appCSSWins),
    '(0,1,0) after Fluent CSS': tolerate(inContainer(styles.whereScoped), appCSSWins),
    '(0,1,0) !important after Fluent CSS': inContainer(styles.important),
    // App CSS inserted before Fluent CSS (global CSS loaded first): component rules keep winning ties, as in Griffel.
    '(0,2,0) before Fluent CSS': inContainer(FIRST_SCOPE, rulesUnder(`.${FIRST_SCOPE}`)),
    '(0,1,0) before Fluent CSS': inContainer(FIRST_WHERE_SCOPE, rulesUnder(`:where(.${FIRST_WHERE_SCOPE})`)),
    '(0,1,0) !important before Fluent CSS': inContainer(
      FIRST_IMPORTANT_SCOPE,
      rulesUnder(`:where(.${FIRST_IMPORTANT_SCOPE})`, true),
    ),
  }),
  { scenarios: ['app pattern'] },
);
