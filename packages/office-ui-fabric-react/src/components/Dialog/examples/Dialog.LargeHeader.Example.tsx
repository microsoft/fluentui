import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { useBoolean } from '@uifabric/react-hooks';

const options = [
  {
    key: 'A',
    text: 'Option A',
  },
  {
    key: 'B',
    text: 'Option B',
    checked: true,
  },
  {
    key: 'C',
    text: 'Option C',
    disabled: true,
  },
];
const modelProps = {
  isBlocking: false,
  styles: { main: { maxWidth: 450 } },
};
const dialogContentProps = {
  type: DialogType.largeHeader,
  title: 'All emails together',
  subText: 'Your Inbox has changed. No longer does it include favorites, it is a singular destination for your emails.',
};

export const DialogLargeHeaderExample: React.FunctionComponent = () => {
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);

  return (
    <>
      <DefaultButton secondaryText="Opens the Sample Dialog" onClick={toggleHideDialog} text="Open Dialog" />
      <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        dialogContentProps={dialogContentProps}
        modalProps={modelProps}
      >
        <ChoiceGroup options={options} />
        <DialogFooter>
          <PrimaryButton onClick={toggleHideDialog} text="Save" />
          <DefaultButton onClick={toggleHideDialog} text="Cancel" />
        </DialogFooter>
      </Dialog>
    </>
  );
};
