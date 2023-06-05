import * as React from 'react';

import { CheckmarkCircleFilled, DismissCircleFilled, InfoFilled, WarningFilled } from '@fluentui/react-icons';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';

import type { ToastTitleProps, ToastTitleState } from './ToastTitle.types';

/**
 * Create the state required to render ToastTitle.
 *
 * The returned state can be modified with hooks such as useToastTitleStyles_unstable,
 * before being passed to renderToastTitle_unstable.
 *
 * @param props - props from this instance of ToastTitle
 * @param ref - reference to root HTMLElement of ToastTitle
 */
export const useToastTitle_unstable = (props: ToastTitleProps, ref: React.Ref<HTMLElement>): ToastTitleState => {
  const { intent = 'info' } = props;

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
    action: resolveShorthand(props.action),
    components: {
      root: 'div',
      media: 'div',
      action: 'div',
    },
    media: resolveShorthand(props.media, { required: !!props.intent, defaultProps: { children: defaultIcon } }),
    intent,
    root: getNativeElementProps('div', {
      ref,
      children: props.children,
      ...props,
    }),
  };
};
