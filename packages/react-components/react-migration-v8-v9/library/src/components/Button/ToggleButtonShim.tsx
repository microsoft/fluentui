import * as React from 'react';

import type { IButtonProps } from '@fluentui/react';

import { ToggleButton } from '@fluentui/react-components';
import type { ToggleButtonProps } from '@fluentui/react-components';

import { shimButtonProps } from './shimButtonProps';

/**
 * Shims v8 ToggleButton to render a v9 ToggleButton
 */
export const ToggleButtonShim: React.ForwardRefExoticComponent<IButtonProps & React.RefAttributes<HTMLButtonElement>> =
  React.forwardRef((props, _ref) => {
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
