import * as React from 'react';

import type { IButtonProps } from '@fluentui/react';
import type { RefAttributes } from '@fluentui/react-utilities';

import { ButtonShim } from './ButtonShim';

/**
 * Shims a v8 DefaultButton to render a v9 Button
 */
export const DefaultButtonShim = React.forwardRef((props, _ref) => {
  return <ButtonShim {...props} variantClassName={props.primary ? 'ms-Button--primary' : 'ms-Button--default'} />;
}) as React.ForwardRefExoticComponent<IButtonProps & RefAttributes<HTMLButtonElement>>;
