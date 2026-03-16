/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { CardFooterSlots, CardFooterState } from './CardFooter.types';

/**
 * Render the final JSX of CardFooter.
 */
export const renderCardFooter_unstable = (state: CardFooterState): JSXElement => {
  assertSlots<CardFooterSlots>(state);

  return (
    <state.root>
      {state.root.children}
      {state.action && <state.action />}
    </state.root>
  );
};
