import * as React from 'react';
import './List.scss';

export default class Row extends React.Component<any, any> {
  public render() {
    return (
        <button
        className='ms-Button FocusListButton-content'>
          Content for { this.props.item }
        </button>
    );
  }
}
