import * as React from 'react';
import { useLink } from './useLink';
import type { ILinkProps } from './Link.types';

export const LinkBase: React.FunctionComponent<ILinkProps> = React.forwardRef<HTMLElement, ILinkProps>((props, ref) => {
  const { slots, slotProps } = useLink(props, ref);

  return <slots.root {...slotProps.root} />;
});

LinkBase.displayName = 'LinkBase';
