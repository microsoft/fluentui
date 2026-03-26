'use client';

import * as React from 'react';

import { CheckmarkCircleFilled, DiamondDismissFilled, InfoFilled, WarningFilled } from '@fluentui/react-icons';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import { useBackgroundAppearance } from '@fluentui/react-shared-contexts';

import type { ToastTitleBaseProps, ToastTitleBaseState, ToastTitleProps, ToastTitleState } from './ToastTitle.types';
import { useToastContainerContext } from '../../contexts/toastContainerContext';

/**
 * Create the base state required to render ToastTitle, without design-only props.
 *
 * @param props - props from this instance of ToastTitle
 * @param ref - reference to root HTMLElement of ToastTitle
 */
export const useToastTitleBase_unstable = (
  props: ToastTitleBaseProps,
  ref: React.Ref<HTMLElement>,
): ToastTitleBaseState => {
  const { intent, titleId } = useToastContainerContext();

  return {
    action: slot.optional(props.action, { elementType: 'div' }),
    components: { root: 'div', media: 'div', action: 'div' },
    media: slot.optional(props.media, {
      renderByDefault: !!intent,
      elementType: 'div',
    }),
    root: slot.always(
      getIntrinsicElementProps('div', {
        // FIXME:
        // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
        // but since it would be a breaking change to fix it, we are casting ref to it's proper type
        ref: ref as React.Ref<HTMLDivElement>,
        children: props.children,
        id: titleId,
        ...props,
      }),
      { elementType: 'div' },
    ),
    intent,
  };
};

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
  const backgroundAppearance = useBackgroundAppearance();
  const baseState = useToastTitleBase_unstable(props, ref);

  /** Determine the role and media to render based on the intent */
  let defaultIcon;
  switch (baseState.intent) {
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

  return {
    ...baseState,
    backgroundAppearance,
    media: baseState.media
      ? { ...baseState.media, children: baseState.media.children ?? defaultIcon }
      : baseState.media,
  };
};
