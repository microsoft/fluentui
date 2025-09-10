import * as React from 'react';

import type { IButtonProps } from '@fluentui/react';

import { ButtonShim } from './ButtonShim';

/**
 * Shims a v8 DefaultButton to render a v9 Button
 */
export const DefaultButtonShim: React.ForwardRefExoticComponent<
  IButtonProps &
    // eslint-disable-next-line @typescript-eslint/no-restricted-types -- this is expected in order to be compatible with v8, as every v8 interface contains `React.RefAttributes` to accept ref as string
    React.RefAttributes<HTMLButtonElement>
> = React.forwardRef((props, _ref) => {
  return <ButtonShim {...props} variantClassName={props.primary ? 'ms-Button--primary' : 'ms-Button--default'} />;
});
