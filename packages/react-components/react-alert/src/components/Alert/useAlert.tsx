import * as React from 'react';

import { Button } from '@fluentui/react-button';
import {
  CheckmarkCircle20Regular,
  DismissCircle20Regular,
  ErrorCircle20Regular,
  Warning20Regular,
} from '@fluentui/react-icons';
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

  let iconToUse;
  switch (intent) {
    case 'success':
      iconToUse = <CheckmarkCircle20Regular />;
      break;
    case 'error':
      iconToUse = <DismissCircle20Regular />;
      break;
    case 'warning':
      iconToUse = <Warning20Regular />;
      break;
    case 'info':
    default:
      iconToUse = <ErrorCircle20Regular />;
      break;
  }

  return {
    components: {
      root: 'div',
      icon: 'span',
      content: 'span',
      action: Button,
    },
    root: getNativeElementProps('div', {
      ref,
      ...props,
    }),
    icon: resolveShorthand(props.icon, {
      defaultProps: {
        children: iconToUse,
      },
      required: true,
    }),
    content: resolveShorthand(props.content, {
      required: true,
    }),
    action: resolveShorthand(props.action, {
      required: true,
    }),
  };
};
