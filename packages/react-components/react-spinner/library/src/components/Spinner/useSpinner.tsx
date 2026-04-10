'use client';

import * as React from 'react';
import { getIntrinsicElementProps, useId, useTimeout, slot } from '@fluentui/react-utilities';
import type { SpinnerBaseProps, SpinnerBaseState, SpinnerProps, SpinnerState } from './Spinner.types';
import { Label } from '@fluentui/react-label';
import { useSpinnerContext } from '../../contexts/SpinnerContext';

/**
 * Create the state required to render Spinner.
 *
 * The returned state can be modified with hooks such as useSpinnerStyles_unstable,
 * before being passed to renderSpinner_unstable.
 *
 * @param props - props from this instance of Spinner
 * @param ref - reference to root HTMLElement of Spinner
 */
export const useSpinner_unstable = (props: SpinnerProps, ref: React.Ref<HTMLElement>): SpinnerState => {
  const { size: contextSize } = useSpinnerContext();
  const { appearance = 'primary', size = contextSize ?? 'medium', ...baseProps } = props;

  const baseState = useSpinnerBase_unstable(baseProps, ref);

  return {
    ...baseState,
    appearance,
    size,
    label: slot.optional(props.label, {
      defaultProps: baseState.label,
      elementType: Label,
    }),
  };
};

/**
 * Base hook for Spinner component, which manages state related to slots structure, ARIA attributes,
 * and delay-based visibility logic.
 *
 * @param props - User provided props to the Spinner component.
 * @param ref - User provided ref to be passed to the Spinner component.
 */
export const useSpinnerBase_unstable = (props: SpinnerBaseProps, ref: React.Ref<HTMLElement>): SpinnerBaseState => {
  const { delay = 0, labelPosition = 'after' } = props;
  const baseId = useId('spinner');

  const { role = 'progressbar', ...rest } = props;
  const nativeRoot = slot.always(
    getIntrinsicElementProps('div', {
      // FIXME:
      // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
      // but since it would be a breaking change to fix it, we are casting ref to it's proper type
      ref: ref as React.Ref<HTMLDivElement>,
      role,
      ...rest,
    }),
    {
      elementType: 'div',
    },
  );
  const [isShownAfterDelay, setIsShownAfterDelay] = React.useState(false);
  const [setDelayTimeout, clearDelayTimeout] = useTimeout();
  React.useEffect(() => {
    if (delay <= 0) {
      return;
    }
    setDelayTimeout(() => {
      setIsShownAfterDelay(true);
    }, delay);
    return () => {
      clearDelayTimeout();
    };
  }, [setDelayTimeout, clearDelayTimeout, delay]);
  const labelShorthand = slot.optional(props.label, {
    defaultProps: { id: baseId },
    renderByDefault: false,
    elementType: 'label',
  });
  const spinnerShortHand = slot.optional(props.spinner, {
    renderByDefault: true,
    elementType: 'span',
  });
  if (labelShorthand && nativeRoot && !nativeRoot['aria-labelledby']) {
    nativeRoot['aria-labelledby'] = labelShorthand.id;
  }
  const state: SpinnerBaseState = {
    delay,
    labelPosition,
    shouldRenderSpinner: !delay || isShownAfterDelay,
    components: { root: 'div', spinner: 'span', spinnerTail: 'span', label: 'label' },
    root: nativeRoot,
    spinner: spinnerShortHand,
    spinnerTail: slot.always(props.spinnerTail, { elementType: 'span' }),
    label: labelShorthand,
  };
  return state;
};
