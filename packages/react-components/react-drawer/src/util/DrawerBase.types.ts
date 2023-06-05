export type DrawerBaseProps = {
  /**
   * Position of the drawer.
   *
   * @default 'left'
   */
  position?: 'left' | 'right';

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

export type DrawerBaseState = {
  /**
   * Whether the drawer should be rendered.
   * */
  shouldRender: boolean;

  /**
   * Whether the drawer is rendered and already visible.
   * */
  visible: boolean;

  /**
   * Whether the drawer is entering the screen.
   * */
  entering: boolean;

  /**
   * Whether the drawer is exiting the screen.
   * */
  exiting: boolean;
};
