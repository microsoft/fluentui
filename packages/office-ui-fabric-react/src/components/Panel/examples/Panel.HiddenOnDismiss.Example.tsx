import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { useConstCallback } from '@uifabric/react-hooks';

const contentExplanation =
  'Try typing something in this text field, closing the panel, and re-opening the panel. ' +
  " The text field's contents should still be here when the panel re-opens.";

export const PanelHiddenOnDismissExample: React.FunctionComponent = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const openPanel = useConstCallback(() => setIsOpen(true));
  const dismissPanel = useConstCallback(() => setIsOpen(false));

  return (
    <div>
      When dismissed, this panel will be hidden instead of destroyed. This is useful for cases in which the panel
      contains state which must be preserved across times that the panel is opened. <br />
      <br />
      <DefaultButton text="Open panel" onClick={openPanel} />
      <Panel
        isOpen={isOpen}
        closeButtonAriaLabel="Close"
        isHiddenOnDismiss={true}
        headerText="Panel - Hidden on dismiss"
        onDismiss={dismissPanel}
      >
        <div>
          {contentExplanation}
          <br />
          <br />
          <TextField ariaLabel={contentExplanation} />
        </div>
      </Panel>
    </div>
  );
};
