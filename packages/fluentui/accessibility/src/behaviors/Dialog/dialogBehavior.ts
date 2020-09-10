import { Accessibility, AccessibilityAttributes } from '../../types';
import { popupBehavior, PopupBehaviorProps } from '../Popup/popupBehavior';

/**
 * @description
 * Implements ARIA Dialog (Modal) design pattern.
 * Adds tabIndex='0' to 'trigger' slot, if it is not tabbable element and no tabIndex attribute provided.
 *
 * @specification
 * Adds attribute 'aria-modal=true' to 'popup' slot.
 * Adds attribute 'role=dialog' to 'popup' slot.
 * Adds attribute 'aria-labelledby' based on the property 'aria-labelledby' to 'popup' slot.
 * Adds attribute 'aria-describedby' based on the property 'aria-describedby' to 'popup' slot.
 */
export const dialogBehavior: Accessibility<DialogBehaviorProps> = props => {
  const behaviorData = popupBehavior(props);

  const defaultAriaLabelledBy = getDefaultAriaLabelledBy(props);
  const defaultAriaDescribedBy = getDefaultAriaDescribedBy(props);

  behaviorData.attributes.popup = {
    ...behaviorData.attributes.popup,
    role: 'dialog',
    'aria-modal': true,
    'aria-labelledby': defaultAriaLabelledBy || props['aria-labelledby'],
    'aria-describedby': defaultAriaDescribedBy || props['aria-describedby'],
  };
  behaviorData.attributes.header = {
    id: defaultAriaLabelledBy,
  };
  behaviorData.attributes.content = {
    id: defaultAriaDescribedBy,
  };

  return behaviorData;
};

/**
 * Returns the element id of the header, it is used when user does not provide aria-label or
 * aria-labelledby as props.
 */
const getDefaultAriaLabelledBy = (props: DialogBehaviorProps) => {
  if (props['aria-label'] || props['aria-labelledby']) {
    return undefined;
  }
  return props.headerId;
};

/**
 * Returns the element id of the content, it is used when user does not provide aria-describedby
 * as props.
 */
const getDefaultAriaDescribedBy = (props: DialogBehaviorProps) => {
  if (props['aria-describedby']) {
    return undefined;
  }
  return props.contentId;
};

export type DialogBehaviorProps = {
  headerId?: string;
  contentId?: string;
} & PopupBehaviorProps &
  Pick<AccessibilityAttributes, 'aria-label' | 'aria-labelledby' | 'aria-describedby'>;
