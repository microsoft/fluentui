import * as React from 'react';

import type { IButtonProps } from '@fluentui/react';
import { ButtonShim } from './ButtonShim';

/**
 * Shims v8 PrimaryButton to render a v9 Button
 */
export const PrimaryButtonShim: React.ForwardRefExoticComponent<
  IButtonProps &
    // eslint-disable-next-line @typescript-eslint/no-restricted-types -- this is expected in order to be compatible with v8, as every v8 interface contains `React.RefAttributes` to accept ref as string
    React.RefAttributes<HTMLButtonElement>
> = React.forwardRef((props, _ref) => {
  return <ButtonShim {...props} primary variantClassName="ms-Button--primary" />;
});
