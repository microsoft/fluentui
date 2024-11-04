/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { ColorAreaState, ColorAreaSlots } from './ColorArea.types';

/**
 * Render the final JSX of ColorArea
 */
export const renderColorArea_unstable = (state: ColorAreaState) => {
  assertSlots<ColorAreaSlots>(state);

  return (
    <state.root>
      <state.thumb>
        <state.inputX />
        <state.inputY />
      </state.thumb>
    </state.root>
  );
};
