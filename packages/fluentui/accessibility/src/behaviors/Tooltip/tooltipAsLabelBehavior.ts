import { Accessibility } from '../../types';
import { tooltipAsDescriptionBehavior, TooltipBehaviorProps } from './tooltipAsDescriptionBehavior';

/**
 * @description
 * Implements ARIA Tooltip design pattern.
 * Adds 'aria-label' to the button if passed as a prop to root or trigger instead of aria-labelledby pointing to the content id.
 *
 * @specification
 * Adds attribute 'role=tooltip' to 'tooltip' slot.
 * Adds attribute 'aria-hidden=false' to 'tooltip' slot if 'open' property is true. Sets the attribute to 'true' otherwise.
 * Adds attribute 'aria-labelledby' based on the property 'contentId' to 'trigger' slot. This can be overriden by providing 'aria-labelledby' property directly to the component.
 * Triggers 'close' action with 'Escape' on 'trigger' if 'open' property is true.
 */
export const tooltipAsLabelBehavior: Accessibility<TooltipBehaviorProps> = props => {
  const behaviorData = tooltipAsDescriptionBehavior(props);
  const { triggerAriaLabel } = props;

  behaviorData.attributes = {
    trigger: {
      ...(triggerAriaLabel
        ? { 'aria-label': triggerAriaLabel }
        : { 'aria-labelledby': props['aria-labelledby'] || props.contentId }),
    },
    tooltip: {
      ...behaviorData.attributes.tooltip,
      ...(!triggerAriaLabel && !props['aria-labelledby'] && { id: props.contentId }),
    },
  };

  return behaviorData;
};
