import * as React from 'react';
import { classNamesFunction, initializeComponentRef } from '../../Utilities';
import type {
  IDocumentCardDetailsProps,
  IDocumentCardDetailsStyleProps,
  IDocumentCardDetailsStyles,
} from './DocumentCardDetails.types';
import type { IProcessedStyleSet } from '../../Styling';

const getClassNames = classNamesFunction<IDocumentCardDetailsStyleProps, IDocumentCardDetailsStyles>();

/**
 * {@docCategory DocumentCard}
 */
export class DocumentCardDetailsBase extends React.Component<IDocumentCardDetailsProps, any> {
  private _classNames: IProcessedStyleSet<IDocumentCardDetailsStyles>;

  constructor(props: IDocumentCardDetailsProps) {
    super(props);

    initializeComponentRef(this);
  }

  public render(): JSX.Element {
    const { children, styles, theme, className } = this.props;

    this._classNames = getClassNames(styles!, {
      theme: theme!,
      className,
    });

    return <div className={this._classNames.root}>{children}</div>;
  }
}
