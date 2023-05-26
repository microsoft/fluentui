import * as React from 'react';
import { resolveShorthand } from '@fluentui/react-utilities';
import { Input } from '@fluentui/react-input';
import type { SearchBoxProps, SearchBoxState } from './SearchBox.types';

/**
 * Create the state required to render SearchBox.
 *
 * The returned state can be modified with hooks such as useSearchBoxStyles_unstable,
 * before being passed to renderSearchBox_unstable.
 *
 * @param props - props from this instance of SearchBox
 * @param ref - reference to root HTMLElement of SearchBox
 */
export const useSearchBox_unstable = (props: SearchBoxProps, ref: React.Ref<HTMLElement>): SearchBoxState => {
  return {
    // TODO add appropriate props/defaults
    components: {
      // TODO add each slot's element type or component
      root: Input,
      contentBefore: 'span',
      primaryContentAfter: 'span',
      secondaryContentAfter: 'span',
    },
    // TODO add appropriate slots, for example:
    // mySlot: resolveShorthand(props.mySlot),
    root: resolveShorthand(props.root),
  };
};
