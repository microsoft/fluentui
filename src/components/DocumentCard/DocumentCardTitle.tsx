import * as React from 'react';
import { IDocumentCardTitleProps } from './DocumentCard.Props';
import './DocumentCardTitle.scss';

export default class DocumentCardTitle extends React.Component<IDocumentCardTitleProps, any> {
  public render() {
    let { title } = this.props;

    return (
      <div className='ms-DocumentCard-title'>{ title }</div>
    );
  }
}
