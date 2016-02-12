import * as React from 'react';

export interface IDropdownProps {
}

export default class Dropdown extends React.Component<IDropdownProps, any> {
  render() {
    let rootClass = 'ms-Dropdown';

    return (
      <div className={ rootClass }>
      </div>
    );
  }
}