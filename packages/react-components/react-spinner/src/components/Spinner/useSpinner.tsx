import * as React from 'react';
import { getNativeElementProps, resolveShorthand, useId, useTimeout } from '@fluentui/react-utilities';
import type { SpinnerProps, SpinnerState } from './Spinner.types';
import { Label } from '@fluentui/react-label';
import { DefaultSvg } from './DefaultSvg';
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

  const { role = 'progressbar', tabIndex, ...rest } = props;
  const nativeRoot = getNativeElementProps('div', { ref, role, ...rest }, ['size']);

  const [isVisible, setIsVisible] = React.useState(true);

  const [setDelayTimeout, clearDelayTimeout] = useTimeout();

  React.useEffect(() => {
    if (delay <= 0) {
      return;
    }
    setIsVisible(false);
    setDelayTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => {
      clearDelayTimeout();
    };
  }, [setDelayTimeout, clearDelayTimeout, delay]);

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

  if (labelShorthand && nativeRoot && !nativeRoot['aria-labelledby']) {
    nativeRoot['aria-labelledby'] = labelShorthand.id;
  }

  const state: SpinnerState = {
    appearance,
    delay,
    labelPosition,
    size,
    shouldRenderSpinner: isVisible,
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
