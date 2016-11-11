/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { BaseComponent } from '../../common/BaseComponent';

export interface IPaneContentProps {
  /**
   * Optional class name to be added to the root class
   */
  className?: string;
}

export class PaneContent extends BaseComponent<IPaneContentProps, any> {

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