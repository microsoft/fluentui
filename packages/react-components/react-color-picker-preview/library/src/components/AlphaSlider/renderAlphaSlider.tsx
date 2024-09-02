/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { AlphaSliderState, AlphaSliderSlots } from './AlphaSlider.types';

/**
 * Render the final JSX of AlphaSlider
 */
export const renderAlphaSlider_unstable = (state: AlphaSliderState) => {
  assertSlots<AlphaSliderSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <state.root />;
};
