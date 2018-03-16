/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import {
  BaseComponent,
  autobind,
  css
} from '../../Utilities';
import { IDocumentCardStatusProps } from './DocumentCard.types';
import * as stylesImport from './DocumentCard.scss';
import { Icon } from '../../Icon';
const styles: any = stylesImport;

export class DocumentCardStatus extends BaseComponent<IDocumentCardStatusProps, any> {
  constructor(props: IDocumentCardStatusProps) {
    super(props);
  }

  public render() {
    const { statusIcon, status } = this.props;

    return (
      <div className={ css('ms-DocumentCardStatus', styles.status) }>
        { statusIcon && <Icon iconName={ statusIcon } /> }
        { status }
      </div>
    );
  }
}
