import * as React from 'react';
import { IDocumentCardProps, DocumentCardType } from './DocumentCard.types';
import {
  BaseComponent,
  KeyCodes,
  css
} from '../../Utilities';
import * as stylesImport from './DocumentCard.scss';
const styles: any = stylesImport;

export class DocumentCard extends BaseComponent<IDocumentCardProps, any> {
  public static defaultProps: IDocumentCardProps = {
    type: DocumentCardType.normal
  };

  constructor(props: IDocumentCardProps) {
    super(props);

    this._warnDeprecations({
      accentColor: undefined
    });
  }

  public render() {
    const { onClick, onClickHref, children, className, type, accentColor } = this.props;
    const actionable = (onClick || onClickHref) ? true : false;

    // Override the border color if an accent color was provided (compact card only)
    let style;
    if (type === DocumentCardType.compact && accentColor) {
      style = {
        borderBottomColor: accentColor
      };
    }

    // if this element is actionable it should have an aria role
    const role = this.props.role || (actionable ? (onClick ? 'button' : 'link') : undefined);
    const tabIndex = actionable ? 0 : undefined;

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
        onKeyDown={ actionable ? this._onKeyDown : undefined }
        onClick={ actionable ? this._onClick : undefined }
        style={ style }
      >
        { children }
      </div>
    );
  }

  private _onClick = (ev: React.MouseEvent<HTMLElement>): void => {
    this._onAction(ev);
  }

  private _onKeyDown = (ev: React.KeyboardEvent<HTMLElement>): void => {
    if (ev.which === KeyCodes.enter || ev.which === KeyCodes.space) {
      this._onAction(ev);
    }
  }

  private _onAction = (ev: React.SyntheticEvent<HTMLElement>): void => {
    const { onClick, onClickHref } = this.props;

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
