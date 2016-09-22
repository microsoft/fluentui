import * as React from 'react';
import { IDocumentCardProps, DocumentCardType } from './DocumentCard.Props';
import { css } from '../../utilities/css';
import './DocumentCard.scss';
import { autobind } from '../../utilities/autobind';

export class DocumentCard extends React.Component<IDocumentCardProps, any> {
  public static defaultProps: IDocumentCardProps = {
    type: DocumentCardType.normal
  };

  public render() {
    let { onClick, onClickHref, children, className, type, accentColor } = this.props;
    let actionable = (onClick || onClickHref) ? true : false;

    // Override the border color if an accent color was provided (compact card only)
    let style;
    if (type === DocumentCardType.compact && accentColor) {
      style = {
        borderBottomColor: accentColor
      };
    }

    return (
      <div
        className={
          css(
            'ms-DocumentCard',
            {
              'ms-DocumentCard--actionable': actionable,
              'ms-DocumentCard--compact': type === DocumentCardType.compact ? true : false
            },
            className
          )
        }
        onClick={ actionable ? this._onClick : null }
        style={ style }>
        { children }
      </div>
    );
  }

  @autobind
  private _onClick(ev: React.MouseEvent): void {
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
