/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { SearchBoxState, SearchBoxSlots } from './SearchBox.types';

/**
 * Render the final JSX of SearchBox
 */
export const renderSearchBox_unstable = (state: SearchBoxState) => {
  assertSlots<SearchBoxSlots>(state);

  return (
    <state.root>
      {state.contentBefore && <state.contentBefore />}
      <state.input />
      {state.contentAfter && (
        <state.contentAfter>
          {state.contentAfter.children}
          {state.dismiss && <state.dismiss />}
        </state.contentAfter>
      )}
    </state.root>
  );
};
