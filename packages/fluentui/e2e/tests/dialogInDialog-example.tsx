import * as React from 'react';
import { Button, Dialog } from '@fluentui/react-northstar';

export const selectors = {
  outerClose: 'outer-close',
  outerHeader: 'outer-header',
  outerTrigger: 'outer-trigger',
  outerOverlay: 'outer-overlay',

  innerClose: 'inner-close',
  innerHeader: 'inner-header',
  innerTrigger: 'inner-trigger',
  innerOverlay: 'inner-overlay',
};

const DialogInPopupExample = () => (
  <Dialog
    cancelButton={{ content: 'Close', id: selectors.outerClose }}
    content={
      <Dialog
        cancelButton={{ content: 'Close', id: selectors.innerClose }}
        header={{ content: 'An inner', id: selectors.innerHeader }}
        overlay={{ id: selectors.innerOverlay }}
        trigger={<Button id={selectors.innerTrigger} content="Open a dialog" />}
      />
    }
    header={{ content: 'An outer', id: selectors.outerHeader }}
    overlay={{ id: selectors.outerOverlay }}
    trigger={<Button id={selectors.outerTrigger} content="Open a dialog" />}
  />
);

export default DialogInPopupExample;
