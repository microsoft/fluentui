import * as React from 'react';
import { Button, Dialog } from '@fluentui/react-northstar';

export const selectors = {
  outerClose: 'outer-close',
  outerHeader: 'outer-header',
  outerTrigger: 'outer-trigger',

  innerClose: 'inner-close',
  innerHeader: 'inner-header',
  innerTrigger: 'inner-trigger',

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
    <Dialog
      cancelButton={{ content: 'Close', id: selectors.outerClose }}
      content={
        <Dialog
          cancelButton={{ content: 'Close', id: selectors.innerClose }}
          header={{ content: 'An inner', id: selectors.innerHeader }}
          trigger={<Button id={selectors.innerTrigger} content="Open a dialog" />}
        />
      }
      header={{ content: 'An outer', id: selectors.outerHeader }}
      trigger={<Button id={selectors.outerTrigger} content="Open a dialog" />}
    />
  </>
);

export default DialogInPopupExample;
