import type * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { NavSectionHeaderProps, NavSectionHeaderState } from './NavSectionHeader.types';

/**
 * Create the state required to render NavSectionHeader.
 *
 * @param props - props from this instance of NavSectionHeader
 * @param ref - reference to root HTMLDivElement of NavSectionHeader
 */
export const useNavSectionHeader = (
  props: NavSectionHeaderProps,
  ref: React.Ref<HTMLDivElement>,
): NavSectionHeaderState => {
  return {
    components: {
      root: 'h3',
    },
    root: slot.always(
      getIntrinsicElementProps('h3', {
        ref,
        ...props,
      }),
      { elementType: 'h3' },
    ),
  };
};
