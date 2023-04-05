import type { DialogProps, DialogSurfaceProps } from '@fluentui/react-dialog';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type DrawerSlots = {
  /**
   * Root slot of the Drawer.
   * This slot is rendered as a `div` by default.
   * Only renders if `type` is `inline`.
   */
  root: Slot<'div'>;
};

/**
 * Drawer Props
 */
export type DrawerProps = ComponentProps<Partial<DrawerSlots>> & {
  /**
   * Position of the drawer.
   * @defaultvalue 'left'
   *
   * - 'left' - Drawer is positioned on the left side of the screen.
   * - 'right' - Drawer is positioned on the right side of the screen.
   */
  position?: 'left' | 'right';

  /**
   * Type of the drawer.
   * @defaultvalue 'overlay'
   *
   * - 'overlay' - Drawer is hidden by default and can be opened by clicking on the trigger.
   * - 'inline' - Drawer is stacked with the content
   */
  type?: 'inline' | 'overlay';

  /**
   * Size of the drawer.
   * @defaultvalue 'small'
   *
   * - 'small' - Drawer is 320px wide.
   * - 'medium' - Drawer is 592px wide.
   * - 'large' - Drawer is 940px wide.
   * - 'full' - Drawer is 100vw wide.
   */
  size?: 'small' | 'medium' | 'large' | 'full';

  /**
   * When this is set, the rest of the page is dimmed out and cannot be interacted with.
   * The tab sequence is kept within the dialog and moving the focus outside
   * the dialog will imply closing it. This is the default type of the component.
   * This prop is only used when `type` is `overlay`.
   *
   * @defaultvalue true
   */
  modal?: boolean;
} & Pick<DialogProps, 'open' | 'defaultOpen' | 'onOpenChange'>;

/**
 * State used in rendering Drawer
 */
export type DrawerState = ComponentState<DrawerSlots> &
  Required<Pick<DrawerProps, 'type' | 'position' | 'open' | 'size'>> & {
    dialog: DialogProps;
    dialogSurface: DialogSurfaceProps;
  };
