import * as React from 'react';
import { useBadgeTab } from './useBadgeTab';
import { renderBadgeTab } from './renderBadgeTab';
import { useBadgeTabStyles } from './useBadgeTabStyles';
import type { BadgeTabProps } from './BadgeTab.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * BadgeTab component
 */
export const BadgeTab: ForwardRefComponent<BadgeTabProps> = React.forwardRef((props, ref) => {
  const state = useBadgeTab(props, ref);

  useBadgeTabStyles(state);
  return renderBadgeTab(state);
});

BadgeTab.displayName = 'BadgeTab';
