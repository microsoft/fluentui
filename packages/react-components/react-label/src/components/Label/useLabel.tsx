import * as React from 'react';
import { getNativeElementProps, slot } from '@fluentui/react-utilities';
import type { LabelProps, LabelState } from './Label.types';

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
  const { disabled = false, required = false, weight = 'regular', size = 'medium' } = props;
  return {
    disabled,
    required: slot.optional(required === true ? '*' : required || undefined, {
      defaultProps: { 'aria-hidden': 'true' },
      elementType: 'span',
    }),
    weight,
    size,
    components: { root: 'label', required: 'span' },
    root: slot.always(getNativeElementProps('label', { ref, ...props }), { elementType: 'label' }),
  };
};
