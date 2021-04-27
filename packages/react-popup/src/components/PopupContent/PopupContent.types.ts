import * as React from 'react';
import { ComponentProps, ComponentState } from '@fluentui/react-utilities';
import { PopupContextValue } from '../../popupContext';

/**
 * PopupContent Props
 */
export interface PopupContentProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {}

/**
 * Names of the shorthand properties in PopupContentProps
 */
export const popupContentShorthandProps = [] as const;

/**
 * Names of the shorthand properties in PopupContentProps
 */
export type PopupContentShorthandProps = typeof popupContentShorthandProps[number];

/**
 * Names of PopupContentProps that have a default value in usePopupContent
 */
export type PopupContentDefaultedProps = never;

/**
 * PopupContent State
 */
export type PopupContentState = ComponentState<
  React.Ref<HTMLElement>,
  PopupContentProps & Pick<PopupContextValue, 'open' | 'mountNode'>,
  PopupContentShorthandProps,
  PopupContentDefaultedProps
>;
