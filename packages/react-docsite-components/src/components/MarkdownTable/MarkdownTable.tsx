import * as React from 'react';
import { classNamesFunction, styled } from '@fluentui/react';
import { IMarkdownTableProps, IMarkdownTableStyleProps, IMarkdownTableStyles } from './MarkdownTable.types';
import { getStyles } from './MarkdownTable.styles';

const getClassNames = classNamesFunction<IMarkdownTableStyleProps, IMarkdownTableStyles>();

export class MarkdownTableBase extends React.PureComponent<IMarkdownTableProps> {
  public render(): JSX.Element {
    const { children, className, styles, theme } = this.props;

    const classNames = getClassNames(styles, {
      theme: theme!,
      className,
    });

    return (
      <div className={classNames.root}>
        <table {...this.props} className={classNames.table}>
          {children}
        </table>
      </div>
    );
  }
}

export const MarkdownTable = styled<IMarkdownTableProps, IMarkdownTableStyleProps, IMarkdownTableStyles>(
  MarkdownTableBase,
  getStyles,
  undefined,
  { scope: 'MarkdownTable' },
);
