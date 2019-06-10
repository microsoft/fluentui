import * as React from 'react';
import { Icon } from '../../Icon';
import { IProcessedStyleSet } from '../../Styling';
import { BaseComponent, classNamesFunction } from '../../Utilities';
import { IDocumentCardLogoProps, IDocumentCardLogoStyleProps, IDocumentCardLogoStyles } from './DocumentCardLogo.types';

const getClassNames = classNamesFunction<IDocumentCardLogoStyleProps, IDocumentCardLogoStyles>();

/**
 * {@docCategory DocumentCard}
 */
export class DocumentCardLogoBase extends BaseComponent<IDocumentCardLogoProps, any> {
  private _classNames: IProcessedStyleSet<IDocumentCardLogoStyles>;

  public render() {
    const { logoIcon, styles, theme, className } = this.props;

    this._classNames = getClassNames(styles!, {
      theme: theme!,
      className
    });

    return (
      <div className={this._classNames.root}>
        <Icon iconName={logoIcon} />
      </div>
    );
  }
}
