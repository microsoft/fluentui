import type { ComponentProps, ComponentState, IntrinsicSlotProps } from '@fluentui/react-utilities';

export type MenuPopoverSlots = {
  root: IntrinsicSlotProps<'div'>;
};

/**
 * MenuPopover Props
 */
export type MenuPopoverProps = ComponentProps<MenuPopoverSlots>;

/**
 * State used in rendering MenuPopover
 */
export type MenuPopoverState = ComponentState<MenuPopoverSlots> & {
  /**
   * Root menus are rendered out of DOM order on `document.body`, use this to render the menu in DOM order
   * This option is disregarded for submenus
   */
  inline: boolean;
};
