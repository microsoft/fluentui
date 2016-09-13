import * as React from 'react';
import { autobind } from '../../Utilities';
import { IDocumentCardLocationProps } from './DocumentCard.Props';
import './DocumentCardLocation.scss';

export class DocumentCardLocation extends React.Component<IDocumentCardLocationProps, any> {
  public render() {
    let { location, locationHref, ariaLabel } = this.props;

    return (
      <a
        className='ms-DocumentCardLocation'
        href={ locationHref }
        onClick={ this._onClick }
        aria-label={ ariaLabel }>
        { location }
      </a>
    );
  }

  @autobind
  private _onClick(ev?: React.MouseEvent) {
    let { locationHref, onClick } = this.props;

    if (!onClick && locationHref) {
      window.location.href = locationHref;
      ev.preventDefault();
      ev.stopPropagation();
    }
  }
}
