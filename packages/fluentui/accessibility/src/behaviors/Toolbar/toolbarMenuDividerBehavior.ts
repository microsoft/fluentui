import { Accessibility } from '../../types';

/**
 * @description
 * toolbar menu divider is used only visualy to separate and distinguish groups of menuitems.
 *
 * @specification
 * Adds role='presentation'.
 */
export const toolbarMenuDividerBehavior: Accessibility<ToolbarMenuDividerBehaviorProps> = () => ({
  attributes: {
    root: {
      role: 'presentation',
    },
  },
});

export type ToolbarMenuDividerBehaviorProps = never;
