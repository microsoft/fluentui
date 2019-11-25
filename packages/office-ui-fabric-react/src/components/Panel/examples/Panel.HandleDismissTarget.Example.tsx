import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import { useConstCallback } from '@uifabric/react-hooks';

const explanation =
  'This example demonstrates detecting whether a panel was dismissed using the close button ' +
  'or using "light dismiss" (a click outside the panel area).';

export const PanelHandleDismissTargetExample: React.FunctionComponent = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const openPanel = useConstCallback(() => setIsOpen(true));
  const dismissPanel = useConstCallback(() => setIsOpen(false));

  const onDismiss = useConstCallback((ev?: React.SyntheticEvent<HTMLElement>) => {
    if (!ev) {
      console.log('Panel dismissed.');
      return;
    }

    // Demonstrates how to do different things depending on how which element dismissed the panel
    console.log('Close button clicked or light dismissed.');
    const srcElement = ev.nativeEvent.srcElement as Element | null;
    if (srcElement && srcElement.className.indexOf('ms-Button-icon') !== -1) {
      console.log('Close button clicked.');
    }
    if (srcElement && srcElement.className.indexOf('ms-Overlay') !== -1) {
      console.log('Light dismissed.');
    }
    dismissPanel();
  });

  return (
    <div>
      {explanation}
      <br />
      <br />
      <DefaultButton text="Open panel" onClick={openPanel} />
      <Panel
        isOpen={isOpen}
        onDismiss={onDismiss}
        headerText="Panel - Handle close button clicks or light dismissal"
        closeButtonAriaLabel="Close"
        isLightDismiss={true}
      >
        <div>
          <p>{explanation}</p>
          <p>(Check the debug console for results after dismissing the panel.)</p>
        </div>
      </Panel>
    </div>
  );
};
