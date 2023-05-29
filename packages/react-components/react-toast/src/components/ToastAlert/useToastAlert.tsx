import * as React from 'react';

import { CheckmarkCircleFilled, DismissCircleFilled, InfoFilled, WarningFilled } from '@fluentui/react-icons';
import { getNativeElementProps, slot } from '@fluentui/react-utilities';

import type { ToastAlertProps, ToastAlertState } from './ToastAlert.types';

/**
 * Create the state required to render ToastAlert.
 *
 * The returned state can be modified with hooks such as useToastAlertStyles_unstable,
 * before being passed to renderToastAlert_unstable.
 *
 * @param props - props from this instance of ToastAlert
 * @param ref - reference to root HTMLElement of ToastAlert
 */
export const useToastAlert_unstable = (props: ToastAlertProps, ref: React.Ref<HTMLElement>): ToastAlertState => {
  const { appearance = 'primary', intent } = props;

  /** Determine the role and media to render based on the intent */
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

  return {
    action: slot(props.action, { elementType: 'div' }),
    appearance,
    components: { root: 'div', media: 'div', action: 'div' },
    media: slot(props.media, { required: !!props.intent, defaultProps: { children: defaultIcon }, elementType: 'div' }),
    intent,
    root: slot(
      getNativeElementProps('div', {
        ref,
        children: props.children,
        ...props,
      }),
      { required: true, elementType: 'div' },
    ),
  };
};
