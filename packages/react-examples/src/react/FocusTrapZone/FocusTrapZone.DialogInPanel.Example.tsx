import * as React from 'react';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import { useBoolean } from '@fluentui/react-hooks';

const dialogContentProps = {
  type: DialogType.normal,
  title: 'This dialog also makes use of FocusTrapZone. Focus should be trapped in the dialog.',
  subText: "Focus will move back to the panel if you press 'OK' or 'Cancel'.",
};

const modelProps = {
  titleAriaId: 'myLabelId',
  subtitleAriaId: 'mySubTextId',
  isBlocking: false,
  styles: { main: { maxWidth: 450 } },
};

export const FocusTrapZoneDialogInPanelExample: React.FunctionComponent = () => {
  const [showPanel, { toggle: toggleShowPanel }] = useBoolean(false);
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  return (
    <div>
      <DefaultButton text="Open Panel" secondaryText="Opens the Sample Panel" onClick={toggleShowPanel} />
      <Panel
        isOpen={showPanel}
        type={PanelType.smallFixedFar}
        onDismiss={toggleShowPanel}
        headerText="This panel makes use of FocusTrapZone. Focus should be trapped in the panel."
        closeButtonAriaLabel="Close"
      >
        <DefaultButton text="Open Dialog" secondaryText="Opens the Sample Dialog" onClick={toggleHideDialog} />
        <Dialog
          hidden={hideDialog}
          onDismiss={toggleHideDialog}
          isBlocking
          dialogContentProps={dialogContentProps}
          modalProps={modelProps}
        >
          <DialogFooter>
            <PrimaryButton onClick={toggleHideDialog} text="OK" />
            <DefaultButton onClick={toggleHideDialog} text="Cancel" />
          </DialogFooter>
        </Dialog>
      </Panel>
    </div>
  );
};
