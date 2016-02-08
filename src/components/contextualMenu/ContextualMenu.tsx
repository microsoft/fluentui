import * as React from 'react';

export interface IContextualMenuProps {
}

export default class ContextualMenu extends React.Component<IContextualMenuProps, any> {
  render() {
    let rootClass = 'ms-ContextualMenu';

    return (
      <div className={ rootClass }>
      </div>
    );
  }
}