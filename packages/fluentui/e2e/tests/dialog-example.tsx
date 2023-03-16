import * as React from 'react';
import { Button, Dialog } from '@fluentui/react-northstar';

import { selectors } from './dialog-selectors';

const DialogBlockBodyScrollExample = () => (
  <Dialog
    cancelButton={{ content: 'Close', id: selectors.cancelButton }}
    content={'dialog content'}
    header="Action confirmation"
    trigger={<Button id={selectors.trigger} content="Open a dialog" />}
  />
);

export default DialogBlockBodyScrollExample;
