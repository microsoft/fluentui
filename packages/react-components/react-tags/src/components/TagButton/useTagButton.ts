import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { TagButtonProps, TagButtonState } from './TagButton.types';

/**
 * Create the state required to render TagButton.
 *
 * The returned state can be modified with hooks such as useTagButtonStyles_unstable,
 * before being passed to renderTagButton_unstable.
 *
 * @param props - props from this instance of TagButton
 * @param ref - reference to root HTMLElement of TagButton
 */
export const useTagButton_unstable = (props: TagButtonProps, ref: React.Ref<HTMLElement>): TagButtonState => {
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
