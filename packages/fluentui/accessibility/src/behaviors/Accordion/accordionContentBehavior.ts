import { Accessibility } from '../../types';

/**
 * @description
 * Optionally, an accordion content can have the 'role=region'. It is not applied by default.
 *
 * @specification
 * Adds attribute 'aria-labelledby' based on the property 'accordionTitleId' to 'root' slot.
 */
const accordionContentBehavior: Accessibility<AccordionContentBehaviorProps> = props => {
  return {
    attributes: {
      root: {
        'aria-labelledby': props.accordionTitleId,
      },
    },
  };
};

export default accordionContentBehavior;

export type AccordionContentBehaviorProps = {
  /** id of the accordion title element. */
  accordionTitleId?: string;
};
