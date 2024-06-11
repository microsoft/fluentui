import * as React from 'react';

type MotionType = 'entering' | 'entered' | 'idle' | 'exiting' | 'exited' | 'unmounted';

type MotionState<Element extends HTMLElement = HTMLElement> = {
  /**
   * Ref to the element.
   */
  ref: React.Ref<Element>;

  /**
   * Current state of the element.
   *
   * - `unmounted` - The element is not yet rendered or can be safely removed from the DOM.
   * - `entering` - The element is performing enter animation.
   * - `entered` - The element has finished enter animation.
   * - `idle` - The element is currently not animating, but rendered on screen.
   * - `exiting` - The element is performing exit animation.
   * - `exited` - The element has finished exit animation.
   */
  type: MotionType;

  /**
   * Indicates whether the component can be rendered.
   * Useful to render the element before animating it or to remove it from the DOM after exit animation.
   */
  canRender: boolean;

  /**
   * Indicates whether the component is ready to receive a CSS transition className.
   * Useful to apply CSS transitions when the element is mounted and ready to be animated.
   */
  active: boolean;
};

export type DrawerBaseProps = {
  /**
   * Position of the drawer.
   *
   * Note: 'bottom' does not supports size, but it supports customized height.
   *
   * @default 'start'
   */
  position?: 'start' | 'end' | 'bottom';

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
};

export type DrawerBaseState = Required<Pick<DrawerBaseProps, 'position' | 'size'>> & {
  motion: MotionState<HTMLElement>;
};

export type DrawerScrollState = 'none' | 'top' | 'middle' | 'bottom';
