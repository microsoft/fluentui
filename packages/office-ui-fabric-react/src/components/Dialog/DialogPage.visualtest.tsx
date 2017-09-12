import * as React from 'react';
import { Dialog } from './Dialog';
import { DialogFooter } from './DialogFooter';
import { Button } from './../Button/index';

export default class DialogVPage extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <Dialog
          hidden={ false }
          className='Dialog'
          title='All emails together'
          subText='Your Inbox has changed.'
          isBlocking={ false }
        >
          <DialogFooter>
            <Button >Save</Button>
            <Button >Cancel</Button>
          </DialogFooter>
        </Dialog>
      </div>
    );
  }
}