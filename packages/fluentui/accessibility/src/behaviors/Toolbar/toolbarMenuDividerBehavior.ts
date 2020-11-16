import { Accessibility } from '../../types';

/**
 * @description
 * toolbar menu divider is used to separate and distinguish groups of menuitems.
 *
 * @specification
 * Adds role='separator'.
 */
export const toolbarMenuDividerBehavior: Accessibility<ToolbarMenuDividerBehaviorProps> = () => ({
  attributes: {
    root: {
      role: 'separator',
    },
  },
});

export type ToolbarMenuDividerBehaviorProps = never;
