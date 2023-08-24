export type DrawerBaseProps = {
  /**
   * Position of the drawer.
   *
   * @default 'start'
   */
  position?: 'start' | 'end';

  /**
   * Size of the drawer.
   *
   * - 'small' - Drawer is 320px wide.
   * - 'medium' - Drawer is 592px wide.
   * - 'large' - Drawer is 940px wide.
   * - 'full' - Drawer is 100vw wide.
   *
   * @default 'small'
   */
  size?: 'small' | 'medium' | 'large' | 'full';

  /**
   * Controls the open state of the Drawer
   *
   * @default false
   */
  open?: boolean;

  /**
   * Default value for the uncontrolled open state of the Drawer.
   *
   * @default false
   */
  defaultOpen?: boolean;
};
