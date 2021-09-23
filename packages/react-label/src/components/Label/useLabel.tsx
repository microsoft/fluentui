import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { LabelProps, LabelSlots, LabelState } from './Label.types';
import { resolveShorthand } from '@fluentui/react-utilities';

/**
 * Array of all shorthand properties listed in LabelShorthandProps
 * {@docCatergory Label}
 */
export const labelShorthandProps: Array<keyof LabelSlots> = ['root', 'required'];

/**
 * Create the state required to render Label.
 *
 * The returned state can be modified with hooks such as useLabelStyles,
 * before being passed to renderLabel.
 *
 * @param props - props from this instance of Label
 * @param ref - reference to root HTMLElement of Label
 * @param defaultProps - (optional) default prop values provided by the implementing type
 */
export const useLabel = (props: LabelProps, ref: React.Ref<HTMLElement>): LabelState => {
  const { disabled = false, required = false, strong = false } = props;
  let requiredShorthand;
  if (required === true) {
    requiredShorthand = { children: '*' };
  } else if (required === false) {
    requiredShorthand = undefined;
  } else {
    requiredShorthand = required;
  }

  const state: LabelState = {
    disabled,
    required: resolveShorthand(requiredShorthand),
    strong,
    size: 'medium',
    components: { root: 'label', required: 'span' },
    root: getNativeElementProps('label', { ref, ...props }),
  };

  return state;
};
