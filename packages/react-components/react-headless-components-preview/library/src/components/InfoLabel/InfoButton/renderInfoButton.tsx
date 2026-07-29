/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import { PopoverTrigger } from '../../Popover';
import type { InfoButtonState, InfoButtonSlots } from './InfoButton.types';

/**
 * Render the final JSX of InfoButton
 */
export const renderInfoButton = (state: InfoButtonState): JSXElement => {
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
