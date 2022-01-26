import * as React from 'react';
import { classNamesFunction, initializeComponentRef } from '../../Utilities';
import type { IDialogFooterProps, IDialogFooterStyleProps, IDialogFooterStyles } from './DialogFooter.types';
import type { IProcessedStyleSet } from '../../Styling';

const getClassNames = classNamesFunction<IDialogFooterStyleProps, IDialogFooterStyles>();

export class DialogFooterBase extends React.Component<IDialogFooterProps, {}> {
  private _classNames: IProcessedStyleSet<IDialogFooterStyles>;

  constructor(props: IDialogFooterProps) {
    super(props);

    initializeComponentRef(this);
  }

  public render(): JSX.Element {
    const { className, styles, theme } = this.props;

    this._classNames = getClassNames(styles!, {
      theme: theme!,
      className,
    });

    return (
      <div className={this._classNames.actions}>
        <div className={this._classNames.actionsRight}>{this._renderChildrenAsActions()}</div>
      </div>
    );
  }

  private _renderChildrenAsActions(): (JSX.Element | null)[] | null | undefined {
    return React.Children.map(this.props.children, child =>
      child ? <span className={this._classNames.action}>{child}</span> : null,
    );
  }
}
