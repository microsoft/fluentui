import * as React from 'react';

import type { IButtonProps } from '@fluentui/react';

import { Button } from '@fluentui/react-components';
import type { RefAttributes } from '@fluentui/react-utilities';

import { shimButtonProps } from './shimButtonProps';

/**
 * Shims a v8 ActionButton to render a v9 Button
 */
export const ActionButtonShim: React.ForwardRefExoticComponent<
  IButtonProps &
    // eslint-disable-next-line @typescript-eslint/no-restricted-types -- this is expected in order to be compatible with v8, as every v8 interface contains `React.RefAttributes` to accept ref as string
    React.RefAttributes<HTMLButtonElement>
> = React.forwardRef((props, _ref) => {
  const variantProps = {
    ...props,
    variantClassName: 'ms-Button--action ms-Button--command',
  };

  const shimProps = shimButtonProps(variantProps);

  return <Button {...(props as RefAttributes<HTMLButtonElement>)} {...shimProps} appearance="transparent" />;
});
