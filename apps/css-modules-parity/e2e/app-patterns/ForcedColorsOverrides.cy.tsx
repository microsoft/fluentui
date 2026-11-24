import { coreComponents } from '../components/core';
import { describeParity } from '../harness';
import type { AppPattern, ComponentSpec } from '../harness';
import { partSpecs } from './appPatternParts';
import { overriddenInForcedColors, patternMatrix } from './matrix';
import type { PatternFactory } from './matrix';
import { useForcedColorsOverrideStyles } from './useForcedColorsOverrideStyles.styles';

const components: Record<string, ComponentSpec> = {
  Button: coreComponents.Button,
  MenuItem: partSpecs.MenuItem,
  Link: coreComponents.Link,
  Switch: coreComponents.Switch,
};

/** Switch's forced colors color is on its indicator, so the app styles that slot; the others style the root. */
const forcedColorsOverride =
  (variant: 'plain' | 'doubled'): PatternFactory =>
  componentName => ({
    useAppPattern: function useForcedColorsOverride(): AppPattern {
      const classes = useForcedColorsOverrideStyles();
      return componentName === 'Switch'
        ? {
            props: {
              indicator: { className: variant === 'plain' ? classes.indicatorPlain : classes.indicatorDoubled },
            },
          }
        : { className: classes[variant] };
    },
  });

/** Values the plain overrides declare; `currentColor` borders and icons follow the root color. */
const appSystemColors = {
  'root color': ['LinkText', 'ButtonText'],
  'root background-color': ['Canvas'],
  'root border-top-color': ['LinkText', 'ButtonText'],
  'root border-bottom-color': ['LinkText', 'ButtonText'],
  'root border-inline-start-color': ['LinkText', 'ButtonText'],
  'root border-inline-end-color': ['LinkText', 'ButtonText'],
  'fui-Switch__indicator color': ['LinkText'],
  'fui-Switch__indicator border-top-color': ['LinkText'],
  'fui-Switch__indicator border-bottom-color': ['LinkText'],
  'fui-Switch__indicator border-inline-start-color': ['LinkText'],
};

/**
 * App `@media (forced-colors: active)` overrides with `:hover`/`:active` (reduced from apps restyling high contrast
 * states). Only meaningful with `FUI_PARITY_FORCED_COLORS=1`; otherwise no rule matches.
 */
describeParity(
  'app pattern: forced colors overrides',
  patternMatrix(components, {
    // Equal to Griffel's component specificity: component forced colors rules now win (see the README).
    'plain @media (forced-colors)': overriddenInForcedColors(forcedColorsOverride('plain'), appSystemColors),
    // `&&&` (a doubled class; Griffel compiles `&&` to a single class) wins like the plain override did in Griffel;
    // nothing is tolerated.
    '&&& @media (forced-colors)': forcedColorsOverride('doubled'),
  }),
  { scenarios: ['app pattern'] },
);
