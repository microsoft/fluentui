import * as React from 'react';
import ListItem from '../../../components/listItem/ListItem';

export default class ListItemExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='ListItemExample'>
        <h1>ListItem</h1>
        <ListItem />
      </div>
    );
  }

}
