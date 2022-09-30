import * as React from 'react';
import { getNativeElementProps, resolveShorthand, useId } from '@fluentui/react-utilities';
import type { ProgressProps, ProgressState } from './Progress.types';

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
  const { thickness = 'medium', indeterminate = false, percentComplete = 0 } = props;
  const baseId = useId('progress-');

  const root = getNativeElementProps('div', { ref, role: 'progressbar', ...props });

  const label = resolveShorthand(props.label, {
    defaultProps: {
      id: baseId + '__label',
    },
  });

  const description = resolveShorthand(props.description, {
    defaultProps: {
      id: baseId + '__description',
    },
  });

  const bar = resolveShorthand(props.bar, {
    required: true,
    defaultProps: {
      'aria-valuemin': indeterminate ? undefined : 0,
      'aria-valuemax': indeterminate ? undefined : 100,
      'aria-valuenow': indeterminate ? undefined : Math.floor(percentComplete),
    },
  });

  const track = resolveShorthand(props.track, {
    required: true,
  });

  if (label && !root['aria-label'] && !root['aria-labelledby']) {
    root['aria-labelledby'] = label.id;
  }

  const state: ProgressState = {
    indeterminate,
    percentComplete,
    thickness,
    components: {
      root: 'div',
      bar: 'div',
      track: 'div',
      label: 'span',
      description: 'span',
    },
    root,
    bar,
    track,
    label,
    description,
  };

  return state;
};
