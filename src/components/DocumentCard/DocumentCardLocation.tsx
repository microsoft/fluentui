import * as React from 'react';
import { IDocumentCardLocationProps } from './DocumentCard.Props';
import './DocumentCardLocation.scss';
import { autobind } from '../../utilities/autobind';

export class DocumentCardLocation extends React.Component<IDocumentCardLocationProps, any> {
  public render() {
    let { location, locationHref, ariaLabel } = this.props;

    return (
      <a className='ms-DocumentCardLocation' href={ locationHref } onClick={ this._onClick } aria-label={ ariaLabel }>{ location }</a>
    );
  }

  @autobind
  private _onClick(ev: React.MouseEvent): void {
    let { locationHref, onClick } = this.props;

    if (onClick) {
      onClick(ev);
    } else if (!onClick && locationHref) {
      // If no onClick Function was provided and we do have an locationHref, redirect to the locationHref
      window.location.href = locationHref;
      ev.preventDefault();
      ev.stopPropagation();
    }
  }
}
