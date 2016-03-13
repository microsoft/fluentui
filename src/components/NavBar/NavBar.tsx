import * as React from 'react';

export interface INavBarProps {
}

export default class NavBar extends React.Component<INavBarProps, any> {
  public render() {
    let rootClass = 'ms-NavBar';

    return (
      <div className={ rootClass }>
      </div>
    );
  }
}
