import { IPieProps, IPieStyles } from './Pie.types';
import { tokens } from '@fluentui/react-theme';
import { HighContrastSelectorBlack } from '@fluentui/react/lib/Styling';

import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';

/**
 * @internal
 */
export const donutPieClassNames: SlotClassNames<IPieStyles> = {
  root: 'fui-donut-pie__root',
  insideDonutString: 'fui-donut-pie__insideDonutString',
};

/**
 * Base Styles
 */
const useStyles = makeStyles({
  root: {},
  insideDonutString: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    selectors: {
      [HighContrastSelectorBlack]: {
        fill: 'rgb(179, 179, 179)',
      },
    },
  },
});

/**
 * Apply styling to the Carousel slots based on the state
 */
export const usePieStyles_unstable = (props: IPieProps): IPieStyles => {
  const { className } = props;
  const baseStyles = useStyles();

  return {
    root: mergeClasses(donutPieClassNames.root, baseStyles.root, className, props.styles?.root),
    insideDonutString: mergeClasses(
      donutPieClassNames.insideDonutString,
      baseStyles.insideDonutString,
      className,
      props.styles?.insideDonutString,
    ),
  };
};
