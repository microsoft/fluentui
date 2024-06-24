import { makeStyles, mergeClasses } from '@griffel/react';
import { ISparklineProps, ISparklineStyles } from './Sparkline.types';
import type { SlotClassNames } from '../../../../react-utilities/src/index';
import { tokens } from '@fluentui/react-theme';

/**
 * @internal
 */
export const hbcClassNames: SlotClassNames<ISparklineStyles> = {
  inlineBlock: 'fui-hbc__inlineBlock',
  valueText: 'fui-hbc__valueText',
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
    inlineBlock: mergeClasses(hbcClassNames.inlineBlock, baseStyles.inlineBlock, props.styles?.inlineBlock),
    valueText: mergeClasses(hbcClassNames.valueText, baseStyles.valueText, props.styles?.valueText),
  };
};
