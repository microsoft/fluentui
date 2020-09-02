import * as React from 'react';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Dialog, DialogFooter, DialogType } from 'office-ui-fabric-react/lib/Dialog';
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import { useConstCallback } from '@uifabric/react-hooks';

const explanation =
  'If this panel is closed using light dismiss (clicking outside the panel), a confirmation dialog will appear.';
const dialogContentProps = {
  type: DialogType.normal,
  title: 'Are you sure you want to close the panel?',
};
const dialogModalProps = {
  isBlocking: true,
  styles: { main: { maxWidth: 450 } },
};

export const PanelLightDismissCustomExample: React.FunctionComponent = () => {
  const [isPanelOpen, setIsPanelOpen] = React.useState(false);
  const [isDialogVisible, setIsDialogVisible] = React.useState(false);

  const openPanel = useConstCallback(() => setIsPanelOpen(true));
  const dismissPanel = useConstCallback(() => setIsPanelOpen(false));
  const showDialog = useConstCallback(() => setIsDialogVisible(true));
  const hideDialog = useConstCallback(ev => {
    ev.preventDefault();
    setIsDialogVisible(false);
  });
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
        isLightDismiss={true}
        // Use this prop to do special handling *only* for light dismiss.
        // If you provide this, the normal onDismiss won't be called for light dismiss.
        onLightDismissClick={showDialog}
        onDismiss={dismissPanel}
        headerText="Panel with custom light dismiss behavior"
        closeButtonAriaLabel="Close"
      >
        <p>{explanation}</p>
      </Panel>
      <Dialog
        hidden={!isDialogVisible}
        onDismiss={hideDialog}
        dialogContentProps={dialogContentProps}
        modalProps={dialogModalProps}
      >
        <DialogFooter>
          <PrimaryButton onClick={hideDialogAndPanel} text="Yes" />
          <DefaultButton onClick={hideDialog} text="No" />
        </DialogFooter>
      </Dialog>
    </div>
  );
};
