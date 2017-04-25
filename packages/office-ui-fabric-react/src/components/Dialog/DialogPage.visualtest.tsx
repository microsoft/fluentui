import * as React from 'react';
import { Dialog } from './Dialog';
import { DialogType } from './Dialog.Props';
import { DialogFooter } from './DialogFooter';
import { Button } from './../Button/index';

export default class CommandButtonVPage extends React.Component<any, any> {
  public render() {
    return <div>

      <Dialog
        isOpen={ true }
        className='Dialog'
        title='All emails together'
        subText='Your Inbox has changed.'
        isBlocking={ false }>
        <DialogFooter>
          <Button >Save</Button>
          <Button >Cancel</Button>
        </DialogFooter>
      </Dialog>
    </div>;
  }
}



