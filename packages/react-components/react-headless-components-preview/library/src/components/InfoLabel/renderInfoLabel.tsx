/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { InfoLabelSlots, InfoLabelState } from './InfoLabel.types';

/**
 * Render the final JSX of InfoLabel
 */
export const renderInfoLabel = (state: InfoLabelState): JSXElement => {
  assertSlots<InfoLabelSlots>(state);

  return (
    <state.root key={state.root.key}>
      <state.label />
      {state.infoButton && <state.infoButton key={state.infoButton.key} />}
    </state.root>
  );
};
