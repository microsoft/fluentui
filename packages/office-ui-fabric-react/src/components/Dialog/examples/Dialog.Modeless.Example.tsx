import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { ContextualMenu } from 'office-ui-fabric-react/lib/ContextualMenu';
import { useBoolean } from '@uifabric/react-hooks';

const modalPropsStyles = { main: { maxWidth: 450 } };
const dragOptions = {
  moveMenuItemText: 'Move',
  closeMenuItemText: 'Close',
  menu: ContextualMenu,
};
const dialogContentProps = {
  type: DialogType.normal,
  title: 'Missing Subject',
  subText: 'Do you want to send this message without a subject?',
};

export const DialogModelessExample: React.FunctionComponent = () => {
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const [isDraggable, { toggle: toggleIsDraggable }] = useBoolean(false);
  const modalProps = React.useMemo(
    () => ({
      styles: modalPropsStyles,
      isModeless: true,
      dragOptions: isDraggable ? dragOptions : undefined,
    }),
    [isDraggable],
  );
  return (
    <>
      <input type="text" placeholder="Focus Me While Open" />
      <div>
        <Toggle label="Is draggable" onChange={toggleIsDraggable} checked={isDraggable} disabled={!hideDialog} />
        <DefaultButton secondaryText="Opens the Sample Dialog" onClick={toggleHideDialog} text="Open Dialog" />
        <DefaultButton secondaryText="Closes the Sample Dialog" onClick={toggleHideDialog} text="Close Dialog" />
      </div>
      <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        dialogContentProps={dialogContentProps}
        modalProps={modalProps}
      >
        <DialogFooter>
          <PrimaryButton onClick={toggleHideDialog} text="Send" />
          <DefaultButton onClick={toggleHideDialog} text="Don't send" />
        </DialogFooter>
      </Dialog>
    </>
  );
};
