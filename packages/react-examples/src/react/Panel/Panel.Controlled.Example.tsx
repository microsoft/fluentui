import * as React from 'react';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { Panel } from '@fluentui/react/lib/Panel';
import { useBoolean } from '@fluentui/react-hooks';

export const PanelControlledExample: React.FunctionComponent = () => {
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);

  return (
    <div>
      This panel can only be closed by clicking a button inside the panel content. (Don't use this behavior unless
      absolutely necessary.)
      <br />
      <br />
      <DefaultButton text="Open panel" onClick={openPanel} />
      <Panel
        // To entirely disable the default dismiss behavior:
        // 1. Don't provide an onDismiss prop
        isOpen={isOpen} // 2. Control the visibility
        hasCloseButton={false} // 3. Hide the close button
        headerText="Controlled panel"
      >
        <p>This panel can only be closed by clicking the button below.</p>
        <DefaultButton onClick={dismissPanel} text="Close panel" />
      </Panel>
    </div>
  );
};
