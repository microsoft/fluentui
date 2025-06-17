import * as React from 'react';

import type { IButtonProps } from '@fluentui/react';

import { ToggleButton } from '@fluentui/react-components';
import type { ToggleButtonProps } from '@fluentui/react-components';
import type { RefAttributes } from '@fluentui/react-utilities';

import { shimButtonProps } from './shimButtonProps';

/**
 * Shims v8 ToggleButton to render a v9 ToggleButton
 */
export const ToggleButtonShim: React.ForwardRefExoticComponent<
  IButtonProps &
    // eslint-disable-next-line @typescript-eslint/no-restricted-types -- this is expected in order to be compatible with v8, as every v8 interface contains `React.RefAttributes` to accept ref as string
    React.RefAttributes<HTMLButtonElement>
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

  return <ToggleButton {...(props as RefAttributes<HTMLButtonElement>)} {...shimProps} />;
});
