import * as React from 'react';
import { useBadge } from './useBadge';
import { BadgeProps } from './Badge.types';
import { renderBadge } from './renderBadge';
import { useBadgeStyles } from './useBadgeStyles';

export const Badge: React.FunctionComponent<BadgeProps & React.RefAttributes<HTMLElement>> = React.forwardRef(
  (props: BadgeProps, ref: React.Ref<HTMLElement>) => {
    const state = useBadge(props, ref);
    useBadgeStyles(state);

    return renderBadge(state);
  },
);

Badge.displayName = 'Badge';
