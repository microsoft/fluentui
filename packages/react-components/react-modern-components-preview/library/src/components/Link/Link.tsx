'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useLink } from './useLink';
import { renderLink } from './renderLink';
import { useLinkStyles } from './useLinkStyles.styles';
import type { LinkProps } from './Link.types';

/**
 * A link connects users to another location or triggers an action.
 */
export const Link: ForwardRefComponent<LinkProps> = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement | HTMLSpanElement,
  LinkProps
>((props, ref) => {
  const state = useLink(props, ref);

  useLinkStyles(state);

  return renderLink(state);
});

Link.displayName = 'Link';
