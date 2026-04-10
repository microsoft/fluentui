'use client';

import * as React from 'react';
import { useFieldContext_unstable } from '@fluentui/react-field';
import { motionSlot } from '@fluentui/react-motion';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import { clampValue, clampMax } from '../../utils/index';
import type {
  ProgressBarProps,
  ProgressBarState,
  ProgressBarBaseProps,
  ProgressBarBaseState,
} from './ProgressBar.types';
import { ProgressBarIndeterminateMotion } from './progressBarMotions';

/**
 * Create the state required to render ProgressBar.
 *
 * The returned state can be modified with hooks such as useProgressBarStyles_unstable,
 * before being passed to renderProgressBar_unstable.
 *
 * @param props - props from this instance of ProgressBar
 * @param ref - reference to root HTMLElement of ProgressBar
 */
export const useProgressBar_unstable = (props: ProgressBarProps, ref: React.Ref<HTMLElement>): ProgressBarState => {
  const field = useFieldContext_unstable();
  const fieldState = field?.validationState;

  const {
    color = fieldState === 'error' || fieldState === 'warning' || fieldState === 'success' ? fieldState : 'brand',
    shape = 'rounded',
    thickness = 'medium',
    indeterminateMotion,
    ...baseProps
  } = props;

  const state = useProgressBarBase_unstable(baseProps, ref);

  return {
    ...state,
    components: {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      ...state.components,
      indeterminateMotion: ProgressBarIndeterminateMotion,
    },
    color,
    shape,
    thickness,
    indeterminateMotion:
      state.value === undefined
        ? motionSlot(indeterminateMotion, {
            elementType: ProgressBarIndeterminateMotion,
            defaultProps: {},
          })
        : undefined,
  };
};

/**
 * Base hook for ProgressBar component. Manages state related to ARIA progressbar attributes
 * (role, aria-valuemin, aria-valuemax, aria-valuenow) and field context integration —
 * without design props (shape, thickness, color).
 *
 * @param props - props from this instance of ProgressBar (without shape, thickness, color)
 * @param ref - reference to root HTMLElement of ProgressBar
 */
export const useProgressBarBase_unstable = (
  props: ProgressBarBaseProps,
  ref: React.Ref<HTMLElement>,
): ProgressBarBaseState => {
  const field = useFieldContext_unstable();

  const max = clampMax(props.max ?? 1);
  const value = clampValue(props.value, max);

  const root = slot.always(
    getIntrinsicElementProps('div', {
      // FIXME:
      // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
      // but since it would be a breaking change to fix it, we are casting ref to it's proper type
      ref: ref as React.Ref<HTMLDivElement>,
      role: 'progressbar',
      'aria-valuemin': value !== undefined ? 0 : undefined,
      'aria-valuemax': value !== undefined ? max : undefined,
      'aria-valuenow': value,
      'aria-labelledby': field?.labelId,
      ...props,
    }),
    { elementType: 'div' },
  );
  if (field && (field.validationMessageId || field.hintId)) {
    // Prepend the field's validation message and/or hint to the user's aria-describedby
    root['aria-describedby'] = [field?.validationMessageId, field?.hintId, root['aria-describedby']]
      .filter(Boolean)
      .join(' ');
  }
  const bar = slot.always(props.bar, { elementType: 'div' });

  return {
    max,
    value,
    components: { root: 'div', bar: 'div', indeterminateMotion: 'div' },
    root,
    bar,
  };
};
