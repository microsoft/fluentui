import * as React from 'react';
import { Dialog, DialogType, DialogFooter, IDialogContentProps } from '@fluentui/react/lib/Dialog';

const dialogContentProps: IDialogContentProps = {
  type: DialogType.normal,
  title: 'Missing Subject',
  closeButtonAriaLabel: 'Close',
  subText: 'Do you want to send this message without a subject?',
};

const Scenario: React.FunctionComponent = () => {
  return (
    <Dialog hidden={false} dialogContentProps={dialogContentProps}>
      <DialogFooter>Dialog Footer</DialogFooter>
    </Dialog>
  );
};

export default Scenario;
