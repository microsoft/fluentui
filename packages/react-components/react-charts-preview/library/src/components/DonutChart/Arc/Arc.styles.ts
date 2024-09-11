import { IArcProps, IArcStyles } from './Arc.types';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';

/**
 * @internal
 */
export const donutArcClassNames: SlotClassNames<IArcStyles> = {
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
    ...shorthands.outline('transparent'),
    stroke: tokens.colorNeutralBackground1,
    selectors: {
      '::-moz-focus-inner': {
        ...shorthands.border('0'),
      },
    },
  },
  focusRing: {
    stroke: tokens.colorStrokeFocus2,
    strokeWidth: '4px',
    fill: 'transparent',
  },
  arcLabel: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    fill: tokens.colorNeutralForeground1,
  },
});

/**
 * Apply styling to the Arc components
 */
export const useArcStyles_unstable = (props: IArcProps): IArcStyles => {
  const { className } = props;
  const baseStyles = useStyles();

  return {
    root: mergeClasses(donutArcClassNames.root, baseStyles.root, className, props.styles?.root),
    focusRing: mergeClasses(donutArcClassNames.focusRing, baseStyles.focusRing, props.styles?.focusRing),
    arcLabel: mergeClasses(donutArcClassNames.arcLabel, baseStyles.arcLabel, props.styles?.arcLabel),
  };
};
