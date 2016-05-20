import * as React from 'react';

export interface IPivotItemProps extends React.HTMLProps<PivotItem> {
  linkText: string;
}

export class PivotItem extends React.Component<IPivotItemProps, any> {

  public render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
