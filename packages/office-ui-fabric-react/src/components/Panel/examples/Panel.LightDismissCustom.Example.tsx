import * as React from 'react';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Dialog, DialogFooter, DialogType } from 'office-ui-fabric-react/lib/Dialog';
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import { useConstCallback } from '@uifabric/react-hooks';

const explanation = 'When the user attempts to close this panel, a confirmation dialog will appear.';
const dialogContentProps = {
  type: DialogType.normal,
  title: 'Are you sure you want to close the panel?'
};
const dialogModalProps = {
  isBlocking: true,
  styles: { main: { maxWidth: 450 } }
};

export const PanelLightDismissCustomExample: React.FunctionComponent = () => {
  const [isPanelOpen, setIsPanelOpen] = React.useState(false);
  const [isDialogVisible, setIsDialogVisible] = React.useState(false);

  const openPanel = useConstCallback(() => setIsPanelOpen(true));
  const dismissPanel = useConstCallback(() => setIsPanelOpen(false));
  const showDialog = useConstCallback(() => setIsDialogVisible(true));
  const hideDialog = useConstCallback(() => setIsDialogVisible(false));
  const hideDialogAndPanel = useConstCallback(() => {
    setIsPanelOpen(false);
    setIsDialogVisible(false);
  });

  return (
    <div>
      {explanation}
      <br />
      <br />
      <DefaultButton text="Open panel" onClick={openPanel} />
      <Panel
        isOpen={isPanelOpen}
        onDismiss={dismissPanel}
        isLightDismiss={true}
        headerText="Panel with custom close behavior"
        onLightDismissClick={showDialog}
        closeButtonAriaLabel="Close"
      >
        <span>{explanation}</span>
      </Panel>
      <Dialog hidden={!isDialogVisible} onDismiss={hideDialog} dialogContentProps={dialogContentProps} modalProps={dialogModalProps}>
        <DialogFooter>
          <PrimaryButton onClick={hideDialogAndPanel} text="Yes" />
          <DefaultButton onClick={hideDialog} text="No" />
        </DialogFooter>
      </Dialog>
    </div>
  );
};
