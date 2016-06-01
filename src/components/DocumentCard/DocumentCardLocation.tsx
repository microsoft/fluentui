import * as React from 'react';
import { IDocumentCardLocationProps } from './DocumentCard.Props';
import './DocumentCardLocation.scss';

export class DocumentCardLocation extends React.Component<IDocumentCardLocationProps, any> {
  public render() {
    let { location, locationHref, onClick } = this.props;

    // If no onClick Function was provided and we do have an locationHref, create a function from it.
    if (!onClick && locationHref) {
      onClick = (ev: Event) => {
        window.location.href = locationHref;
        ev.preventDefault();
        ev.stopPropagation();
      };
    }

    return (
      <a className='ms-DocumentCardLocation' href={ locationHref } onClick={ onClick }>{ location }</a>
    );
  }
}
