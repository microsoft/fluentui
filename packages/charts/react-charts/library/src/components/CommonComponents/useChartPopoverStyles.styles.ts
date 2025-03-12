import { makeStyles, mergeClasses } from '@griffel/react';
import { HighContrastSelector } from '../../utilities/index';
import { SlotClassNames } from '@fluentui/react-utilities/src/index';
import { ChartPopoverProps, PopoverComponentStyles } from './ChartPopover.types';

/**
 * @internal
 */
export const popoverClassNames: SlotClassNames<PopoverComponentStyles> = {
  calloutContainer: 'fui-cart__calloutContainer',
};

/**
 * Base Styles
 */
const useStyles = makeStyles({
  calloutContainer: {
    [HighContrastSelector]: {
      fill: 'WindowText', // Ensure visibility in high contrast mode
      forcedColorAdjust: 'none',
    },
  },
});
/**
 * Apply styling to the Carousel slots based on the state
 */
export const usePopoverStyles_unstable = (props: ChartPopoverProps): PopoverComponentStyles => {
  const baseStyles = useStyles();
  return {
    calloutContainer: mergeClasses(popoverClassNames.calloutContainer, baseStyles.calloutContainer),
  };
};
