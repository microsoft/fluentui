import { keyboardKey, SpacebarKey } from '../../keyboard-key';
import { Accessibility } from '../../types';

/**
 * @description
 * Adds accessibility attributed to implement the Accordion design pattern.
 * Adds 'aria-disabled' to the 'content' slot with a value based on disabled, active and canBeCollapsed props.
 * Adds role='heading' and aria-level='3' if the element type is not a header.
 *
 * @specification
 * Adds attribute 'role=button' to 'content' slot.
 * Adds attribute 'tabIndex=0' to 'content' slot.
 * Adds attribute 'aria-expanded=true' based on the property 'active' to 'content' slot.
 * Adds attribute 'aria-controls=content-id' based on the property 'accordionContentId' to 'content' slot.
 * Triggers 'performClick' action with 'Enter' or 'Spacebar' on 'content'.
 */
export const accordionTitleBehavior: Accessibility<AccordionTitleBehaviorProps> = props => {
  const isHeading = /(h\d{1})$/.test(props.as);
  const forcedOpen = props.active && !props.canBeCollapsed;
  return {
    attributes: {
      root: {
        role: isHeading ? undefined : 'heading',
        'aria-level': isHeading ? undefined : 3,
      },
      content: {
        'aria-expanded': !!props.active,
        'aria-disabled': !!(forcedOpen || props.disabled),
        'aria-controls': props.accordionContentId,
        role: 'button',
        tabIndex: 0,
      },
    },
    keyActions: {
      content: {
        performClick: {
          keyCombinations: [{ keyCode: keyboardKey.Enter }, { keyCode: SpacebarKey }],
        },
      },
    },
  };
};

export type AccordionTitleBehaviorProps = {
  /** Element type. */
  as?: string;
  /** Whether or not the title is in the open state. */
  active?: boolean;
  /** If at least one panel needs to stay active and this title does not correspond to the last active one. */
  canBeCollapsed?: boolean;
  /** An accordion title can show it is currently unable to be interacted with. */
  disabled?: boolean;
  /** Id of the content it owns. */
  accordionContentId?: string;
};
