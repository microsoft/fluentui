import { Accessibility } from '../../types';

/**
 * @description
 * Implements ARIA Menu Radio Group design pattern.
 * @specification
 *  Adds role='group'.
 */
export const toolbarMenuRadioGroupBehavior: Accessibility<ToolbarMenuRadioGroupBehaviorProps> = () => ({
  attributes: {
    root: {
      role: 'group',
    },
  },
});

export type ToolbarMenuRadioGroupBehaviorProps = never;
