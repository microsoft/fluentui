import * as React from 'react';

import { IBaseButtonProps, IButtonProps, Icon } from '@fluentui/react';

import {
  Button,
  ButtonProps,
  CompoundButton,
  CompoundButtonProps,
  Menu,
  MenuButton,
  MenuButtonProps,
  MenuList,
  MenuPopover,
  MenuTrigger,
  ToggleButton,
  ToggleButtonProps,
} from '@fluentui/react-components';
import { MenuItemShim, shimMenuProps } from './MenuShim';

const shimButtonProps = (props: IBaseButtonProps & React.RefAttributes<HTMLButtonElement>): ButtonProps => {
  //TODO: Icon shim. This still renders the v8 icon.
  const icon = props.onRenderIcon ? (
    props.onRenderIcon(props)
  ) : props.iconProps ? (
    <Icon {...props.iconProps} />
  ) : undefined;

  const variantClassName = props.variantClassName ?? props.primary ? 'ms-Button--primary' : 'ms-Button--default';
  const className = [props.baseClassName, variantClassName, props.className].filter(Boolean).join(' ');

  return {
    // spread incoming props to propagate HTML properties not part of IBaseButtonProps
    ...props,
    appearance: props.primary ? 'primary' : undefined,
    className: className,
    disabled: props.disabled,
    disabledFocusable: props.allowDisabledFocus,
    'aria-hidden': props.ariaHidden,
    'aria-label': props.ariaLabel,
    icon,
    key: props.key || props.uniqueId,
    children: props.onRenderChildren
      ? props.onRenderChildren(props)
      : props.onRenderText
      ? props.onRenderText(props)
      : props.text || props.children,
  } as ButtonProps;
};

export const ButtonShim: React.ForwardRefExoticComponent<
  IBaseButtonProps & React.RefAttributes<HTMLButtonElement>
> = React.forwardRef((props, _ref) => {
  const shimProps = shimButtonProps(props);

  if (props.toggle) {
    return <ToggleButtonShim {...props}>{props.children}</ToggleButtonShim>;
  }
  if (props.secondaryText || props.onRenderDescription?.(props)) {
    return <CompoundButtonShim {...props} />;
  }

  return <Button {...(props as React.RefAttributes<HTMLButtonElement>)} {...shimProps} />;
});

/**
 * Shims a v8 DefaultButton to render a v9 Button
 */
export const DefaultButtonShim: React.ForwardRefExoticComponent<
  IButtonProps & React.RefAttributes<HTMLButtonElement>
> = React.forwardRef((props, _ref) => {
  return <ButtonShim {...props} variantClassName={props.primary ? 'ms-Button--primary' : 'ms-Button--default'} />;
});

/**
 * Shims a v8 ActionButton to render a v9 Button
 */
export const ActionButtonShim: React.ForwardRefExoticComponent<
  IButtonProps & React.RefAttributes<HTMLButtonElement>
> = React.forwardRef((props, _ref) => {
  const variantProps = {
    ...props,
    variantClassName: 'ms-Button--action ms-Button--command',
  };

  const shimProps = shimButtonProps(variantProps);

  return <Button {...(props as React.RefAttributes<HTMLButtonElement>)} {...shimProps} appearance="transparent" />;
});

/**
 * Shims v8 CommandButtonShim to render a v9 Button
 */
export const CommandButtonShim = ActionButtonShim;

/**
 * Shims v8 CompoundButton to render a v9 CompoundButton
 */
export const CompoundButtonShim: React.ForwardRefExoticComponent<
  IButtonProps & React.RefAttributes<HTMLButtonElement>
> = React.forwardRef((props, _ref) => {
  const variantProps = {
    ...props,
    variantClassName: props.primary ? 'ms-Button--compoundPrimary' : 'ms-Button--compound',
  };

  const shimProps: CompoundButtonProps = {
    ...shimButtonProps(variantProps),
    secondaryContent: props.secondaryText || props.onRenderDescription?.(props),
  };

  return <CompoundButton {...(props as React.RefAttributes<HTMLButtonElement>)} {...shimProps} />;
});

export const MenuButtonShim: React.ForwardRefExoticComponent<
  IButtonProps & React.RefAttributes<HTMLButtonElement>
> = React.forwardRef((props, _ref) => {
  const variantProps = {
    ...props,
    variantClassName: props.primary ? 'ms-Button--primary' : 'ms-Button--default',
  };

  const shimProps: MenuButtonProps = {
    ...shimButtonProps(variantProps),
  };

  const shimmedMenuProps = props.menuProps ? shimMenuProps(props.menuProps) : {};

  return (
    <Menu {...shimmedMenuProps}>
      <MenuTrigger>
        <MenuButton {...shimProps} />
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          {props.menuProps?.items.map(item => (
            // key is added through item spread
            // eslint-disable-next-line react/jsx-key
            <MenuItemShim {...item} />
          ))}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
});

/**
 * Shims v8 PrimaryButton to render a v9 Button
 */
export const PrimaryButtonShim: React.ForwardRefExoticComponent<
  IButtonProps & React.RefAttributes<HTMLButtonElement>
> = React.forwardRef((props, _ref) => {
  return <ButtonShim {...props} primary variantClassName="ms-Button--primary" />;
});

/**
 * Shims v8 ToggleButton to render a v9 ToggleButton
 */
export const ToggleButtonShim: React.ForwardRefExoticComponent<
  IButtonProps & React.RefAttributes<HTMLButtonElement>
> = React.forwardRef((props, _ref) => {
  const variantProps = {
    ...props,
    variantClassName: props.primary ? 'ms-Button--compoundPrimary' : 'ms-Button--compound',
  };

  const shimProps: ToggleButtonProps = {
    ...shimButtonProps(variantProps),
    checked: props.checked,
    defaultChecked: props.defaultChecked,
  };

  return <ToggleButton {...(props as React.RefAttributes<HTMLButtonElement>)} {...shimProps} />;
});
