import * as React from 'react';
import { Panel } from '@fluentui/react/lib/Panel';
import { useBoolean } from '@fluentui/react-hooks';

const handleOpen = () => console.log('onOpen');
const handleOpened = () => console.log('onOpened');

export const PanelBasicExample: React.FunctionComponent = () => {
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);

  return (
    <div>
      <button onClick={openPanel}> Open panel </button>
      <Panel
        onOpen={handleOpen}
        onOpened={handleOpened}
        headerText="Sample panel"
        isOpen={isOpen}
        onDismiss={dismissPanel}
        // You MUST provide this prop! Otherwise screen readers will just say "button" with no label.
        closeButtonAriaLabel="Close"
      >
        <p>Content goes here.</p>
      </Panel>
    </div>
  );
};
