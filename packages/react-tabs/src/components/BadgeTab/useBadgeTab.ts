import * as React from 'react';
import { resolveShorthand } from '@fluentui/react-utilities';
import type { BadgeTabProps, BadgeTabSlots, BadgeTabState } from './BadgeTab.types';
import { tabShorthandProps, useTab } from '../Tab/index';
import { Badge, BadgeProps } from '@fluentui/react-badge';

/**
 * Array of all shorthand properties listed in BadgeTabSlots
 */
export const badgeTabShorthandProps: (keyof BadgeTabSlots)[] = [...tabShorthandProps, 'badge', 'children'];

/**
 * Create the state required to render BadgeTab.
 *
 * The returned state can be modified with hooks such as useBadgeTabStyles,
 * before being passed to renderBadgeTab.
 *
 * @param props - props from this instance of BadgeTab
 * @param ref - reference to root HTMLElement of BadgeTab
 */
export const useBadgeTab = (props: BadgeTabProps, ref: React.Ref<HTMLElement>): BadgeTabState => {
  const { badge, children } = props;

  const tabState = useTab(props, ref);

  // The design calls for the default badge size to change based on the tab list size and layout
  // and the presence of an icon.
  const defaultBadgeSize: BadgeProps['size'] =
    tabState.size === 'small' && tabState.icon && tabState.verticalContent ? 'extra-small' : 'small';

  return {
    ...tabState,
    components: {
      ...tabState.components,
      badge: Badge,
      children: 'div',
    } as BadgeTabState['components'],
    badge: resolveShorthand(badge, { required: true, defaultProps: { size: defaultBadgeSize } }),
    children: resolveShorthand(children as BadgeTabSlots['children'], {
      required: true,
    }),
  };
};
