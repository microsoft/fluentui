'use client';

import { createContext, useContextSelector } from '@fluentui/react-context-selector';
import { mergeCallbacks } from '@fluentui/react-utilities';
import type * as React from 'react';
import type { ContextSelector, Context } from '@fluentui/react-context-selector';
import type { PopoverContextValue } from './Popover.types';

export type InternalPopoverContextValue = PopoverContextValue & {
  capture?: React.EventHandler<React.FocusEvent<HTMLElement> | React.MouseEvent<HTMLElement>>;
};

export const PopoverContext: Context<PopoverContextValue> = createContext<PopoverContextValue | undefined>(
  undefined,
) as Context<PopoverContextValue>;

const popoverContextDefaultValue: PopoverContextValue = {
  open: false,
  setOpen: () => null,
  toggleOpen: () => null,
  triggerRef: { current: null },
  contentRef: { current: null },
  arrowRef: { current: null },
  openOnContext: false,
  openOnHover: false,
  withArrow: false,
  trapFocus: false,
  positioning: {
    targetRef: () => undefined,
    containerRef: () => undefined,
  },
  surfaceId: '',
};

export const PopoverProvider = PopoverContext.Provider;

/**
 * Hook to consume PopoverContext with a selector for optimized re-renders.
 */
export const usePopoverContext = <T>(selector: ContextSelector<PopoverContextValue, T>): T =>
  useContextSelector(PopoverContext, (ctx = popoverContextDefaultValue) => selector(ctx));

type CaptureProps<T extends HTMLElement> = Pick<React.HTMLAttributes<T>, 'onFocusCapture' | 'onMouseOverCapture'>;

export const usePopoverCaptureProps = <T extends HTMLElement>(props?: CaptureProps<T>): CaptureProps<T> => {
  const capture = useContextSelector(PopoverContext, ctx => (ctx as InternalPopoverContextValue | undefined)?.capture);
  return {
    onFocusCapture: mergeCallbacks<[React.FocusEvent<T>]>(capture, props?.onFocusCapture),
    onMouseOverCapture: mergeCallbacks<[React.MouseEvent<T>]>(capture, props?.onMouseOverCapture),
  };
};
