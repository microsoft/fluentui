import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import { useConstCallback } from '@uifabric/react-hooks';

const explanation =
  'This panel uses "light dismiss" behavior: it can be closed by clicking or tapping ' +
  'the area outside the panel (or using the close button as usual).';

export const PanelLightDismissExample: React.FunctionComponent = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const openPanel = useConstCallback(() => setIsOpen(true));
  const dismissPanel = useConstCallback(() => setIsOpen(false));

  return (
    <div>
      {explanation}
      <br />
      <br />
      <DefaultButton text="Open panel" onClick={openPanel} />
      <Panel isLightDismiss isOpen={isOpen} onDismiss={dismissPanel} closeButtonAriaLabel="Close" headerText="Light dismiss panel">
        <span>{explanation}</span>
      </Panel>
    </div>
  );
};
