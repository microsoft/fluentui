import * as React from 'react';

import { CheckmarkCircleFilled, DismissCircleFilled, InfoFilled, WarningFilled } from '@fluentui/react-icons';
import { getNativeElementProps, slot } from '@fluentui/react-utilities';
import { useBackgroundAppearance } from '@fluentui/react-shared-contexts';

import type { ToastTitleProps, ToastTitleState } from './ToastTitle.types';
import { useToastContainerContext } from '../../contexts/toastContainerContext';

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
  const { intent, titleId } = useToastContainerContext();
  const backgroundAppearance = useBackgroundAppearance();

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
    action: slot.optional(props.action, { elementType: 'div' }),
    components: { root: 'div', media: 'div', action: 'div' },
    media: slot.optional(props.media, {
      renderByDefault: !!intent,
      defaultProps: { children: defaultIcon },
      elementType: 'div',
    }),
    root: slot.always(
      getNativeElementProps('div', {
        ref,
        children: props.children,
        id: titleId,
        ...props,
      }),
      { elementType: 'div' },
    ),
    intent,
    backgroundAppearance,
  };
};
