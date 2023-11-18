import * as React from 'react';

import type { IButtonProps } from '@fluentui/react';

import { ButtonShim } from './ButtonShim';

/**
 * Shims a v8 DefaultButton to render a v9 Button
 */
export const DefaultButtonShim: React.ForwardRefExoticComponent<IButtonProps & React.RefAttributes<HTMLButtonElement>> =
  React.forwardRef((props, _ref) => {
    return <ButtonShim {...props} variantClassName={props.primary ? 'ms-Button--primary' : 'ms-Button--default'} />;
  });
