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
 */
export const useLabel = (props: LabelProps, ref: React.Ref<HTMLElement>): LabelState => {
  const { disabled = false, required = false, strong = false } = props;
  return {
    disabled,
    required: resolveShorthand(required === false ? null : required, {
      required: !!required,
      defaultProps: { children: '*' },
    }),
    strong,
    size: 'medium',
    components: { root: 'label', required: 'span' },
    root: getNativeElementProps('label', { ref, ...props }),
  };
};
