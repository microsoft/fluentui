import { ComponentProps, ComponentState, ElementShorthandProps } from '@fluentui/react-utilities';

export type MenuPopoverSlots = {
  root: ElementShorthandProps<'div'>;
};

/**
 * MenuPopover Props
 */
export interface MenuPopoverProps extends ComponentProps<MenuPopoverSlots> {}

/**
 * State used in rendering MenuPopover
 */
export interface MenuPopoverState extends ComponentState<MenuPopoverSlots> {
  /**
   * Root menus are rendered out of DOM order on `document.body`, use this to render the menu in DOM order
   * This option is disregarded for submenus
   */
  inline: boolean;
}
