import * as React from 'react';
import { Button, Dialog } from '@fluentui/react-northstar';

export const selectors = {
  outerClose: 'outer-close',
  outerTrigger: 'outer-trigger',
  innerClose: 'inner-close',
  innerTrigger: 'inner-trigger',
};

const DialogBlockBodyScrollExample = () => (
  <Dialog
    cancelButton={{ content: 'Close', id: selectors.outerClose }}
    content={
      <Dialog
        cancelButton={{ content: 'Close', id: selectors.innerClose }}
        header={{ content: 'An inner' }}
        trigger={<Button id={selectors.innerTrigger} content="Open a dialog" />}
      />
    }
    header={{ content: 'An outer' }}
    trigger={<Button id={selectors.outerTrigger} content="Open a dialog" />}
  />
);

export default DialogBlockBodyScrollExample;
