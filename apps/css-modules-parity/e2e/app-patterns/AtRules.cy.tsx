import * as React from 'react';
import { coreComponents } from '../components/core';
import { defaultRoot, describeParity } from '../harness';
import type { AppPattern } from '../harness';
import { patternMatrix, pick, withClass } from './matrix';
import type { PatternFactory } from './matrix';
import { useAtRuleStyles } from './useAtRuleStyles.styles';

const CONTAINER_CLASS_NAME = 'parity-app-container';

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
    '@media': withClass(useAtRuleStyles, 'media'),
    '@media (hover: hover) :hover': withClass(useAtRuleStyles, 'mediaHover'),
    '@media (prefers-reduced-motion)': withClass(useAtRuleStyles, 'reducedMotion'),
    '@media (forced-colors: active)': withClass(useAtRuleStyles, 'forcedColors'),
    '@supports': withClass(useAtRuleStyles, 'supports'),
    '@container': container,
    '@layer': withClass(useAtRuleStyles, 'layer'),
  }),
  { scenarios: ['app pattern'] },
);
