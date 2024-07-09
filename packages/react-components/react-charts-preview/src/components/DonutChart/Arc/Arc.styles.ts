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
    selectors: {
      '::-moz-focus-inner': {
        ...shorthands.border('0'),
      },
    },
  },
  focusRing: {
    strokeWidth: '4px',
    fill: 'transparent',
  },
  arcLabel: {
    fontSize: tokens.fontSizeBase100,
    fontWeight: tokens.fontWeightSemibold,
  },
});

/**
 * Apply styling to the Carousel slots based on the state
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
