import * as React from 'react';
import './Dialog.scss';

export class DialogFooter extends React.Component<any, any> {
  public render() {
    return (
      <div className='ms-Dialog-actions'>
        <div className='ms-Dialog-actionsRight'>
          { this._renderChildrenAsActions() }
        </div>
      </div>
    );
  }

  private _renderChildrenAsActions() {
    let key = 0;
    let children = this.props.children;
    if (!Array.isArray(this.props.children)) {
      children = [this.props.children];
    }
    return children.map(child =>
      <span key={ key++ } className='ms-Dialog-action'>{ child }</span>
    );
  }
}
