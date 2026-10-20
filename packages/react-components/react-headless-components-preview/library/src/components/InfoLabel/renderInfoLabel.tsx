/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { InfoLabelSlots, InfoLabelState } from './InfoLabel.types';
import { InfoLabelOwnershipContext, infoLabelOwnershipReporter } from './infoLabelContext';
import type { InternalInfoLabelState } from './infoLabelContext';

/**
 * Render the final JSX of InfoLabel
 */
export const renderInfoLabel = (state: InfoLabelState): JSXElement => {
  assertSlots<InfoLabelSlots>(state);

  return (
    <state.root key={state.root.key}>
      <state.label />
      <InfoLabelOwnershipContext.Provider value={(state as InternalInfoLabelState)[infoLabelOwnershipReporter]}>
        {state.infoButton && <state.infoButton key={state.infoButton.key} />}
      </InfoLabelOwnershipContext.Provider>
    </state.root>
  );
};
