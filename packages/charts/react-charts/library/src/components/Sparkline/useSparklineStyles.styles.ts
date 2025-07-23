import { makeStyles, mergeClasses } from '@griffel/react';
import { SparklineProps, SparklineStyles } from './Sparkline.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens, typographyStyles } from '@fluentui/react-theme';

/**
 * @internal
 */
export const sparklineClassNames: SlotClassNames<SparklineStyles> = {
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
    ...typographyStyles.caption1,
    fill: tokens.colorNeutralForeground1,
    forcedColorAdjust: 'auto',
  },
});

/**
 * Apply styling to the Carousel slots based on the state
 */
export const useSparklineStyles = (props: SparklineProps): SparklineStyles => {
  const baseStyles = useStyles();

  return {
    inlineBlock: mergeClasses(sparklineClassNames.inlineBlock, baseStyles.inlineBlock, props.styles?.inlineBlock),
    valueText: mergeClasses(sparklineClassNames.valueText, baseStyles.valueText, props.styles?.valueText),
  };
};
