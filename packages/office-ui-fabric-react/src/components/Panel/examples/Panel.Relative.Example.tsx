import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { useConstCallback } from '@uifabric/react-hooks';

const explanation =
  'This panel takes its father element instead of the "body" element as container, ' +
  'so the overlay only blocks interaction with partial view.';

export const PanelRelativeExample: React.FunctionComponent = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const openPanel = useConstCallback(() => setIsOpen(true));
  const dismissPanel = useConstCallback(() => setIsOpen(false));
  const containerStyle = { height: 300 };

  return (
    <div style={containerStyle}>
      {explanation}
      <br />
      <br />
      <DefaultButton text="Open panel" onClick={openPanel} />
      <Panel
        headerText="Sample panel"
        isOpen={isOpen}
        onDismiss={dismissPanel}
        type={PanelType.samllRelativeFar}
        // You MUST provide this prop! Otherwise screen readers will just say "button" with no label.
        closeButtonAriaLabel="Close"
      >
        <span>Content goes here.</span>
      </Panel>
    </div>
  );
};
