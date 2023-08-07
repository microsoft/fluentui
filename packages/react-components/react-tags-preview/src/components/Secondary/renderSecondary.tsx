/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { assertSlots } from '@fluentui/react-utilities';
import type { SecondaryState, SecondarySlots } from './Secondary.types';

/**
 * Render the final JSX of Secondary
 */
export const renderSecondary_unstable = (state: SecondaryState) => {
  assertSlots<SecondarySlots>(state);

  return <state.root />;
};
