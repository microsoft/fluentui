import { makeStyles, mergeClasses } from '@griffel/react';
import { ISparklineProps, ISparklineStyles } from './Sparkline.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';

/**
 * @internal
 */
export const sparklineClassNames: SlotClassNames<ISparklineStyles> = {
  inlineBlock: 'fui-sprk__inlineBlock',
  valueText: 'fui-sprk__valueText',
};

/**
 * Base Styles
 */
const useStyles = makeStyles({
  inlineBlock: {
    display: 'inline',
  },
  valueText: {
    fontSize: tokens!.fontSizeBase200,
    fill: tokens!.colorNeutralForeground1,
  },
});

/**
 * Apply styling to the Carousel slots based on the state
 */
export const useSparklineStyles_unstable = (props: ISparklineProps): ISparklineStyles => {
  const baseStyles = useStyles();

  return {
    inlineBlock: mergeClasses(sparklineClassNames.inlineBlock, baseStyles.inlineBlock, props.styles?.inlineBlock),
    valueText: mergeClasses(sparklineClassNames.valueText, baseStyles.valueText, props.styles?.valueText),
  };
};
