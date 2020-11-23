import * as React from 'react';
import { classNamesFunction, styled } from '@fluentui/react';
import { IMarkdownTableProps, IMarkdownTableStyleProps, IMarkdownTableStyles } from './MarkdownTable.types';
import { getStyles } from './MarkdownTable.styles';

const getClassNames = classNamesFunction<IMarkdownTableStyleProps, IMarkdownTableStyles>();

export class MarkdownTHeadBase extends React.PureComponent<IMarkdownTableProps> {
  public render(): JSX.Element {
    const { children, styles, theme } = this.props;

    const classNames = getClassNames(styles, {
      theme: theme!,
    });

    return (
      <thead {...this.props} className={classNames.thead}>
        {children}
      </thead>
    );
  }
}

export const MarkdownTHead = styled<IMarkdownTableProps, IMarkdownTableStyleProps, IMarkdownTableStyles>(
  MarkdownTHeadBase,
  getStyles,
  undefined,
  { scope: 'MarkdownTable' },
);
