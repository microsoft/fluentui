/* eslint-disable @typescript-eslint/no-deprecated */
/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import type * as React from 'react';
import { assertSlots } from '@fluentui/react-utilities';
import { PopoverTrigger } from '@fluentui/react-popover';
import type { InfoButtonState, InfoButtonSlots } from './InfoButton.types';

/**
 * Render the final JSX of InfoButton
 *
 * @deprecated use {@link @fluentui/react-components#InfoLabel} from `\@fluentui/react-components` or `\@fluentui/react-infolabel` instead
 */
export const renderInfoButton_unstable = (state: InfoButtonState): React.ReactElement => {
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
