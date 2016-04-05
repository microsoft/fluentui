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
    return this.props.children.map(child => {
      return React.cloneElement(child, {
        className: child.className + ' ms-Dialog-action'
      });
    });
  }
}
