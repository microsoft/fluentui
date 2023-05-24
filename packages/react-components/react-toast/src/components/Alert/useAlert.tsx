import * as React from 'react';

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

  /** Determine the role and media to render based on the intent */
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

  return {
    action: resolveShorthand(props.action),
    appearance,
    components: {
      root: 'div',
      media: 'div',
      action: 'div',
    },
    media: resolveShorthand(props.media, { required: !!props.intent, defaultProps: { children: defaultIcon } }),
    intent,
    root: getNativeElementProps('div', {
      ref,
      role: defaultRole,
      children: props.children,
      ...props,
    }),
  };
};
