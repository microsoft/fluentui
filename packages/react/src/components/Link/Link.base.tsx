import * as React from 'react';
import { ILinkProps } from './Link.types';
import { useLink } from './useLink';

export const LinkBase: React.FunctionComponent<ILinkProps> = React.forwardRef<HTMLElement, ILinkProps>((props, ref) => {
  const { slots, slotProps } = useLink(props, ref);

  return <slots.root {...slotProps.root} />;
});

LinkBase.displayName = 'LinkBase';
