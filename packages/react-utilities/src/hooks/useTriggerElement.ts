import * as React from 'react';

import { applyTriggerPropsToChildren } from '../utils/applyTriggerPropsToChildren';
import { getReactCallbackName } from '../utils/getReactCallbackName';
import { onlyChild } from '../utils/onlyChild';
import { useEventCallback } from './useEventCallback';
import { useMergedRefs } from './useMergedRefs';
import type { ReactCallbackName } from '../utils/getReactCallbackName';

export type UseTriggerElementOptions<TriggerProps> = {
  /** An actual trigger element or render props function. */
  children: React.ReactElement | ((props: TriggerProps) => React.ReactNode) | null | undefined;

  /** A ref to trigger element. */
  ref: React.Ref<unknown> | undefined;

  /** Props that are passed to a parent component and should be forwarded down. */
  outerProps: React.HTMLProps<unknown>;

  /** Custom props including callbacks. */
  overrideProps: TriggerProps;
};

const CAPTURE_CALLBACK_REGEX = /on[A-Z].+Capture$/;
const CALLBACK_REGEX = /on[A-Z].+/;

/**
 * A hook that handles "trigger" pattern.
 *
 * Clones a passed element or calls render props. Merges props including refs and callbacks, callbacks are kept stable
 * by reference.
 */
export function useTriggerElement<TriggerProps extends React.HTMLProps<unknown>>(
  options: UseTriggerElementOptions<TriggerProps>,
): React.ReactNode {
  const { children, ref, outerProps, overrideProps } = options;

  let childProps: React.HTMLProps<unknown> = {};
  let childRef = null;

  // child can be a render func, `applyTriggerPropsToChildren`does the same check again
  // TODO figure out a way to only do this check once
  if (React.isValidElement(children)) {
    const child = onlyChild(children);

    childProps = child.props;
    childRef = ((child as unknown) as { ref?: React.Ref<unknown> }).ref;
  }

  // Two separate callbacks are needed to handle properly bubble and capture callbacks
  // "getReactCallbackName()" could return proper callback name, but it's possible only with React 17

  const handleBubbleEvent = useEventCallback((ev: React.SyntheticEvent<unknown>) => {
    const callbackName = getReactCallbackName(ev);

    if (callbackName) {
      // Typecast is required as "ev" is "React.SyntheticEvent" while callbacks have stricter typings and accept
      // "FocusEvent", "ClipboardEvent" and etc.
      /* eslint-disable @typescript-eslint/no-explicit-any */
      childProps[callbackName]?.(ev as any);
      overrideProps[callbackName]?.(ev as any);
      outerProps[callbackName]?.(ev as any);
      /* eslint-enable @typescript-eslint/no-explicit-any */
    }
  });
  const handleCaptureEvent = useEventCallback((ev: React.SyntheticEvent<unknown>) => {
    const callbackName = ((getReactCallbackName(ev) + 'Capture') as unknown) as ReactCallbackName;

    if (callbackName) {
      // Typecast is required as "ev" is "React.SyntheticEvent" while callbacks have stricter typings and accept
      // "FocusEvent", "ClipboardEvent" and etc.
      /* eslint-disable @typescript-eslint/no-explicit-any */
      childProps[callbackName]?.(ev as any);
      overrideProps[callbackName]?.(ev as any);
      outerProps[callbackName]?.(ev as any);
      /* eslint-enable @typescript-eslint/no-explicit-any */
    }
  });

  const mergedPropEntries = Object.entries({
    ...outerProps,
    ...overrideProps,
    ...childProps,
    // Undocumented, but React supports ref cloning through props
    ref: useMergedRefs(childRef, ref),
  });

  // TODO: fix me after https://github.com/microsoft/fluentui/issues/21229
  // Causes TS error:
  // "Property 'fromEntries' does not exist on type 'ObjectConstructor'"
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const triggerProps = (Object as any).fromEntries(
    mergedPropEntries.map(([propName, propValue]) => {
      if (propName.match(CAPTURE_CALLBACK_REGEX)) {
        return [propName, handleCaptureEvent];
      }

      if (propName.match(CALLBACK_REGEX)) {
        return [propName, handleBubbleEvent];
      }

      return [propName, propValue];
    }),
  ) as TriggerProps;

  return applyTriggerPropsToChildren(children, triggerProps);
}
