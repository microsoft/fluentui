import * as React from 'react';

import type { IButtonProps } from '@fluentui/react';
import { ButtonShim } from './ButtonShim';

/**
 * Shims v8 PrimaryButton to render a v9 Button
 */
export const PrimaryButtonShim: React.ForwardRefExoticComponent<IButtonProps & React.RefAttributes<HTMLButtonElement>> =
  React.forwardRef((props, _ref) => {
    return <ButtonShim {...props} primary variantClassName="ms-Button--primary" />;
  });
