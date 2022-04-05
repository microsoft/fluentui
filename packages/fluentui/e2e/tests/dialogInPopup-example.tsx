import * as React from 'react';
import { Button, Dialog, Popup, dialogSlotClassNames } from '@fluentui/react-northstar';

export const selectors = {
  dialogCancel: 'dialog-cancel',
  dialogHeader: dialogSlotClassNames.header,
  dialogTrigger: 'dialog-trigger',
  popupContent: 'popup-content',
  popupTrigger: 'popup-trigger',
  overlayPoint: 'overlay-point',
};

const DialogInPopupExample = () => (
  <>
    <div
      id={selectors.overlayPoint}
      style={{
        pointerEvents: 'none',
        position: 'fixed',
        top: 10,
        left: 10,
        border: '3px solid green',
        zIndex: 1000000,
      }}
    >
      Overlay close
    </div>
    <div style={{ margin: 100 }}>
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
    </div>
  </>
);

export default DialogInPopupExample;
