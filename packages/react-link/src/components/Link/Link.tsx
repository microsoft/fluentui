import * as React from 'react';
import { useLink } from './useLink';
import { LinkProps } from './Link.types';
import { useInlineTokens } from '@fluentui/react-theme-provider/lib/compat/index';
import { useLinkStyles } from './useLinkStyles';
import { renderLink } from './renderLink';

/**
 * Defines a styled Link, using the `useLink` hook.
 * {@docCategory Link }
 */
export const Link = React.forwardRef<HTMLElement, LinkProps>((props, ref) => {
  const state = useLink(props, ref);

  useLinkStyles(state);
  useInlineTokens(state, '--link');

  return renderLink(state);
});

Link.displayName = 'Link';
