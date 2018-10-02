import * as React from 'react';
import { BaseComponent, css } from '../../Utilities';
import { IDocumentCardLogoProps } from './DocumentCard.types';
import { Icon } from '../../Icon';
import * as stylesImport from './DocumentCard.scss';
const styles: any = stylesImport;

export class DocumentCardLogo extends BaseComponent<IDocumentCardLogoProps, any> {
  public render(): JSX.Element {
    const { logoIcon } = this.props;

    return (
      <div className={css('ms-DocumentCardLogo', styles.logo)}>
        <Icon iconName={logoIcon} />
      </div>
    );
  }
}
