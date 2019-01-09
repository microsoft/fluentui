import * as React from 'react';
import { css } from 'office-ui-fabric-react';
import { IMarkdownTableProps } from './MarkdownTable.types';
import * as styles from './MarkdownTable.module.scss';

export class MarkdownTr extends React.Component<IMarkdownTableProps> {
  public render(): JSX.Element {
    const { children, className } = this.props;
    return (
      <tr {...this.props} className={css('ms-Table-tr', styles.Tr, className)}>
        {children}
      </tr>
    );
  }
}
