'use client';

import * as React from 'react';
import { CheckmarkCircleFilled, DiamondDismissFilled, InfoFilled, WarningFilled } from '@fluentui/react-icons';
import { slot } from '@fluentui/react-utilities';
import { useToastTitle as useToastTitleBase } from '@fluentui/react-headless-components-preview/toast';
import type { ToastTitleProps, ToastTitleState } from './ToastTitle.types';

/** Create the state required to render ToastTitle. */
export const useToastTitle = (props: ToastTitleProps, ref: React.Ref<HTMLElement>): ToastTitleState => {
  const state = useToastTitleBase(props, ref);
  let defaultIcon: React.ReactNode;

  switch (state.intent) {
    case 'success':
      defaultIcon = <CheckmarkCircleFilled />;
      break;
    case 'error':
      defaultIcon = <DiamondDismissFilled />;
      break;
    case 'warning':
      defaultIcon = <WarningFilled />;
      break;
    case 'info':
      defaultIcon = <InfoFilled />;
      break;
  }

  const media = slot.optional(props.media, {
    defaultProps: { children: defaultIcon },
    renderByDefault: !!state.intent,
    elementType: 'div',
  });

  return {
    ...state,
    media: media
      ? {
          ...media,
          'data-intent': state.intent,
        }
      : undefined,
  };
};
