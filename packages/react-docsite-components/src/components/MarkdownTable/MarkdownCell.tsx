import * as React from 'react';
import { classNamesFunction, styled } from '@fluentui/react';
import { IMarkdownTableCellProps, IMarkdownTableStyleProps, IMarkdownTableStyles } from './MarkdownTable.types';
import { getStyles } from './MarkdownTable.styles';

const getClassNames = classNamesFunction<IMarkdownTableStyleProps, IMarkdownTableStyles>();

export class MarkdownCellBase extends React.PureComponent<IMarkdownTableCellProps> {
  public render(): JSX.Element {
    const { as = 'td', children, styles, theme } = this.props;

    const classNames = getClassNames(styles, {
      theme: theme!,
    });

    const Tag = as;
    const cellClassName = (as === 'td' && classNames.td) || (as === 'th' && classNames.th) || '';

    return (
      <Tag {...this.props} className={cellClassName}>
        {children}
      </Tag>
    );
  }
}

export const MarkdownCell = styled<IMarkdownTableCellProps, IMarkdownTableStyleProps, IMarkdownTableStyles>(
  MarkdownCellBase,
  getStyles,
  undefined,
  { scope: 'MarkdownTable' },
);
