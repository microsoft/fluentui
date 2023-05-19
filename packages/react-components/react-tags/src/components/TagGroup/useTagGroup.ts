import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { TagGroupProps, TagGroupState } from './TagGroup.types';

/**
 * Create the state required to render TagGroup.
 *
 * The returned state can be modified with hooks such as useTagGroupStyles_unstable,
 * before being passed to renderTagGroup_unstable.
 *
 * @param props - props from this instance of TagGroup
 * @param ref - reference to root HTMLElement of TagGroup
 */
export const useTagGroup_unstable = (props: TagGroupProps, ref: React.Ref<HTMLElement>): TagGroupState => {
  const { size = 'medium' } = props;

  return {
    size,
    components: {
      root: 'div',
    },
    root: getNativeElementProps('div', {
      ref,
      ...props,
      // TODO aria attributes
    }),
  };
};
