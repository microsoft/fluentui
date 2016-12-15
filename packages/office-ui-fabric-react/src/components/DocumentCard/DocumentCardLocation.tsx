import * as React from 'react';
import { IDocumentCardLocationProps } from './DocumentCard.Props';
import './DocumentCardLocation.scss';

export class DocumentCardLocation extends React.Component<IDocumentCardLocationProps, any> {
  public render() {
    let { location, locationHref, ariaLabel, onClick } = this.props;

    return (
      <a className='ms-DocumentCardLocation' href={ locationHref } onClick={ onClick } aria-label={ ariaLabel }>{ location }</a>
    );
  }
}
