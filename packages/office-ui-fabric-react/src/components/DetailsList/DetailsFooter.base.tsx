import * as React from 'react';
import { BaseComponent, classNamesFunction } from '../../Utilities';
import { IDetailsFooterProps, IDetailsFooterStyleProps, IDetailsFooterStyles } from './DetailsFooter.types';

const getClassNames = classNamesFunction<IDetailsFooterStyleProps, IDetailsFooterStyles>();

export class DetailsFooterBase extends BaseComponent<IDetailsFooterProps, {}> {
  public render(): JSX.Element {
    const { footerText, styles, theme } = this.props;
    const classNames = getClassNames(styles, { theme: theme! });

    if (footerText) {
      return <div className={classNames.root}>{footerText}</div>;
    }
    return <div />;
  }
}
