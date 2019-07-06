import * as React from 'react';

import { BaseComponent, classNamesFunction } from '../../Utilities';
import { IDocumentCardStatusProps, IDocumentCardStatusStyleProps, IDocumentCardStatusStyles } from './DocumentCardStatus.types';
import { Icon } from '../../Icon';
import { IProcessedStyleSet } from '../../Styling';

const getClassNames = classNamesFunction<IDocumentCardStatusStyleProps, IDocumentCardStatusStyles>();

/**
 * {@docCategory DocumentCard}
 */
export class DocumentCardStatusBase extends BaseComponent<IDocumentCardStatusProps, any> {
  private _classNames: IProcessedStyleSet<IDocumentCardStatusStyles>;

  public render(): JSX.Element {
    const { statusIcon, status, styles, theme, className } = this.props;
    const iconProps = {
      iconName: statusIcon,
      styles: {
        root: { padding: '8px' }
      }
    };

    this._classNames = getClassNames(styles!, {
      theme: theme!,
      className
    });

    return (
      <div className={this._classNames.root}>
        {statusIcon && <Icon {...iconProps} />}
        {status}
      </div>
    );
  }
}
