import * as React from 'react';

export interface INavBarProps {
}

export default class NavBar extends React.Component<INavBarProps, any> {
  render() {
    let rootClass = 'ms-NavBar';

    return (
      <div className={ rootClass }>
      </div>
    );
  }
}