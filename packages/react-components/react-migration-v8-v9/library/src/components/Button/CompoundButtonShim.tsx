import * as React from 'react';

import type { IButtonProps } from '@fluentui/react';

import { CompoundButton } from '@fluentui/react-components';
import type { CompoundButtonProps } from '@fluentui/react-components';

import { shimButtonProps } from './shimButtonProps';

/**
 * Shims v8 CompoundButton to render a v9 CompoundButton
 */
export const CompoundButtonShim: React.ForwardRefExoticComponent<
  IButtonProps & React.RefAttributes<HTMLButtonElement>
> = React.forwardRef((props, _ref) => {
  const variantProps = {
    ...props,
    variantClassName: props.primary ? 'ms-Button--compoundPrimary' : 'ms-Button--compound',
  };

  const shimProps: CompoundButtonProps = {
    ...shimButtonProps(variantProps),
    secondaryContent: props.secondaryText || props.onRenderDescription?.(props),
  };

  return <CompoundButton {...(props as React.RefAttributes<HTMLButtonElement>)} {...shimProps} />;
});
