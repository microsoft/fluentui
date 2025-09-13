import { ArcProps, ArcStyles } from './Arc.types';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { HighContrastSelector } from '../../../utilities/utilities';

/**
 * @internal
 */
export const donutArcClassNames: SlotClassNames<ArcStyles> = {
  root: 'fui-donut-arc__root',
  focusRing: 'fui-donut-arc__focusRing',
  arcLabel: 'fui-donut-arc__arcLabel',
};

/**
 * Base Styles
 */
const useStyles = makeStyles({
  root: {
    cursor: 'default',
    outline: 'transparent',
    stroke: tokens.colorNeutralBackground1,
    '& selectors': {
      '::-moz-focus-inner': {
        ...shorthands.border('0'),
      },
    },
  },
  focusRing: {
    stroke: tokens.colorStrokeFocus2,
    strokeWidth: tokens.strokeWidthThickest,
    fill: 'transparent',
  },
  arcLabel: {
    ...typographyStyles.caption1Strong,
    fill: tokens.colorNeutralForeground1,
    [HighContrastSelector]: {
      stroke: 'CanvasText',
    },
  },
});

/**
 * Apply styling to the Arc components
 */
export const useArcStyles = (props: ArcProps): ArcStyles => {
  const { className } = props;
  const baseStyles = useStyles();

  return {
    root: mergeClasses(donutArcClassNames.root, baseStyles.root, className, props.styles?.root),
    focusRing: mergeClasses(donutArcClassNames.focusRing, baseStyles.focusRing, props.styles?.focusRing),
    arcLabel: mergeClasses(donutArcClassNames.arcLabel, baseStyles.arcLabel, props.styles?.arcLabel),
  };
};
