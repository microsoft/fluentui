import * as React from 'react';

export interface IDialogProps {
}

export default class Dialog extends React.Component<IDialogProps, any> {
  render() {

    return (
      <div className='{ rootClass }'>
      I'm a dialog
      </div>
    );
  }
}