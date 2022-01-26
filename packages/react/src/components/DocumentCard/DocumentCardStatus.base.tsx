import * as React from 'react';

import { classNamesFunction, initializeComponentRef } from '../../Utilities';
import { Icon } from '../../Icon';
import type {
  IDocumentCardStatusProps,
  IDocumentCardStatusStyleProps,
  IDocumentCardStatusStyles,
} from './DocumentCardStatus.types';
import type { IProcessedStyleSet } from '../../Styling';

const getClassNames = classNamesFunction<IDocumentCardStatusStyleProps, IDocumentCardStatusStyles>();

/**
 * {@docCategory DocumentCard}
 */
export class DocumentCardStatusBase extends React.Component<IDocumentCardStatusProps, any> {
  private _classNames: IProcessedStyleSet<IDocumentCardStatusStyles>;

  constructor(props: IDocumentCardStatusProps) {
    super(props);

    initializeComponentRef(this);
  }

  public render(): JSX.Element {
    const { statusIcon, status, styles, theme, className } = this.props;
    const iconProps = {
      iconName: statusIcon,
      styles: {
        root: { padding: '8px' },
      },
    };

    this._classNames = getClassNames(styles!, {
      theme: theme!,
      className,
    });

    return (
      <div className={this._classNames.root}>
        {statusIcon && <Icon {...iconProps} />}
        {status}
      </div>
    );
  }
}
