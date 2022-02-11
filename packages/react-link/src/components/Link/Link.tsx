import * as React from 'react';
import { useLink_unstable } from './useLink';
import type { LinkProps } from './Link.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * A Link is a reference to data that a user can follow by clicking or tapping it.
 */
export const Link: ForwardRefComponent<LinkProps> = React.forwardRef((props, ref) => {
  const [state, render] = useLink_unstable(props, ref);
  return render(state);
  // Work around some small mismatches in inferred types which don't matter in practice
}) as ForwardRefComponent<LinkProps>;

Link.displayName = 'Link';
