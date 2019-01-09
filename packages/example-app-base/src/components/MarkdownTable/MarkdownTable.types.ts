export interface IMarkdownTableProps {
  className?: string;
  wrapperClassName?: string;
  style?: object;
}

export interface IMarkdownTableCellProps extends IMarkdownTableProps {
  /**
   * Render the table cell as a th or td.
   * @default 'td'
   */
  as: 'th' | 'td';
}
