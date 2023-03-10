import * as React from 'react';

import { Avatar } from '@fluentui/react-avatar';
import { Button } from '@fluentui/react-button';
import { CheckmarkCircleFilled, DismissCircleFilled, InfoFilled, WarningFilled } from '@fluentui/react-icons';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';

import type { AlertProps, AlertState } from './Alert.types';

/**
 * Create the state required to render Alert.
 *
 * The returned state can be modified with hooks such as useAlertStyles_unstable,
 * before being passed to renderAlert_unstable.
 *
 * @param props - props from this instance of Alert
 * @param ref - reference to root HTMLElement of Alert
 */
export const useAlert_unstable = (props: AlertProps, ref: React.Ref<HTMLElement>): AlertState => {
  const { appearance = 'primary', intent } = props;

  /** Determine the role and icon to render based on the intent */
  let defaultIcon;
  let defaultRole = 'status';
  switch (intent) {
    case 'success':
      defaultIcon = <CheckmarkCircleFilled />;
      break;
    case 'error':
      defaultIcon = <DismissCircleFilled />;
      defaultRole = 'alert';
      break;
    case 'warning':
      defaultIcon = <WarningFilled />;
      defaultRole = 'alert';
      break;
    case 'info':
      defaultIcon = <InfoFilled />;
      break;
  }

  const action = resolveShorthand(props.action, { defaultProps: { appearance: 'transparent' } });
  const avatar = resolveShorthand(props.avatar);
  let icon;
  /** Avatar prop takes precedence over the icon or intent prop */
  if (!avatar) {
    icon = resolveShorthand(props.icon, {
      defaultProps: {
        children: defaultIcon,
      },
      required: !!props.intent,
    });
  }

  return {
    action,
    appearance,
    avatar,
    components: {
      root: 'div',
      icon: 'span',
      action: Button,
      avatar: Avatar,
    },
    icon,
    intent,
    root: getNativeElementProps('div', {
      ref,
      role: defaultRole,
      children: props.children,
      ...props,
    }),
  };
};
