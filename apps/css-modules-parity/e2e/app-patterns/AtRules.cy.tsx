import * as React from 'react';
import { coreComponents } from '../components/core';
import { defaultRoot, describeParity } from '../harness';
import type { AppPattern } from '../harness';
import { overriddenInForcedColors, patternMatrix, pick, withClass } from './matrix';
import type { PatternFactory } from './matrix';
import { useAtRuleStyles } from './useAtRuleStyles.styles';

const CONTAINER_CLASS_NAME = 'parity-app-container';

/** App values a component's forced colors rule now beats; `currentColor` borders follow the root color. */
const backgroundValues = {
  'root background-color': ['--colorPaletteBerryBackground2'],
  'root color': ['--colorPaletteBerryForeground2'],
};
const forcedColorsValues = {
  'root color': ['LinkText'],
  'root border-top-color': ['Highlight'],
  'root border-bottom-color': ['Highlight'],
  'root border-inline-start-color': ['Highlight'],
  'root border-inline-end-color': ['Highlight'],
};

const container: PatternFactory = () => ({
  useAppPattern: function useContainerQuery(): AppPattern {
    const classes = useAtRuleStyles();
    return {
      className: classes.container,
      wrap: element => <div className={`${CONTAINER_CLASS_NAME} ${classes.containerParent}`}>{element}</div>,
    };
  },
  findRoot: element => defaultRoot(element.querySelector<HTMLElement>(`.${CONTAINER_CLASS_NAME}`)!),
});

describeParity(
  'app pattern: at-rules',
  patternMatrix(pick(coreComponents, ['Button', 'Input', 'Checkbox', 'Link']), {
    '@media': overriddenInForcedColors(withClass(useAtRuleStyles, 'media'), backgroundValues),
    '@media (hover: hover) :hover': overriddenInForcedColors(
      withClass(useAtRuleStyles, 'mediaHover'),
      backgroundValues,
    ),
    '@media (prefers-reduced-motion)': overriddenInForcedColors(
      withClass(useAtRuleStyles, 'reducedMotion'),
      backgroundValues,
    ),
    '@media (forced-colors: active)': overriddenInForcedColors(
      withClass(useAtRuleStyles, 'forcedColors'),
      forcedColorsValues,
    ),
    '@supports': withClass(useAtRuleStyles, 'supports'),
    '@container': overriddenInForcedColors(container, backgroundValues),
    '@layer': withClass(useAtRuleStyles, 'layer'),
  }),
  { scenarios: ['app pattern'] },
);
