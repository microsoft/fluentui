/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { NativeSliderState, NativeSliderSlots } from './NativeSlider.types';

/**
 * Render the final JSX of NativeSlider
 */
export const renderNativeSlider_unstable = (state: NativeSliderState) => {
  assertSlots<NativeSliderSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <state.root />;
};
