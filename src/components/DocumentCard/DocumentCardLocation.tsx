import * as React from 'react';
import { IDocumentCardLocationProps } from './DocumentCard.Props';
import './DocumentCardLocation.scss';

export default class DocumentCardTitle extends React.Component<IDocumentCardLocationProps, any> {
  public render() {
    let { location, locationHref } = this.props;

    return (
      <a className='ms-DocumentCardLocation' href={ locationHref }>{ location }</a>
    );
  }
}
