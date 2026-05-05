'use client';

import type * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { LabelBaseProps, LabelBaseState, LabelProps, LabelState } from './Label.types';

/**
 * Create the state required to render Label.
 *
 * The returned state can be modified with hooks such as useLabelStyles_unstable,
 * before being passed to renderLabel_unstable.
 *
 * @param props - props from this instance of Label
 * @param ref - reference to root HTMLElement of Label
 */
export const useLabel_unstable = (props: LabelProps, ref: React.Ref<HTMLElement>): LabelState => {
  const { weight = 'regular', size = 'medium', ...baseProps } = props;
  const state = useLabelBase_unstable(baseProps, ref as React.Ref<HTMLLabelElement>);

  return {
    weight,
    size,
    ...state,
  };
};

/**
 * Create the base state required to render Label, without design-specific props (size, weight).
 *
 * @param props - props from this instance of Label
 * @param ref - reference to root HTMLElement of Label
 */
export const useLabelBase_unstable = (props: LabelBaseProps, ref: React.Ref<HTMLLabelElement>): LabelBaseState => {
  const { disabled = false, required = false, ...rest } = props;
  return {
    disabled,
    required: slot.optional(required === true ? '*' : required || undefined, {
      defaultProps: { 'aria-hidden': 'true' },
      elementType: 'span',
    }),
    components: { root: 'label', required: 'span' },
    root: slot.always(
      getIntrinsicElementProps('label', {
        ref: ref as React.Ref<HTMLLabelElement>,
        ...rest,
      }),
      { elementType: 'label' },
    ),
  };
};
