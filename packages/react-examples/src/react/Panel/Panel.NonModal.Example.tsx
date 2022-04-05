import * as React from 'react';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { Panel } from '@fluentui/react/lib/Panel';
import { useBoolean } from '@fluentui/react-hooks';

const explanation =
  "This panel is non-modal: even when it's open, it allows interacting with content outside the panel.";

export const PanelNonModalExample: React.FunctionComponent = () => {
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);

  return (
    <div>
      {explanation}
      <br />
      <br />
      <DefaultButton text="Open panel" onClick={openPanel} />
      <Panel
        headerText="Non-modal panel"
        // this prop makes the panel non-modal
        isBlocking={false}
        isOpen={isOpen}
        onDismiss={dismissPanel}
        closeButtonAriaLabel="Close"
      >
        <p>{explanation}</p>
      </Panel>
    </div>
  );
};
