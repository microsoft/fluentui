import * as React from 'react';

import { BaseComponent, classNamesFunction } from '../../Utilities';
import { IDocumentCardDetailsProps, IDocumentCardDetailsStyleProps, IDocumentCardDetailsStyles } from './DocumentCardDetails.types';
import { IProcessedStyleSet } from '../../Styling';

const getClassNames = classNamesFunction<IDocumentCardDetailsStyleProps, IDocumentCardDetailsStyles>();

/**
 * {@docCategory DocumentCard}
 */
export class DocumentCardDetailsBase extends BaseComponent<IDocumentCardDetailsProps, any> {
  private _classNames: IProcessedStyleSet<IDocumentCardDetailsStyles>;

  public render(): JSX.Element {
    const { children, styles, theme, className } = this.props;

    this._classNames = getClassNames(styles!, {
      theme: theme!,
      className
    });

    return <div className={this._classNames.root}>{children}</div>;
  }
}
