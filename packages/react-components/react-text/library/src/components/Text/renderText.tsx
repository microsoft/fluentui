/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { TextSlots, TextState } from './Text.types';

/**
 * Render the final JSX of Text
 */
export const renderText_unstable = (state: TextState) => {
  assertSlots<TextSlots>(state);

  return <state.root />;
};
