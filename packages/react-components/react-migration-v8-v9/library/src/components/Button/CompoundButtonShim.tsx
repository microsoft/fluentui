import * as React from 'react';

import type { IButtonProps } from '@fluentui/react';

import { CompoundButton } from '@fluentui/react-components';
import type { CompoundButtonProps } from '@fluentui/react-components';
import type { RefAttributes } from '@fluentui/react-utilities';

import { shimButtonProps } from './shimButtonProps';

/**
 * Shims v8 CompoundButton to render a v9 CompoundButton
 */
export const CompoundButtonShim: React.ForwardRefExoticComponent<
  IButtonProps &
    // eslint-disable-next-line @typescript-eslint/no-restricted-types -- this is expected in order to be compatible with v8, as every v8 interface contains `React.RefAttributes` to accept ref as string
    React.RefAttributes<HTMLButtonElement>
> = React.forwardRef((props, _ref) => {
  const variantProps = {
    ...props,
    variantClassName: props.primary ? 'ms-Button--compoundPrimary' : 'ms-Button--compound',
  };

  const shimProps: CompoundButtonProps = {
    ...shimButtonProps(variantProps),
    secondaryContent: props.secondaryText || props.onRenderDescription?.(props),
  };

  return <CompoundButton {...(props as RefAttributes<HTMLButtonElement>)} {...shimProps} />;
});
