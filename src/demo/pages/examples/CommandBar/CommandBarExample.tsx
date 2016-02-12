import * as React from 'react';
import CommandBar from '../../../../components/CommandBar';

export default class CommandBarExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='CommandBarExample'>
        <h1>CommandBar</h1>
        <CommandBar />
      </div>
    );
  }

}
