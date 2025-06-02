import * as React from 'react';

import type { IButtonProps } from '@fluentui/react';
import type { RefAttributes } from '@fluentui/react-utilities';
import { ButtonShim } from './ButtonShim';

/**
 * Shims v8 PrimaryButton to render a v9 Button
 */
export const PrimaryButtonShim = React.forwardRef((props, _ref) => {
  return <ButtonShim {...props} primary variantClassName="ms-Button--primary" />;
}) as React.ForwardRefExoticComponent<IButtonProps & RefAttributes<HTMLButtonElement>>;
