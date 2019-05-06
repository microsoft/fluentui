/** @jsx withSlots */
import { Stack, Text } from 'office-ui-fabric-react';
import { withSlots, getSlots } from '../../Foundation';
import { getNativeProps, buttonProperties } from '../../Utilities';
import { Icon } from '../../utilities/factoryComponents';

import { IButtonComponent, IButtonProps, IButtonRootElements, IButtonSlots, IButtonViewProps } from './Button.types';

export const ButtonView: IButtonComponent['view'] = props => {
  const { icon, content, children, disabled, onClick, allowDisabledFocus, ariaLabel, buttonRef, ...rest } = props;

  // TODO: 'href' is anchor property... consider getNativeProps by root type
  const buttonProps = { ...getNativeProps(rest, buttonProperties) };

  const Slots = getSlots<IButtonProps, IButtonSlots>(props, {
    root: _deriveRootType(props),
    stack: Stack,
    icon: Icon,
    content: Text
  });

  const _onClick = (ev: React.MouseEvent<HTMLElement>) => {
    if (!disabled && onClick) {
      onClick(ev);

      if (ev.defaultPrevented) {
        return;
      }
    }
  };

  return (
    <Slots.root
      type="button" // stack doesn't take in native button props
      role="button"
      onClick={_onClick}
      {...buttonProps}
      disabled={disabled && !allowDisabledFocus}
      aria-disabled={disabled}
      tabIndex={!disabled || allowDisabledFocus ? 0 : undefined}
      aria-label={ariaLabel}
      ref={buttonRef}
    >
      <Slots.stack horizontal as="span" tokens={{ childrenGap: 8 }} verticalAlign="center" horizontalAlign="center" verticalFill>
        <Slots.icon />
        <Slots.content />
        {children}
      </Slots.stack>
    </Slots.root>
  );
};

function _deriveRootType(props: IButtonViewProps): IButtonRootElements {
  return !!props.href ? 'a' : 'button';
}
