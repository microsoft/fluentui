import { Accessibility } from '../../types';

/**
 * @description
 * Implements ARIA Menu Radio Group design pattern.
 * @specification
 *  Adds role='group'.
 */
const toolbarRadioGroupBehavior: Accessibility = () => ({
  attributes: {
    root: {
      role: 'group'
    }
  }
});

export default toolbarRadioGroupBehavior;
