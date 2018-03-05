import * as React from 'react';
import {
  IDialogFooterProps,
  IDialogFooterStyleProps,
  IDialogFooterStyles,
} from './DialogFooter.types';
import {
  BaseComponent,
  classNamesFunction,
  customizable,
  IClassNames
} from '../../Utilities';

const getClassNames = classNamesFunction<IDialogFooterStyleProps, IDialogFooterStyles>();

@customizable('DialogFooter', ['theme'])
export class DialogFooterBase extends BaseComponent<IDialogFooterProps, {}> {
  private _classNames: IClassNames<IDialogFooterStyles>;

<<<<<<< HEAD
  public render() {
    const {
      className,
      getStyles,
      theme
    } = this.props;

    this._classNames = getClassNames(getStyles!, {
      theme: theme!,
      className
    });

=======
export class DialogFooterBase extends BaseComponent<any, any> {
  public render(): JSX.Element {
>>>>>>> Add typedefs
    return (
      <div className={ this._classNames.actions }>
        <div className={ this._classNames.actionsRight }>
          { this._renderChildrenAsActions() }
        </div>
      </div>
    );
  }

  private _renderChildrenAsActions() {
    return React.Children.map(this.props.children, child =>
      child && <span className={ this._classNames.action }>{ child }</span>
    );
  }
}
