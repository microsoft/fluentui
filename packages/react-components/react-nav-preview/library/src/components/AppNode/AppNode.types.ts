import { NavSize } from '../Nav/Nav.types';

import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type AppNodeSlots = {
  root: Slot<'div'>;

  /**
   * Icon that renders.
   */
  icon?: Slot<'span'>;
};

/**
 * AppNode Props
 */
export type AppNodeProps = ComponentProps<AppNodeSlots>;

/**
 * State used in rendering AppNode
 */
export type AppNodeState = ComponentState<AppNodeSlots> & {
  /**
   * The size of the NavItem
   *
   * @default 'medium'
   */
  size: NavSize;
};
