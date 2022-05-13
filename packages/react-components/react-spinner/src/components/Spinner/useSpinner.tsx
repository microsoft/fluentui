import * as React from 'react';
import { getNativeElementProps, resolveShorthand, useId } from '@fluentui/react-utilities';
import type { SpinnerProps, SpinnerState } from './Spinner.types';
import { Label } from '@fluentui/react-label';
import { DefaultSvg } from './DefaultSvg';

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
  const { appearance = 'primary', labelPosition = 'after', size = 'medium', status = 'active' } = props;
  const baseId = useId('spinner');

  const { tabIndex, ...rest } = props;
  const nativeRoot = getNativeElementProps('div', { ref, ...rest }, ['size']);

  const labelShorthand = resolveShorthand(props.label, {
    defaultProps: {
      id: baseId,
    },
    required: false,
  });

  const spinnerShortHand = resolveShorthand(props.spinner, {
    required: true,
    defaultProps: {
      children: <DefaultSvg />,
      tabIndex,
    },
  });

  if (labelShorthand && spinnerShortHand && !spinnerShortHand['aria-labelledby']) {
    spinnerShortHand['aria-labelledby'] = labelShorthand.id;
  }

  const state: SpinnerState = {
    appearance,
    labelPosition,
    size,
    status,
    components: {
      root: 'div',
      spinner: 'span',
      label: Label,
    },
    root: nativeRoot,
    spinner: spinnerShortHand,
    label: labelShorthand,
  };
  return state;
};
