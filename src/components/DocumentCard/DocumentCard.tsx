import * as React from 'react';
import { IDocumentCardProps, DocumentCardType } from './DocumentCard.Props';
import { css } from '../../utilities/css';
import './DocumentCard.scss';

export class DocumentCard extends React.Component<IDocumentCardProps, any> {
  public static defaultProps: IDocumentCardProps = {
    type: DocumentCardType.normal
  };

  public render() {
    let { onClick, onClickHref, children, className, type, accentColor } = this.props;
    // If no onClickFunction was provided and we do have an onClickURL, create a function from it.
    if (!onClick && onClickHref) {
      onClick = () => {
        window.location.href = onClickHref;
      };
    }

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
              'ms-DocumentCard--actionable': onClick ? true : false,
              'ms-DocumentCard--compact': type === DocumentCardType.compact ? true : false
            },
            className
          )
        }
        onClick={ onClick }
        style={ style }>
        { children }
      </div>
    );
  }
}
