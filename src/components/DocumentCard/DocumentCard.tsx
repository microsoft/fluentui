import * as React from 'react';
import './DocumentCard.scss';
import { css } from '../../utilities/css';
import { IDocumentCardProps } from './DocumentCard.Props';

export default class DocumentCard extends React.Component<IDocumentCardProps, any> {
  constructor(props: IDocumentCardProps) {
    super(props);

    this._onCardClick = this._onCardClick.bind(this);
  }

  public render() {
    let { width, onClickFunction, onClickURL, children } = this.props;
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
              'ms-DocumentCard--actionable': !!(onClickFunction || onClickURL)
            }
          )
        }
        style={ style }
        onClick={ onClickFunction || this._onCardClick }>
        { children }
      </div>
    );
  }

  private _onCardClick(ev: React.MouseEvent) {
    // TODO: This inline function should be removed and we should render a card in an A tag if it has an href.
    // And the props should have an "href" property, not "onClickURL" which is inconsistent from
    // expectations.

    let { onClickURL } = this.props;

    if (onClickURL) {
      window.location.href = this.props.onClickURL;

      ev.preventDefault();
      ev.stopPropagation();
    }
  }
}
