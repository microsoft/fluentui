import * as React from 'react';

import type { IButtonProps } from '@fluentui/react';

import { Button } from '@fluentui/react-components';

import { shimButtonProps } from './shimButtonProps';

/**
 * Shims a v8 ActionButton to render a v9 Button
 */
export const ActionButtonShim: React.ForwardRefExoticComponent<IButtonProps & React.RefAttributes<HTMLButtonElement>> =
  React.forwardRef((props, _ref) => {
    const variantProps = {
      ...props,
      variantClassName: 'ms-Button--action ms-Button--command',
    };

    const shimProps = shimButtonProps(variantProps);

    return <Button {...(props as React.RefAttributes<HTMLButtonElement>)} {...shimProps} appearance="transparent" />;
  });
