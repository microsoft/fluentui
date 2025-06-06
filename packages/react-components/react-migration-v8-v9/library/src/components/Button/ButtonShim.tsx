import * as React from 'react';

import type { IBaseButtonProps } from '@fluentui/react';

import { Button } from '@fluentui/react-components';
import type { RefAttributes } from '@fluentui/react-utilities';

import { shimButtonProps } from './shimButtonProps';
import { ToggleButtonShim } from './ToggleButtonShim';
import { CompoundButtonShim } from './CompoundButtonShim';

export const ButtonShim: React.ForwardRefExoticComponent<
  IBaseButtonProps &
    // eslint-disable-next-line @typescript-eslint/no-restricted-types -- this is expected in order to be compatible with v8, as every v8 interface contains `React.RefAttributes` to accept ref as string
    React.RefAttributes<HTMLButtonElement>
> = React.forwardRef((props, _ref) => {
  const shimProps = shimButtonProps(props);

  if (props.toggle) {
    return <ToggleButtonShim {...props}>{props.children}</ToggleButtonShim>;
  }
  if (props.secondaryText || props.onRenderDescription?.(props)) {
    return <CompoundButtonShim {...props} />;
  }

  return <Button {...(props as RefAttributes<HTMLButtonElement>)} {...shimProps} />;
});
