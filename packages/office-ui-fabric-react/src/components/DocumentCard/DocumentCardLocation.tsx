import * as React from 'react';
import { BaseComponent, css } from '../../Utilities';
import { IDocumentCardLocationProps } from './DocumentCard.types';
import * as stylesImport from './DocumentCard.scss';
const styles: any = stylesImport;

export class DocumentCardLocation extends BaseComponent<IDocumentCardLocationProps, any> {
  public render(): JSX.Element {
    const { location, locationHref, ariaLabel, onClick } = this.props;

    return (
      <a className={css('ms-DocumentCardLocation', styles.location)} href={locationHref} onClick={onClick} aria-label={ariaLabel}>
        {location}
      </a>
    );
  }
}
