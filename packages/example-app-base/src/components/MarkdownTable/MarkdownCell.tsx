import * as React from 'react';
import { css } from 'office-ui-fabric-react';
import { IMarkdownTableCellProps } from './MarkdownTable.types';
import * as styles from './MarkdownTable.module.scss';

export class MarkdownCell extends React.Component<IMarkdownTableCellProps> {
  public static defaultProps = {
    as: 'td'
  };

  public render(): JSX.Element {
    const { as, children, className } = this.props;
    const Tag = as;
    const cellClassName = (as === 'td' && styles.Td) || (as === 'th' && styles.Th);

    return (
      <Tag {...this.props} className={css('ms-Table-td', cellClassName, className)}>
        {children}
      </Tag>
    );
  }
}
