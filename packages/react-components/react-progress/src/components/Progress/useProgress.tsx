import * as React from 'react';
import { getNativeElementProps, resolveShorthand, useId } from '@fluentui/react-utilities';
import type { ProgressProps, ProgressState } from './Progress.types';
import { Label } from '@fluentui/react-label';
import { DefaultDiv } from './DefaultDiv';
import { useProgressState_unstable } from './useProgressState';

/**
 * Create the state required to render Progress.
 *
 * The returned state can be modified with hooks such as useProgressStyles_unstable,
 * before being passed to renderProgress_unstable.
 *
 * @param props - props from this instance of Progress
 * @param ref - reference to root HTMLElement of Progress
 */
export const useProgress_unstable = (props: ProgressProps, ref: React.Ref<HTMLElement>): ProgressState => {
  // Props
  const { barHeight = 2, percentComplete = -1 } = props;
  const baseId = useId('Progress');
  const describedbyId = useId('Progress Description');

  const { role = 'progressbar', ...rest } = props;
  const nativeRoot = getNativeElementProps('div', { ref, role, ...rest });

  const labelShorthand = resolveShorthand(props.label, {
    defaultProps: {
      id: baseId,
    },
    required: false,
  });

  const descriptionShorthand = resolveShorthand(props.description, {
    defaultProps: {
      id: describedbyId,
    },
    required: false,
  });

  const indicatorShortHand = resolveShorthand(props.indicator, {
    required: true,
    defaultProps: {
      children: <DefaultDiv />,
    },
  });

  if (labelShorthand && nativeRoot && !nativeRoot['aria-labelledby']) {
    nativeRoot['aria-labelledby'] = labelShorthand.id;
  }

  const state: ProgressState = {
    barHeight,
    percentComplete,
    components: {
      root: 'div',
      indicator: 'span',
      label: Label,
      description: Label,
    },
    root: nativeRoot,
    indicator: indicatorShortHand,
    label: labelShorthand,
    description: descriptionShorthand,
  };

  useProgressState_unstable(state, props);
  return state;
};
