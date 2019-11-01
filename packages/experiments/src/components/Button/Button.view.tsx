/** @jsx withSlots */
import { Text, KeytipData } from 'office-ui-fabric-react';
import { withSlots } from '../../Foundation';
import { getNativeProps, anchorProperties, buttonProperties } from '../../Utilities';
import { FontIcon } from '../../utilities/factoryComponents';

import { IButtonComponent, IButtonViewProps } from './Button.types';

export const ButtonSlots: IButtonComponent['slots'] = props => ({
  root: !!props.href ? 'a' : 'button',
  icon: FontIcon,
  content: Text
});

export const ButtonView: IButtonComponent['view'] = (props, slots) => {
  const { icon, content, children, disabled, onClick, allowDisabledFocus, ariaLabel, keytipProps, buttonRef, ...rest } = props;

  const { htmlType, propertiesType } = _deriveRootType(props);

  const buttonProps = { ...getNativeProps(rest, propertiesType) };

  const _onClick = (ev: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement>) => {
    if (!disabled && onClick) {
      onClick(ev);

      if (ev.defaultPrevented) {
        return;
      }
    }
  };

  const Button = (keytipAttributes?: any): JSX.Element => (
    <slots.root
      type={htmlType}
      role="button"
      onClick={_onClick}
      {...buttonProps}
      {...keytipAttributes}
      disabled={disabled && !allowDisabledFocus}
      aria-disabled={disabled}
      tabIndex={!disabled || allowDisabledFocus ? 0 : undefined}
      aria-label={ariaLabel}
      ref={buttonRef}
    >
      {icon && <slots.icon />}
      {content && <slots.content />}
      {children}
    </slots.root>
  );

  return keytipProps ? (
    <KeytipData keytipProps={keytipProps} disabled={disabled && !allowDisabledFocus}>
      {(keytipAttributes: any): JSX.Element => Button(keytipAttributes)}
    </KeytipData>
  ) : (
    Button()
  );
};

interface IButtonRootType {
  htmlType: 'link' | 'button';
  propertiesType: string[];
}

function _deriveRootType(props: IButtonViewProps): IButtonRootType {
  return !!props.href ? { htmlType: 'link', propertiesType: anchorProperties } : { htmlType: 'button', propertiesType: buttonProperties };
}
