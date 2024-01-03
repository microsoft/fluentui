/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { CardPreviewSlots, CardPreviewState } from './CardPreview.types';

/**
 * Render the final JSX of CardPreview.
 */
export const renderCardPreview_unstable = (state: CardPreviewState) => {
  assertSlots<CardPreviewSlots>(state);

  return (
    <state.root>
      {state.root.children}
      {state.logo && <state.logo />}
    </state.root>
  );
};
