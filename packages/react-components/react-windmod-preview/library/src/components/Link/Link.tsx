'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderLink, useLink, useLinkContext } from '@fluentui/react-headless-components-preview/link';

import { mergeContextProps } from '../../utils/mergeContextProps';
import type { LinkProps } from './Link.types';
import { useLinkStyles } from './useLinkStyles';

/**
 * A Link navigates to another surface. Windmod Link: the headless link decorated with the
 * Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const Link: ForwardRefComponent<LinkProps> = React.forwardRef((props, ref) => {
  // Look props belong to windmod — the headless hook neither accepts nor resolves them.
  // Defaults mirror @fluentui/react-link's styled useLink, LinkContext read included: a
  // MessageBarBody publishes `inline: true`, and Griffel resolves it as
  // `inline: inlineProp ?? !!inlineContext` (react-link useLink.ts:20, 28). The `!!` is a no-op
  // here — the only non-boolean the published shape can hold is `undefined`, which
  // `mergeContextProps` skips, leaving the destructuring default to supply `false`.
  // `as`, `href`, `disabled` and `disabledFocusable` are deliberately absent: the headless hook
  // owns them.
  const { appearance = 'default', inline = false, ...rest } = mergeContextProps(useLinkContext(), props);

  return renderLink(
    useLinkStyles({
      ...useLink(rest, ref),
      appearance,
      inline,
    }),
  );
  // Casting is required due to lack of distributive union to support union on @types/react
}) as ForwardRefComponent<LinkProps>;

Link.displayName = 'Link';
