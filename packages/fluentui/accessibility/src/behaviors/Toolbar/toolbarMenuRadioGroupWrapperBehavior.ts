import { Accessibility } from '../../types';

/**
 * @description
 * Toolbar's Menu Radio Group's wrapper needs to be ignored by screen reader. This way the screen reader can correctly narrate the number of menu items
 *
 * @specification
 * Adds role='presentation'.
 */
export const toolbarMenuRadioGroupWrapperBehavior: Accessibility<ToolbarMenuRadioGroupWrapperBehaviorProps> = () => ({
  attributes: {
    root: {
      role: 'presentation',
    },
  },
});

export type ToolbarMenuRadioGroupWrapperBehaviorProps = never;
