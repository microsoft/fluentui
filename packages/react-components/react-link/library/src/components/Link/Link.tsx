import * as React from 'react';
import { useLink_unstable } from './useLink';
import { useLinkStyles_unstable } from './useLinkStyles.styles';
import { renderLink_unstable } from './renderLink';
import type { LinkProps } from './Link.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * A Link is a reference to data that a user can follow by clicking or tapping it.
 */
export const Link: ForwardRefComponent<LinkProps> = React.forwardRef((props, ref) => {
  const state = useLink_unstable(props, ref);

  useLinkStyles_unstable(state);

  return renderLink_unstable(state);
  // Work around some small mismatches in inferred types which don't matter in practice
}) as ForwardRefComponent<LinkProps>;

Link.displayName = 'Link';
