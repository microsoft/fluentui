/** @jsx withSlots */
import { KeytipData } from 'office-ui-fabric-react';
import { withSlots, getSlots } from '../../../Foundation';
import { getNativeProps, anchorProperties, buttonProperties } from '../../../Utilities';

import { IActionableProps, IActionableRootElements, IActionableSlots, IActionableViewProps } from './Actionable.types';
import { IButtonComponent } from '../Button.types';

export const ActionableView: IButtonComponent['view'] = props => {
  const { children, disabled, onClick, allowDisabledFocus, ariaLabel, keytipProps, buttonRef, ...rest } = props;

  const { slotType, htmlType, propertiesType } = _deriveRootType(props);

  // TODO: 'href' is anchor property... consider getNativeProps by root type
  const buttonProps = { ...getNativeProps(rest, propertiesType) };

  const Slots = getSlots<IActionableProps, IActionableSlots>(props, {
    root: slotType
  });

  const _onClick = (ev: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement>) => {
    if (!disabled && onClick) {
      onClick(ev);

      if (ev.defaultPrevented) {
        return;
      }
    }
  };

  const Button = (keytipAttributes?: any): JSX.Element => (
    <Slots.root
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
    </Slots.root>
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
  slotType: IActionableRootElements;
  htmlType: 'link' | 'button';
  propertiesType: string[];
}

function _deriveRootType(props: IActionableViewProps): IActionableRootType {
  return !!props.href
    ? { slotType: 'a', htmlType: 'link', propertiesType: anchorProperties }
    : { slotType: 'button', htmlType: 'button', propertiesType: buttonProperties };
}
