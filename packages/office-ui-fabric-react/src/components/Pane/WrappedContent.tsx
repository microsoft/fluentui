/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { BaseComponent } from '../../common/BaseComponent';

export interface IWrappedContentProps extends React.Props<WrappedContent> {
  /**
   * Optional class name to be added to the root class
   */
  className?: string;
}

export class WrappedContent extends BaseComponent<IWrappedContentProps, any> {

  public static defaultProps: IWrappedContentProps = {
    className: ''
  };

  constructor(props: IWrappedContentProps) {
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