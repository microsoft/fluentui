import * as React from 'react';
import { coreComponents } from '../components/core';
import { defaultRoot, describeParity } from '../harness';
import type { AppPattern } from '../harness';
import { patternMatrix, pick, tolerate, withClass } from './matrix';
import type { PatternFactory } from './matrix';
import { APP_PARENT_CLASS_NAME, useSelectorStyles, useSlotDescendantStyles } from './useSelectorStyles.styles';

const components = ['Button', 'Input', 'Checkbox', 'Link'] as const;

/**
 * Rules without a leading pseudo-class (`&[data-app-state]`, `:not(...)`, `:is(...)`) sit in Griffel's default bucket,
 * so component state rules beat them; in the default mode they now apply in every state (root color reaches slots).
 */
const appBackground = {
  'root background-color': ['--colorPaletteBerryBackground2'],
  'root color': ['--colorPaletteBerryForeground2'],
};

const parentHover: PatternFactory = () => ({
  useAppPattern: function useParentHover(): AppPattern {
    return {
      className: useSelectorStyles().parentHover,
      wrap: element => <div className={APP_PARENT_CLASS_NAME}>{element}</div>,
    };
  },
  findRoot: container => defaultRoot(container.querySelector<HTMLElement>(`.${APP_PARENT_CLASS_NAME}`)!),
});

const slotDescendant: PatternFactory = name =>
  name === 'Link'
    ? undefined
    : withClass(useSlotDescendantStyles, name as (typeof components)[number])(name, {} as never);

describeParity(
  'app pattern: selector shapes',
  patternMatrix(pick(coreComponents, components), {
    'attribute selector': tolerate(
      withClass(useSelectorStyles, 'attribute', { props: { 'data-app-state': 'on' } }),
      appBackground,
    ),
    ':not(:disabled):hover': tolerate(withClass(useSelectorStyles, 'notDisabledHover'), appBackground),
    ':is(:hover, :focus-visible)': tolerate(withClass(useSelectorStyles, 'isHoverOrFocusVisible'), appBackground),
    ':where(:hover)': withClass(useSelectorStyles, 'whereHover'),
    ':focus': withClass(useSelectorStyles, 'focus'),
    ':focus-visible': withClass(useSelectorStyles, 'focusVisible'),
    '[data-fui-focus-visible]': withClass(useSelectorStyles, 'fluentFocusVisible'),
    'parent :hover': parentHover,
    'slot descendant': slotDescendant,
    '::after': withClass(useSelectorStyles, 'after'),
    '::before': withClass(useSelectorStyles, 'before'),
  }),
  { scenarios: ['app pattern'] },
);
