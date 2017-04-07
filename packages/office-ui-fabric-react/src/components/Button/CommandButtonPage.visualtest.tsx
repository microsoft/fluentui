import { CommandButton } from './index';
import { IconName } from '../../Icon';

/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
export default class CommandButtonVPage extends React.Component<any, any> {
  public render() {
    return <div>
      <div style={ { backgroundColor: 'white' } }>
        <CommandButton id='CommandButton' icon="AddFriend">
          Command Button </CommandButton>
      </div >
      <div style={ { backgroundColor: 'white' } }>
        <CommandButton id='CommandButtonDisabled' icon="AddFriend" disabled={ true }>
          Command Button </CommandButton>
      </div >
    </div>;
  }
}