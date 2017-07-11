import * as React from 'react';
import { IDocumentCardProps, DocumentCardType } from './DocumentCard.Props';
import {
  BaseComponent,
  KeyCodes,
  autobind,
  css
} from '../../Utilities';
import * as stylesImport from './DocumentCard.scss';
const styles: any = stylesImport;

export class DocumentCard extends BaseComponent<IDocumentCardProps, any> {
  public static defaultProps: IDocumentCardProps = {
    type: DocumentCardType.normal
  };

  public render() {
    let { onClick, onClickHref, children, className, type } = this.props;
    let actionable = (onClick || onClickHref) ? true : false;

    // if this element is actionable it should have an aria role
    let role = actionable ? (onClick ? 'button' : 'link') : null;
    let tabIndex = actionable ? 0 : null;

    return (
      <div
        tabIndex={ tabIndex }
        role={ role }
        className={
          css(
            'ms-DocumentCard',
            styles.root,
            {
              ['ms-DocumentCard--actionable ' + styles.rootIsActionable]: actionable,
              ['ms-DocumentCard--compact ' + styles.rootIsCompact]: type === DocumentCardType.compact ? true : false
            },
            className
          )
        }
        onKeyDown={ actionable ? this._onKeyDown : null }
        onClick={ actionable ? this._onClick : null }>
        { children }
      </div>
    );
  }

  @autobind
  private _onClick(ev: React.MouseEvent<HTMLElement>): void {
    this._onAction(ev);
  }

  @autobind
  private _onKeyDown(ev: React.KeyboardEvent<HTMLElement>): void {
    if (ev.which === KeyCodes.enter || ev.which === KeyCodes.space) {
      this._onAction(ev);
    }
  }

  @autobind
  private _onAction(ev: React.SyntheticEvent<HTMLElement>): void {
    let { onClick, onClickHref } = this.props;

    if (onClick) {
      onClick(ev);
    } else if (!onClick && onClickHref) {
      // If no onClick Function was provided and we do have an onClickHref, redirect to the onClickHref
      window.location.href = onClickHref;
      ev.preventDefault();
      ev.stopPropagation();
    }
  }
}
