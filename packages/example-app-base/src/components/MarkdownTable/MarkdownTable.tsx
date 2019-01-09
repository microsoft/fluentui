import * as React from 'react';
import { css } from 'office-ui-fabric-react';
import { IMarkdownTableProps } from './MarkdownTable.types';
import * as styles from './MarkdownTable.module.scss';

export class MarkdownTable extends React.Component<IMarkdownTableProps> {
  public render(): JSX.Element {
    const { children, className, wrapperClassName } = this.props;
    return (
      <div className={css('ms-MarkdownTable-wrapper', wrapperClassName)}>
        <table {...this.props} className={css('ms-MarkdownTable', styles.Table, className)}>
          {children}
        </table>
      </div>
    );
  }
}
