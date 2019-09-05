/** @jsx withSlots */
import { KeytipData } from 'office-ui-fabric-react';
import { withSlots } from '../../../Foundation';
import { getNativeProps, anchorProperties, buttonProperties } from '../../../Utilities';

import { IActionableComponent, IActionableViewProps } from './Actionable.types';

export const ActionableSlots: IActionableComponent['slots'] = props => ({
  root: !!props.href ? 'a' : 'button'
});

export const ActionableView: IActionableComponent['view'] = (props, slots) => {
  const { children, disabled, onClick, allowDisabledFocus, ariaLabel, keytipProps, buttonRef, ...rest } = props;

  const { htmlType, propertiesType } = _deriveRootType(props);

  // TODO: 'href' is anchor property... consider getNativeProps by root type
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

interface IActionableRootType {
  htmlType: 'link' | 'button';
  propertiesType: string[];
}

function _deriveRootType(props: IActionableViewProps): IActionableRootType {
  return !!props.href ? { htmlType: 'link', propertiesType: anchorProperties } : { htmlType: 'button', propertiesType: buttonProperties };
}
