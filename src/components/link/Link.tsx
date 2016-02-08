import * as React from 'react';

export interface IListItemProps {
}

export default class ListItem extends React.Component<IListItemProps, any> {
  render() {
    let rootClass = 'ms-ListItem';

    return (
      <div className={ rootClass }>
      </div>
    );
  }
}