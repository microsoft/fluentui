/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { EmptySwatchBaseState, EmptySwatchSlots } from './EmptySwatch.types';

/**
 * Render the final JSX of EmptySwatch
 */
export const renderEmptySwatch_unstable = (state: EmptySwatchBaseState): JSXElement => {
  assertSlots<EmptySwatchSlots>(state);

  return <state.root />;
};
