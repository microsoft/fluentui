import * as React from 'react';

import type { IBaseButtonProps } from '@fluentui/react';

import { Button } from '@fluentui/react-components';
import type { RefAttributes } from '@fluentui/react-utilities';

import { shimButtonProps } from './shimButtonProps';
import { ToggleButtonShim } from './ToggleButtonShim';
import { CompoundButtonShim } from './CompoundButtonShim';

export const ButtonShim: React.ForwardRefExoticComponent<IBaseButtonProps & RefAttributes<HTMLButtonElement>> =
  React.forwardRef((props, _ref) => {
    const shimProps = shimButtonProps(props);

    if (props.toggle) {
      return <ToggleButtonShim {...props}>{props.children}</ToggleButtonShim>;
    }
    if (props.secondaryText || props.onRenderDescription?.(props)) {
      return <CompoundButtonShim {...props} />;
    }

    return <Button {...(props as RefAttributes<HTMLButtonElement>)} {...shimProps} />;
  }) as React.ForwardRefExoticComponent<IBaseButtonProps & RefAttributes<HTMLButtonElement>>;
