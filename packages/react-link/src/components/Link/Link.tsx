import * as React from 'react';
import { useLink } from './useLink';
import { useLinkStyles } from './useLinkStyles';
import { renderLink } from './renderLink';
import type { LinkProps } from './Link.types';

/**
 * A Link is a reference to data that a user can follow by clicking or tapping it.
 */
export const Link: React.FunctionComponent<LinkProps & React.RefAttributes<HTMLElement>> = React.forwardRef<
  HTMLElement,
  LinkProps
>((props, ref) => {
  const state = useLink(props, ref);

  useLinkStyles(state);

  return renderLink(state);
});

Link.displayName = 'Link';
