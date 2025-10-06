/* eslint-disable @typescript-eslint/no-deprecated */
/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import type * as React from 'react';
import { assertSlots } from '@fluentui/react-utilities';
import type { InfoLabelSlots, InfoLabelState } from './InfoLabel.types';

/**
 * Render the final JSX of InfoLabel
 *
 * @deprecated use {@link @fluentui/react-components#InfoLabel} from `\@fluentui/react-components` or `\@fluentui/react-infolabel` instead
 */
export const renderInfoLabel_unstable = (state: InfoLabelState): React.ReactElement => {
  assertSlots<InfoLabelSlots>(state);

  return (
    <state.root>
      <state.label />
      {state.infoButton && <state.infoButton />}
    </state.root>
  );
};
