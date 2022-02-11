import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { LabelProps, LabelState, LabelRender } from './Label.types';
import { resolveShorthand } from '@fluentui/react-utilities';
import { renderLabel_unstable } from './renderLabel';

/**
 * Create the state required to render Label.
 *
 * The returned state can be modified with hooks such as useLabelStyles_unstable,
 * before being passed to renderLabel_unstable.
 *
 * @param props - props from this instance of Label
 * @param ref - reference to root HTMLElement of Label
 */
export const useLabel_unstable = (props: LabelProps, ref: React.Ref<HTMLElement>): [LabelState, LabelRender] => {
  const { disabled = false, required = false, strong = false, size = 'medium' } = props;
  const state: LabelState = {
    disabled,
    required: resolveShorthand(required === true ? '*' : required || undefined, {
      defaultProps: { 'aria-hidden': 'true' },
    }),
    strong,
    size,
    components: { root: 'label', required: 'span' },
    root: getNativeElementProps('label', { ref, ...props }),
  };

  return [state, renderLabel_unstable];
};
