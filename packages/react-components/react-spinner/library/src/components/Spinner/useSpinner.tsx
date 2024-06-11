import * as React from 'react';
import { getIntrinsicElementProps, useId, useTimeout, slot } from '@fluentui/react-utilities';
import type { SpinnerProps, SpinnerState } from './Spinner.types';
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
  // Props
  const { size: contextSize } = useSpinnerContext();
  const { appearance = 'primary', labelPosition = 'after', size = contextSize ?? 'medium', delay = 0 } = props;
  const baseId = useId('spinner');

  const { role = 'progressbar', ...rest } = props;
  const nativeRoot = slot.always(
    getIntrinsicElementProps(
      'div',
      {
        // FIXME:
        // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
        // but since it would be a breaking change to fix it, we are casting ref to it's proper type
        ref: ref as React.Ref<HTMLDivElement>,
        role,
        ...rest,
      },
      ['size'],
    ),
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
    elementType: Label,
  });
  const spinnerShortHand = slot.optional(props.spinner, {
    renderByDefault: true,
    elementType: 'span',
  });
  if (labelShorthand && nativeRoot && !nativeRoot['aria-labelledby']) {
    nativeRoot['aria-labelledby'] = labelShorthand.id;
  }
  const state: SpinnerState = {
    appearance,
    delay,
    labelPosition,
    size,
    shouldRenderSpinner: !delay || isShownAfterDelay,
    components: { root: 'div', spinner: 'span', spinnerTail: 'span', label: Label },
    root: nativeRoot,
    spinner: spinnerShortHand,
    spinnerTail: slot.always(props.spinnerTail, { elementType: 'span' }),
    label: labelShorthand,
  };
  return state;
};
