import * as React from 'react';
import { classNamesFunction, styled } from '@fluentui/react';
import { IMarkdownTableProps, IMarkdownTableStyleProps, IMarkdownTableStyles } from './MarkdownTable.types';
import { getStyles } from './MarkdownTable.styles';

const getClassNames = classNamesFunction<IMarkdownTableStyleProps, IMarkdownTableStyles>();

export class MarkdownTrBase extends React.PureComponent<IMarkdownTableProps> {
  public render(): JSX.Element {
    const { children, styles, theme } = this.props;

    const classNames = getClassNames(styles, {
      theme: theme!,
    });

    return (
      <tr {...this.props} className={classNames.tr}>
        {children}
      </tr>
    );
  }
}

export const MarkdownTr = styled<IMarkdownTableProps, IMarkdownTableStyleProps, IMarkdownTableStyles>(
  MarkdownTrBase,
  getStyles,
  undefined,
  { scope: 'MarkdownTable' },
);
