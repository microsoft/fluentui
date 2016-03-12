import * as React from 'react';
import { FocusZone } from '../../../../../index';
import './List.scss';

export default class Row extends React.Component<any, any> {
  render() {
    return (
      <FocusZone
      className="FocusListRow"
      focusNamespace="List"
      isChildZone={ true }>
        <button
        className="ms-Button FocusListButton-content"
        data-focusable-context="List">
          Content for { this.props.item }
        </button>
      </FocusZone>
    );
  }
}
