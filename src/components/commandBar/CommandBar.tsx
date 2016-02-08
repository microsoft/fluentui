import * as React from 'react';

export interface ICommandBarProps {
}

export default class CommandBar extends React.Component<ICommandBarProps, any> {
  render() {
    let rootClass = 'ms-CommandBar';

    return (
      <div className={ rootClass }>
      </div>
    );
  }
}