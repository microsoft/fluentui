import * as React from 'react';

export interface IListProps {
  items?: any[];
  layoutData?: any[];
  pageSize?: number;
}

export default class List extends React.Component<IListProps, any> {
  public render() {
    let rootClass = 'ms-List';

    return (
      <div className={ rootClass }>

      </div>
    );
  }
}