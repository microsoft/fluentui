import * as React from 'react';
import { IDialogFooterProps, IDialogFooterStyleProps, IDialogFooterStyles } from './DialogFooter.types';
import { BaseComponent, classNamesFunction } from '../../Utilities';
import { IProcessedStyleSet } from '../../Styling';

const getClassNames = classNamesFunction<IDialogFooterStyleProps, IDialogFooterStyles>();

export class DialogFooterBase extends BaseComponent<IDialogFooterProps, {}> {
  private _classNames: IProcessedStyleSet<IDialogFooterStyles>;

  public render(): JSX.Element {
    const { className, styles, theme } = this.props;

    this._classNames = getClassNames(styles!, {
      theme: theme!,
      className
    });

    return (
      <div className={this._classNames.actions}>
        <div className={this._classNames.actionsRight}>{this._renderChildrenAsActions()}</div>
      </div>
    );
  }

  private _renderChildrenAsActions(): (JSX.Element | null)[] {
    return React.Children.map(this.props.children, child => (child ? <span className={this._classNames.action}>{child}</span> : null));
  }
}
