import { CommandButton } from './index';

/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
export default class CommandButtonVPage extends React.Component<any, any> {
  public render() {
    return <div style={ { backgroundColor: 'white' } }>
      <CommandButton id='CommandButton' > Command Button </CommandButton>
    </div >;
  }
}