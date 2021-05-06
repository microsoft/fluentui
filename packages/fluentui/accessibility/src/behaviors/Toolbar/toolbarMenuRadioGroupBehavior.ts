import { Accessibility } from '../../types';

/**
 * @description
 * Toolbar's Menu Radio Group needs to be ignored by screen reader. This way the screen reader can correctly narrate the number of menu items
 *
 * @specification
 * Adds role='presentation'.
 */
export const toolbarMenuRadioGroupBehavior: Accessibility<ToolbarMenuRadioGroupBehaviorProps> = () => ({
  attributes: {
    root: {
      role: 'presentation',
    },
  },
});

export type ToolbarMenuRadioGroupBehaviorProps = never;
