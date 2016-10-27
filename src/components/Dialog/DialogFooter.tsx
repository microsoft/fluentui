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
    return React.Children.map(this.props.children, child =>
      <span className='ms-Dialog-action'>{ child }</span>
    );
  }
}
