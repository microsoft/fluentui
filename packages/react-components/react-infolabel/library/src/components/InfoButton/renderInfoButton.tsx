/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import { PopoverTrigger } from '@fluentui/react-popover';
import type { InfoButtonState, InfoButtonSlots } from './InfoButton.types';

/**
 * Render the final JSX of InfoButton
 */
export const renderInfoButton_unstable = (state: InfoButtonState) => {
  assertSlots<InfoButtonSlots>(state);

  return (
    <state.popover>
      <PopoverTrigger>
        <state.root />
      </PopoverTrigger>
      <state.info />
    </state.popover>
  );
};
