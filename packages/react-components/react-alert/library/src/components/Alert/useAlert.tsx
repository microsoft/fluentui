import * as React from 'react';

import { Avatar } from '@fluentui/react-avatar';
import { Button } from '@fluentui/react-button';
import { CheckmarkCircleFilled, DismissCircleFilled, InfoFilled, WarningFilled } from '@fluentui/react-icons';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';

import type { AlertProps, AlertState } from './Alert.types';

/**
 * @deprecated please use the Toast or MessageBar component
 * Create the state required to render Alert.
 *
 * The returned state can be modified with hooks such as useAlertStyles_unstable,
 * before being passed to renderAlert_unstable.
 *
 * @param props - props from this instance of Alert
 * @param ref - reference to root HTMLElement of Alert
 */
// eslint-disable-next-line deprecation/deprecation
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

  const action = slot.optional(props.action, { defaultProps: { appearance: 'transparent' }, elementType: Button });
  const avatar = slot.optional(props.avatar, { elementType: Avatar });
  let icon;
  /** Avatar prop takes precedence over the icon or intent prop */ if (!avatar) {
    icon = slot.optional(props.icon, {
      defaultProps: { children: defaultIcon },
      renderByDefault: !!props.intent,
      elementType: 'span',
    });
  }
  return {
    action,
    appearance,
    avatar,
    components: { root: 'div', icon: 'span', action: Button, avatar: Avatar },
    icon,
    intent,
    root: slot.always(
      getIntrinsicElementProps('div', {
        // FIXME:
        // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
        // but since it would be a breaking change to fix it, we are casting ref to it's proper type
        ref: ref as React.Ref<HTMLDivElement>,
        role: defaultRole,
        children: props.children,
        ...props,
      }),
      { elementType: 'div' },
    ),
  };
};
