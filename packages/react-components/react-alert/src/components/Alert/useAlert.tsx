import * as React from 'react';

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
  const { intent } = props;

  /** Determine the icon to render based on the intent */
  let defaultIcon;
  switch (intent) {
    case 'success':
      defaultIcon = <CheckmarkCircleFilled />;
      break;
    case 'error':
      defaultIcon = <DismissCircleFilled />;
      break;
    case 'warning':
      defaultIcon = <WarningFilled />;
      break;
    case 'info':
      defaultIcon = <InfoFilled />;
      break;
  }

  const icon = resolveShorthand(props.icon, {
    defaultProps: {
      children: defaultIcon,
    },
    required: !!props.intent,
  });

  return {
    components: {
      root: 'div',
      icon: 'span',
      action: Button,
    },
    root: getNativeElementProps('div', {
      ref,
      children: props.children,
      ...props,
    }),
    icon,
    action: resolveShorthand(props.action),
    intent,
  };
};
