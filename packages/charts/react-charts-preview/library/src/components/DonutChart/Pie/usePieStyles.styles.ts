import { PieProps, PieStyles } from './Pie.types';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { HighContrastSelectorBlack } from '../../../utilities/index';

import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';

/**
 * @internal
 */
export const donutPieClassNames: SlotClassNames<PieStyles> = {
  root: 'fui-donut-pie__root',
  insideDonutString: 'fui-donut-pie__insideDonutString',
};

/**
 * Base Styles
 */
const useStyles = makeStyles({
  root: {},
  insideDonutString: {
    ...typographyStyles.title2,
    fill: tokens.colorNeutralForeground1,
    [HighContrastSelectorBlack]: {
      fill: 'rgb(179, 179, 179)',
    },
  },
});

/**
 * Apply styling to the Pie inside donut chart component
 */
export const usePieStyles_unstable = (props: PieProps): PieStyles => {
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
