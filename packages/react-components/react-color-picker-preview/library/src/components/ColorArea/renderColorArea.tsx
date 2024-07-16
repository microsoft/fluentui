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
      <state.description>
        Use left and right arrow keys to set saturation. Use up and down arrow keys to set brightness.
      </state.description>
      <state.light />
      <state.dark />
      <state.thumb />
    </state.root>
  );
};
