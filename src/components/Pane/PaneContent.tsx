/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

export interface IPaneContentProps extends React.Props<PaneContent>
{
  /**
   * Optional class name to be added to the root class
   */
  className?: string;
}

export class PaneContent extends React.Component<IPaneContentProps, any> {

  public static defaultProps: IPaneContentProps = {
    className: ''
  };

  constructor(props: IPaneContentProps) {
    super(props);
  }

  public render() {
    return (
      <div className={ this.props.className }>
        { this.props.children }
      </div>
    );
  }
}