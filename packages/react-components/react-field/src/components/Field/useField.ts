import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { FieldProps, FieldState } from './Field.types';

/**
 * Create the state required to render Field.
 *
 * The returned state can be modified with hooks such as useFieldStyles_unstable,
 * before being passed to renderField_unstable.
 *
 * @param props - props from this instance of Field
 * @param ref - reference to root HTMLElement of Field
 */
export const useField_unstable = (props: FieldProps, ref: React.Ref<HTMLElement>): FieldState => {
  return {
    // TODO add appropriate props/defaults
    components: {
      // TODO add each slot's element type or component
      root: 'div',
    },
    // TODO add appropriate slots, for example:
    // mySlot: resolveShorthand(props.mySlot),
    root: getNativeElementProps('div', {
      ref,
      ...props,
    }),
  };
};
