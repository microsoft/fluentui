import * as React from 'react';
import List from '../../../../components/List';

export default class ListExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='ListExample'>
        <h1>List</h1>
        <List />
      </div>
    );
  }

}
