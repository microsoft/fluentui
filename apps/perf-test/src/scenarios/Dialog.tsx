import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';

const DialogExample: React.FunctionComponent = () => {
  return (
    <Dialog
      hidden={false}
      dialogContentProps={{
        type: DialogType.normal,
        title: 'Missing Subject',
        closeButtonAriaLabel: 'Close',
        subText: 'Do you want to send this message without a subject?',
      }}
    >
      <DialogFooter>footer content</DialogFooter>
    </Dialog>
  );
};

const scenario = <DialogExample />;

export default scenario;
