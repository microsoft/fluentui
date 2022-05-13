import * as React from 'react';

import { Button } from '@fluentui/react-button';
import {
  CheckmarkCircle16Filled,
  DismissCircle16Filled,
  ErrorCircle16Filled,
  Warning16Filled,
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

  // todo - how to init icon state to pass in icon prop & ensure intent if present, will
  // override the icon prop?

  let iconToUse;
  switch (intent) {
    case 'success':
      iconToUse = <CheckmarkCircle16Filled />;
      break;
    case 'error':
      iconToUse = <DismissCircle16Filled />;
      break;
    case 'warning':
      iconToUse = <Warning16Filled />;
      break;
    case 'info':
      iconToUse = <ErrorCircle16Filled />;
      break;
  }

  const icon = resolveShorthand(props.icon, {
    defaultProps: {
      children: iconToUse,
    },
    required: true,
  });

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
    icon: icon,
    content: resolveShorthand(props.content, {
      defaultProps: {
        children: props.children,
      },
      required: true,
    }),
    // todo - fix types here
    action:
      props.action &&
      resolveShorthand(props.action, {
        required: true,
      }),
    intent,
  };
};
