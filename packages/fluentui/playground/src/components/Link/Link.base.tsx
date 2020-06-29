import * as React from 'react';
import { ForwardRefComponent } from '@fluentui/react-theming';
import { ILinkProps, ILinkSlots } from './Link.types';
import { useLink } from './useLink';

export const LinkBase: ForwardRefComponent<ILinkProps, HTMLElement> = React.forwardRef(
  (props: ILinkProps, componentRef: React.Ref<HTMLElement>) => {
    const { children, slots } = props;
    const { root: Root = 'a' } = slots || ({} as ILinkSlots);

    const { slotProps = {} } = useLink({ ...props, componentRef });

    return <Root {...slotProps.root}>{children}</Root>;
  },
);
