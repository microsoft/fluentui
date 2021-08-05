import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';
import { useBoolean } from '@fluentui/react-hooks';

const options: IChoiceGroupOption[] = [
  { key: 'A', text: 'Option A' },
  { key: 'B', text: 'Option B' },
  { key: 'C', text: 'Option C', disabled: true },
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
        <ChoiceGroup defaultSelectedKey="B" options={options} />
        <DialogFooter>
          <PrimaryButton onClick={toggleHideDialog} text="Save" />
          <DefaultButton onClick={toggleHideDialog} text="Cancel" />
        </DialogFooter>
      </Dialog>
    </>
  );
};
