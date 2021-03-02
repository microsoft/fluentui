import * as React from 'react';
import { classNamesFunction, styled } from '@fluentui/react';
import { IMarkdownTableProps, IMarkdownTableStyleProps, IMarkdownTableStyles } from './MarkdownTable.types';
import { getStyles } from './MarkdownTable.styles';

const getClassNames = classNamesFunction<IMarkdownTableStyleProps, IMarkdownTableStyles>();

export class MarkdownTBodyBase extends React.PureComponent<IMarkdownTableProps> {
  public render(): JSX.Element {
    const { children, styles, theme } = this.props;

    const classNames = getClassNames(styles, {
      theme: theme!,
    });

    return (
      <tbody {...this.props} className={classNames.tbody}>
        {children}
      </tbody>
    );
  }
}

export const MarkdownTBody = styled<IMarkdownTableProps, IMarkdownTableStyleProps, IMarkdownTableStyles>(
  MarkdownTBodyBase,
  getStyles,
  undefined,
  { scope: 'MarkdownTable' },
);
