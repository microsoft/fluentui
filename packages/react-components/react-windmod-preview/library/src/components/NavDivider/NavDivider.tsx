'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderNavDivider, useNavDivider } from '@fluentui/react-headless-components-preview/nav';

import type { NavDividerProps } from './NavDivider.types';
import { useNavDividerStyles } from './useNavDividerStyles';

/**
 * A NavDivider separates groups of nav items. Windmod NavDivider: the headless nav divider
 * decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const NavDivider: ForwardRefComponent<NavDividerProps> = React.forwardRef((props, ref) => {
  // The nav fixes all three Divider look props; none reaches the consumer surface.
  const state = useNavDivider(props, ref as React.Ref<HTMLDivElement>);
  const styled = useNavDividerStyles({
    ...state,
    alignContent: 'center',
    appearance: 'strong',
    inset: false,
  });

  return renderNavDivider(styled);
});

NavDivider.displayName = 'NavDivider';
