import * as React from 'react';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Dialog, DialogFooter, DialogType, IDialogContentProps } from 'office-ui-fabric-react/lib/Dialog';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { IModalProps } from 'office-ui-fabric-react/lib/Modal';
import { useBoolean } from '@uifabric/react-hooks';

export const LayerNestedLayersExample: React.FunctionComponent = () => {
  const [isDialogOpen, { setTrue: showDialog, setFalse: hideDialog }] = useBoolean(false);
  const [isPanelOpen, { setTrue: showPanel, setFalse: dismissPanel }] = useBoolean(false);

  return (
    <div>
      <DefaultButton secondaryText="Opens the Sample Panel" onClick={showPanel} text="Open Panel" />
      <Panel
        isOpen={isPanelOpen}
        type={PanelType.smallFixedFar}
        onDismiss={dismissPanel}
        headerText="This panel makes use of Layer and FocusTrapZone. Focus should be trapped in the panel."
        closeButtonAriaLabel="Close"
      >
        <DefaultButton secondaryText="Opens the Sample Dialog" onClick={showDialog} text="Open Dialog" />
        <Dialog
          hidden={!isDialogOpen}
          onDismiss={hideDialog}
          isBlocking={true}
          dialogContentProps={dialogContentProps}
          modalProps={modalProps}
        >
          <DialogFooter>
            <PrimaryButton onClick={hideDialog} text="OK" />
            <DefaultButton onClick={hideDialog} text="Cancel" />
          </DialogFooter>
        </Dialog>
      </Panel>
    </div>
  );
};

const dialogContentProps: IDialogContentProps = {
  type: DialogType.normal,
  title:
    'This dialog uses Modal, which also makes use of Layer and FocusTrapZone. Focus should be trapped in the dialog.',
  subText: "Focus will move back to the panel if you press 'OK' or 'Cancel'.",
};
const modalProps: IModalProps = {
  isBlocking: false,
  styles: { main: { maxWidth: 450 } },
};
