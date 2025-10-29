/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { ResultOptionSlots, ResultOptionState } from './ResultOption.types';

/**
 * Render the final JSX of Result Option
 */
export const renderResultOption_unstable = (state: ResultOptionState): JSXElement => {
  assertSlots<ResultOptionSlots>(state);

  return <state.root>{state.root.children}</state.root>;
};
