/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { CardHeaderSlots, CardHeaderState } from './CardHeader.types';

/**
 * Render the final JSX of CardHeader.
 */
export const renderCardHeader_unstable = (state: CardHeaderState): JSXElement => {
  assertSlots<CardHeaderSlots>(state);

  return (
    <state.root>
      {state.image && <state.image />}
      {state.header && <state.header />}
      {state.description && <state.description />}
      {state.action && <state.action />}
    </state.root>
  );
};
