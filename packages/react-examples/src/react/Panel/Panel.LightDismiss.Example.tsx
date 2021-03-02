import * as React from 'react';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { Panel } from '@fluentui/react/lib/Panel';
import { useBoolean } from '@fluentui/react-hooks';

const explanation =
  'This panel uses "light dismiss" behavior: it can be closed by clicking or tapping ' +
  'the area outside the panel (or using the close button as usual).';

export const PanelLightDismissExample: React.FunctionComponent = () => {
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);

  return (
    <div>
      {explanation}
      <br />
      <br />
      <DefaultButton text="Open panel" onClick={openPanel} />
      <Panel
        isLightDismiss
        isOpen={isOpen}
        onDismiss={dismissPanel}
        closeButtonAriaLabel="Close"
        headerText="Light dismiss panel"
      >
        <p>{explanation}</p>
      </Panel>
    </div>
  );
};
