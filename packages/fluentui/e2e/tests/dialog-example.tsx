import * as React from 'react';
import { Button, Dialog } from '@fluentui/react-northstar';

export const selectors = {
  trigger: 'trigger',
  cancelButton: 'cancelButton',
};

const DialogBlockBodyScrollExample = () => (
  <Dialog
    cancelButton={{ content: 'Close', id: selectors.cancelButton }}
    content={'dialog content'}
    header="Action confirmation"
    trigger={<Button id={selectors.trigger} content="Open a dialog" />}
  />
);

export default DialogBlockBodyScrollExample;
