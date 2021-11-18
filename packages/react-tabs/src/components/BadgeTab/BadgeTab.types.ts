import * as React from 'react';
import { BadgeProps } from '@fluentui/react-badge';
import type { ComponentProps, ComponentState, ObjectShorthandProps } from '@fluentui/react-utilities';
import { TabCommons, TabSlots, TabState } from '../Tab/index';

export type BadgeTabSlots = TabSlots & {
  /**
   * Badge that displays with the content.
   */
  badge: ObjectShorthandProps<BadgeProps>;

  /**
   * The children elements of this tab.
   */
  children: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>>;
};

export type BadgeTabCommons = TabCommons;

/**
 * BadgeTab Props
 */
export type BadgeTabProps = ComponentProps<BadgeTabSlots> & BadgeTabCommons;

/**
 * State used in rendering BadgeTab
 */
export type BadgeTabState = ComponentState<BadgeTabSlots> &
  BadgeTabCommons &
  Omit<TabState, keyof TabSlots | 'components'>;
