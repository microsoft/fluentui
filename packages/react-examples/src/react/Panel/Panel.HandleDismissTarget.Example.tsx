import * as React from 'react';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { Panel } from '@fluentui/react/lib/Panel';
import { useBoolean } from '@fluentui/react-hooks';

const explanation =
  'This example demonstrates detecting whether a panel was dismissed using the close button ' +
  'or using "light dismiss" (a click outside the panel area).';

export const PanelHandleDismissTargetExample: React.FunctionComponent = () => {
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);

  const onDismiss = React.useCallback(
    (ev?: React.SyntheticEvent<HTMLElement>) => {
      if (!ev) {
        console.log('Panel dismissed.');
        return;
      }

      // Demonstrates how to do different things depending on how which element dismissed the panel
      console.log('Close button clicked or light dismissed.');
      // eslint-disable-next-line deprecation/deprecation
      const srcElement = ev.nativeEvent.srcElement as Element | null;
      if (srcElement && srcElement.className.indexOf('ms-Button-icon') !== -1) {
        console.log('Close button clicked.');
      }
      if (srcElement && srcElement.className.indexOf('ms-Overlay') !== -1) {
        console.log('Light dismissed.');
      }
      dismissPanel();
    },
    [dismissPanel],
  );

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
