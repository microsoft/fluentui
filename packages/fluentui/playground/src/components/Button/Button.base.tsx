import React from 'react';
import { ForwardRefComponent } from '@fluentui/react-theming';
import { IButtonProps, IButtonSlots } from './Button.types';
import { useButton } from './useButton';

export const ButtonBase: ForwardRefComponent<IButtonProps, HTMLElement> = React.forwardRef(
  (props: IButtonProps, componentRef: React.Ref<HTMLElement>) => {
    const { children, href, slots } = props;
    const { root: Root = href ? 'a' : 'button', startIcon: StartIcon = 'span', endIcon: EndIcon = 'span' } =
      slots || ({} as IButtonSlots);

    const { slotProps = {} } = useButton({ ...props, componentRef });

    return (
      <Root {...slotProps.root}>
        <StartIcon {...slotProps.startIcon} />
        {children}
        <EndIcon {...slotProps.endIcon} />
      </Root>
    );
  },
);
