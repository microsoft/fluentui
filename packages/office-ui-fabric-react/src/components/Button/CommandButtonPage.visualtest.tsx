import { CommandButton } from './index';
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
export default class CommandButtonVPage extends React.Component<any, any> {
  public render() {
    return <div>
      <div style={ { backgroundColor: 'white' } }>
        <CommandButton id='CommandButton'
          icon='AddFriend'
          text='Command Button' />
      </div>
      <div style={ { backgroundColor: 'white' } }>
        <CommandButton id='CommandButtonDisabled' icon='AddFriend'
          disabled={ true }
          text='Command Button' />
      </div >
    </div>;
  }
}
