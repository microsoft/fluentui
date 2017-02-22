import * as React from 'react';
import { css } from '../../Utilities';
import { IDocumentCardLocationProps } from './DocumentCard.Props';
import styles from './DocumentCardLocation.scss';

export class DocumentCardLocation extends React.Component<IDocumentCardLocationProps, any> {
  public render() {
    let { location, locationHref, ariaLabel, onClick } = this.props;

    return (
      <a className={ css('ms-DocumentCardLocation', styles.root) }
        href={ locationHref } onClick={ onClick } aria-label={ ariaLabel }>{ location }</a>
    );
  }
}
