'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderSearchBox, useSearchBox } from '@fluentui/react-headless-components-preview/search-box';
import { DismissRegular } from '@fluentui/react-icons/headless/svg/dismiss';
import { SearchRegular } from '@fluentui/react-icons/headless/svg/search';

import type { SearchBoxProps, SearchBoxState } from './SearchBox.types';
import { useSearchBoxStyles } from './useSearchBoxStyles';

/**
 * A SearchBox is an input for search queries. Windmod SearchBox: the headless search box
 * decorated with the Fluent visual contract (Tailwind v4 + CSS Modules), over windmod Input's.
 */
export const SearchBox: ForwardRefComponent<SearchBoxProps> = React.forwardRef((props, ref) => {
  // Look props belong to windmod. The headless surface omits both from its type, yet the styled
  // input hook it composes resolves them into the state anyway, so they must be applied after the
  // spread below. Defaults mirror @fluentui/react-search's styled useSearchBox, minus its
  // Field-context and overrides-context fallbacks, which windmod ships no counterpart for.
  const { appearance = 'outline', size = 'medium', ...rest } = props;

  const state: SearchBoxState = {
    ...useSearchBox(rest, ref),
    appearance,
    size,
  };

  // Both slots render by default, so no pre-hook materialisation is needed here (see
  // MenuButton.tsx for that case). Consumer children always win; null or undefined children fall
  // back to the Fluent glyph; `contentBefore={null}` or `dismiss={null}` still removes the slot.
  const styled = useSearchBoxStyles({
    ...state,
    contentBefore: state.contentBefore && {
      ...state.contentBefore,
      children: state.contentBefore.children ?? <SearchRegular />,
    },
    dismiss: state.dismiss && { ...state.dismiss, children: state.dismiss.children ?? <DismissRegular /> },
  });

  return renderSearchBox(styled);
  // Casting is required due to lack of distributive union to support union on @types/react
}) as ForwardRefComponent<SearchBoxProps>;

SearchBox.displayName = 'SearchBox';
