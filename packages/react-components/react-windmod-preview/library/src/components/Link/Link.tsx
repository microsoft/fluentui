'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderLink, useLink } from '@fluentui/react-headless-components-preview/link';

import type { LinkProps, LinkState } from './Link.types';
import { useLinkStyles } from './useLinkStyles';

/**
 * A Link navigates to another surface. Windmod Link: the headless link decorated with the
 * Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const Link: ForwardRefComponent<LinkProps> = React.forwardRef((props, ref) => {
  // Look props belong to windmod — the headless hook neither accepts nor resolves them.
  // Defaults mirror @fluentui/react-link's styled useLink. `as`, `href`, `disabled` and
  // `disabledFocusable` are deliberately absent: the headless hook owns them.
  const { appearance = 'default', inline = false, ...rest } = props;

  const state: LinkState = {
    ...useLink(rest, ref),
    appearance,
    inline,
  };

  return renderLink(useLinkStyles(state));
  // Casting is required due to lack of distributive union to support union on @types/react
}) as ForwardRefComponent<LinkProps>;

Link.displayName = 'Link';
