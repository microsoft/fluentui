import * as React from 'react';
import { css } from '../../Utilities';
import { IDocumentCardLocationProps } from './DocumentCard.Props';
const styles: any = require('./DocumentCard.scss');

export class DocumentCardLocation extends React.Component<IDocumentCardLocationProps, any> {
  public render() {
    let { location, locationHref, ariaLabel, onClick } = this.props;

    return (
      <a className={ css('ms-DocumentCardLocation', styles.location) }
        href={ locationHref } onClick={ onClick } aria-label={ ariaLabel }>{ location }</a>
    );
  }
}
