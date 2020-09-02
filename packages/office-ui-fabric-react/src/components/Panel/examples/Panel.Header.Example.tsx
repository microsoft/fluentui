import * as React from 'react';
import { DefaultButton, IconButton } from 'office-ui-fabric-react/lib/Button';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { Panel, IPanelProps } from 'office-ui-fabric-react/lib/Panel';
import { useConstCallback } from '@uifabric/react-hooks';
export const PanelHeaderExample: React.FunctionComponent = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const openPanel = useConstCallback(() => setIsOpen(true));
  const dismissPanel = useConstCallback(() => setIsOpen(false));

  const onRenderHeader = () => {
    return <Persona text="Clippy McClipperson" secondaryText="Helpful Sidekick" size={PersonaSize.size24} />;
  };

  return (
    <div>
      <DefaultButton text="Open panel" onClick={openPanel} />
      <Panel
        isOpen={isOpen}
        onDismiss={dismissPanel}
        onRenderHeader={onRenderHeader}
        // You MUST provide this prop! Otherwise screen readers will just say "button" with no label.
        closeButtonAriaLabel="Close"
        popupProps={{ ariaLabel: 'Clippy McClipperson' }}
      >
        <p>Content goes here.</p>
      </Panel>
    </div>
  );
};
