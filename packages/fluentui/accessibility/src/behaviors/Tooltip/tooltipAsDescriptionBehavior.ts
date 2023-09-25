import { keyboardKey } from '../../keyboard-key';
import { Accessibility, AccessibilityAttributes } from '../../types';

/**
 * @description
 * Implements ARIA Tooltip design pattern.
 *
 * @specification
 * Adds attribute 'role=tooltip' to 'tooltip' slot.
 * Adds attribute 'aria-hidden=false' to 'tooltip' slot if 'open' property is true. Sets the attribute to 'true' otherwise.
 * Adds attribute 'aria-describedby' based on the property 'contentId' to 'trigger' slot. This can be overriden by providing 'aria-describedby' property directly to the component.
 * Triggers 'close' action with 'Escape' on 'trigger' if 'open' property is true.
 */
export const tooltipAsDescriptionBehavior: Accessibility<TooltipBehaviorProps> = props => {
  const defaultAriaDescribedBy = getDefaultAriaDescribedBy(props);

  return {
    attributes: {
      trigger: {
        'aria-describedby': defaultAriaDescribedBy || props['aria-describedby'],
      },
      tooltip: {
        role: 'tooltip',
        id: defaultAriaDescribedBy,
        'aria-hidden': !props.open,
      },
    },
    keyActions: {
      trigger: {
        ...(props.open && {
          close: {
            keyCombinations: [{ keyCode: keyboardKey.Escape }],
          },
        }),
      },
    },
  };
};

/**
 * Returns the element id of the tooltip, it is used when user does not provide aria-describedby as props.
 */
const getDefaultAriaDescribedBy = (props: TooltipBehaviorProps) => {
  if (props['aria-describedby']) {
    return undefined;
  }
  return props.contentId;
};

export type TooltipBehaviorProps = {
  /** If tooltip is visible. */
  open: boolean;
  /** Tooltip's container id. */
  contentId: string;
  /** aria-label from trigger shorthand. */
  triggerAriaLabel: string;
} & Pick<AccessibilityAttributes, 'aria-label' | 'aria-labelledby' | 'aria-describedby'>;
