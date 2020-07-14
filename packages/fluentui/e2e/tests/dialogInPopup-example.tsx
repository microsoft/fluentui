import * as React from 'react';
import { Button, Dialog, Popup, dialogSlotClassNames } from '@fluentui/react-northstar';

export const selectors = {
  dialogCancel: 'dialog-cancel',
  dialogHeader: dialogSlotClassNames.header,
  dialogOverlay: dialogSlotClassNames.overlay,
  dialogTrigger: 'dialog-trigger',
  popupContent: 'popup-content',
  popupTrigger: 'popup-trigger',
};

const DialogInPopupExample = () => (
  <Popup
    content={
      <>
        <div id={selectors.popupContent}>Popup content</div>
        <Dialog
          cancelButton={{ content: 'Close', id: selectors.dialogCancel }}
          header="A dialog"
          trigger={<Button id={selectors.dialogTrigger} content="Open a dialog" />}
        />
      </>
    }
    trigger={<Button id={selectors.popupTrigger} content="Open a popup" />}
  />
);

export default DialogInPopupExample;
