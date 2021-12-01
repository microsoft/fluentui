import * as React from 'react';
import { getPartitionedNativeProps, resolveShorthand } from '@fluentui/react-utilities';
import type { InputProps, InputState } from './Input.types';

/**
 * Create the state required to render Input.
 *
 * The returned state can be modified with hooks such as useInputStyles,
 * before being passed to renderInput.
 *
 * @param props - props from this instance of Input
 * @param ref - reference to `<input>` element of Input
 */
export const useInput = (props: InputProps, ref: React.Ref<HTMLInputElement>): InputState => {
  const { size, appearance, inline } = props;

  const nativeProps = getPartitionedNativeProps({
    props,
    primarySlotTagName: 'input',
  });

  return {
    size,
    appearance,
    inline,
    components: {
      root: 'span',
      input: 'input',
      contentBefore: 'span',
      contentAfter: 'span',
    },
    input: resolveShorthand(props.input, {
      required: true,
      defaultProps: {
        type: 'text',
        ref,
        ...nativeProps.primary,
      },
    }),
    contentAfter: resolveShorthand(props.contentAfter),
    contentBefore: resolveShorthand(props.contentBefore),
    root: resolveShorthand(props.root, {
      required: true,
      defaultProps: nativeProps.root,
    }),
  };
};
