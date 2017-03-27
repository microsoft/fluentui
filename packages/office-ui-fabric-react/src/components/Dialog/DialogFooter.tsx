import * as React from 'react';
import { css } from '../../Utilities';
const styles: any = require('./Dialog.scss');

export class DialogFooter extends React.Component<any, any> {
  public render() {
    return (
      <div className={ css('ms-Dialog-actions', styles.actions) }>
        <div className={ css('ms-Dialog-actionsRight', styles.actionsRight) }>
          { this._renderChildrenAsActions() }
        </div>
      </div>
    );
  }

  private _renderChildrenAsActions() {
    return React.Children.map(this.props.children, child =>
      <span className={ css('ms-Dialog-action', styles.action) }>{ child }</span>
    );
  }
}
