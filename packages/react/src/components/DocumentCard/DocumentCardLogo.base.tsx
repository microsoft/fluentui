import * as React from 'react';
import { Icon } from '../../Icon';
import { classNamesFunction, initializeComponentRef } from '../../Utilities';
import type { IProcessedStyleSet } from '../../Styling';
import type {
  IDocumentCardLogoProps,
  IDocumentCardLogoStyleProps,
  IDocumentCardLogoStyles,
} from './DocumentCardLogo.types';

const getClassNames = classNamesFunction<IDocumentCardLogoStyleProps, IDocumentCardLogoStyles>();

/**
 * {@docCategory DocumentCard}
 */
export class DocumentCardLogoBase extends React.Component<IDocumentCardLogoProps, any> {
  private _classNames: IProcessedStyleSet<IDocumentCardLogoStyles>;

  constructor(props: IDocumentCardLogoProps) {
    super(props);

    initializeComponentRef(this);
  }

  public render() {
    const { logoIcon, styles, theme, className } = this.props;

    this._classNames = getClassNames(styles!, {
      theme: theme!,
      className,
    });

    return (
      <div className={this._classNames.root}>
        <Icon iconName={logoIcon} />
      </div>
    );
  }
}
