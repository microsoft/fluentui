/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { ColorSliderState, ColorSliderSlots } from './ColorSlider.types';

/**
 * Render the final JSX of ColorSlider
 */
export const renderColorSlider_unstable = (state: ColorSliderState) => {
  assertSlots<ColorSliderSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <state.root />;
};
