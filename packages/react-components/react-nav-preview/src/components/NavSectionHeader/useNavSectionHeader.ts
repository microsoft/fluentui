import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { NavSectionHeaderProps, NavSectionHeaderState } from './NavSectionHeader.types';

/**
 * Create the state required to render NavSectionHeader.
 *
 * The returned state can be modified with hooks such as useNavSectionHeaderStyles_unstable,
 * before being passed to renderNavSectionHeader_unstable.
 *
 * @param props - props from this instance of NavSectionHeader
 * @param ref - reference to root HTMLDivElement of NavSectionHeader
 */
export const useNavSectionHeader_unstable = (
  props: NavSectionHeaderProps,
  ref: React.Ref<HTMLDivElement>,
): NavSectionHeaderState => {
  return {
    // TODO add appropriate props/defaults
    components: {
      // TODO add each slot's element type or component
      root: 'div',
    },
    // TODO add appropriate slots, for example:
    // mySlot: resolveShorthand(props.mySlot),
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        ...props,
      }),
      { elementType: 'div' },
    ),
  };
};
