/** @jsxRuntime classic */
/** @jsx createElementNext */

import { createElementNext } from '@fluentui/react-jsx-runtime';
import type { InputState } from './Input.types';

/**
 * Render the final JSX of Input
 */
export const renderInput_unstable = (state: InputState) => (
  <state.root>
    {state.contentBefore && <state.contentBefore />}
    <state.input />
    {state.contentAfter && <state.contentAfter />}
  </state.root>
);
