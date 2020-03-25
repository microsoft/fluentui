import { Accessibility } from '../../types';

/**
 * @description
 * Implements ARIA Menu Radio Group design pattern.
 * @specification
 *  Adds role='group'.
 */
const toolbarMenuRadioGroupBehavior: Accessibility = () => ({
  attributes: {
    root: {
      role: 'group',
    },
  },
});

export type ToolbarMenuRadioGroupBehaviorProps = never;

export default toolbarMenuRadioGroupBehavior;
