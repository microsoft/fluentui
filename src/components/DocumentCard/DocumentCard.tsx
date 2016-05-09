import * as React from 'react';
import './DocumentCard.scss';
import { css } from '../../utilities/css';
import { IDocumentCardProps } from './DocumentCard.Props';

export default class DocumentCard extends React.Component<IDocumentCardProps, any> {
  public render() {
    let { width, onClickFunction, onClickURL, children } = this.props;

    // If no onClickFunction was provided and we do have an onClickURL, create a function from it.
    if (!onClickFunction && onClickURL) {
      onClickFunction = function () {
        window.location.href = onClickURL;
      };
    }

    let hasOnClickFunction = onClickFunction ? true : false;

    // Set a width for the card if one was provided.
    let style;

    if (width !== undefined) {
      style = {
        width: width
      };
    }

    return (
      <div
        className={
          css(
            'ms-DocumentCard',
            {
              'ms-DocumentCard--actionable': hasOnClickFunction
            }
          )
        }
        style={ style }
        onClick={ onClickFunction }>
        { children }
      </div>
    );
  }
}
