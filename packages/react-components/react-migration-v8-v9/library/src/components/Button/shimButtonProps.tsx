import * as React from 'react';

import { Icon } from '@fluentui/react';
import type { IBaseButtonProps } from '@fluentui/react';

import type { ButtonProps } from '@fluentui/react-components';

export const shimButtonProps = (
  props: IBaseButtonProps &
    // eslint-disable-next-line @typescript-eslint/no-restricted-types -- this is expected in order to be compatible with v8, as every v8 interface contains `React.RefAttributes` to accept ref as string
    React.RefAttributes<HTMLButtonElement>,
): ButtonProps => {
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
    className,
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
