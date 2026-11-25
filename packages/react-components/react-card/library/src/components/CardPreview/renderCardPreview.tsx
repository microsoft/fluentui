/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { CardPreviewSlots, CardPreviewBaseState } from './CardPreview.types';

/**
 * Render the final JSX of CardPreview.
 */
export const renderCardPreview_unstable = (state: CardPreviewBaseState): JSXElement => {
  assertSlots<CardPreviewSlots>(state);

  return (
    <state.root>
      {state.root.children}
      {state.logo && <state.logo />}
    </state.root>
  );
};
