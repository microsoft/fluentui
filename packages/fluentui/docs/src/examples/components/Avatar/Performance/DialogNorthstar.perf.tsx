import * as React from 'react';
import { Button, Dialog } from '@fluentui/react-northstar';

const Scenario = () => {
  return (
    <Dialog
      open
      cancelButton="Cancel"
      confirmButton="Confirm"
      header="Action confirmation"
      trigger={<Button content="Open a dialog" />}
    />
  );
};

export default Scenario;
