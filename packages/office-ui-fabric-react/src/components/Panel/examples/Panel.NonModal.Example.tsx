import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import { useConstCallback } from '@uifabric/react-hooks';

const explanation = "This panel is non-modal: even when it's open, it allows interacting with content outside the panel.";

export const PanelNonModalExample: React.FunctionComponent = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const openPanel = useConstCallback(() => setIsOpen(true));
  const dismissPanel = useConstCallback(() => setIsOpen(false));

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
        <span>{explanation}</span>
      </Panel>
    </div>
  );
};
