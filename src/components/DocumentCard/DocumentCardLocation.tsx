import * as React from 'react';
import { IDocumentCardLocationProps } from './DocumentCard.Props';
import './DocumentCardLocation.scss';

export default class DocumentCardTitle extends React.Component<IDocumentCardLocationProps, any> {
  public render() {
    let { location, locationURL } = this.props;

    return (
      <a className='ms-DocumentCard-location' href={ locationURL }>{ location }</a>
    );
  }
}
