import * as React from 'react';
import * as stylesImport from './Table.module.scss';
import { css } from '@fluentui/react/lib/Utilities';
const styles: any = stylesImport;

export interface ITableProps {
  content: ITableContent;
  responsive?: boolean;
}

export interface ITableContent {
  headers: string[];
  data: ITableCell[][];
}

export interface ITableCell {
  value: string;
  className?: string;
  html?: string;
}

export interface ITableState {
  currentBreakpoint?: 'mobile' | 'desktop';
}

// Set mobile breakpoint to Screen XL
const MOBILE_BREAKPOINT = 1024;

export class Table extends React.Component<ITableProps, ITableState> {
  constructor(props: ITableProps) {
    super(props);
    this.state = {};
  }

  public componentDidMount(): void {
    window.addEventListener('resize', this._handleResize);
    this._handleResize();
  }

  public componentWillUnmount(): void {
    window.removeEventListener('resize', this._handleResize);
  }

  public render(): JSX.Element {
    let { content } = this.props;
    return this.state.currentBreakpoint === 'mobile' && this.props.responsive
      ? this._renderMobile(content)
      : this._renderDesktop(content);
  }

  /**
   * Render Table cell.  Cell content is either cell's value property, or cell's html property
   * (if value is an empty string).
   */
  private _renderCell(cell: ITableCell, index: number): JSX.Element {
    return cell.value.length ? (
      <td className={cell.className} key={index}>
        {cell.value}
      </td>
    ) : (
      // eslint-disable-next-line react/no-danger
      <td className={cell.className} key={index} dangerouslySetInnerHTML={{ __html: cell.html! }} />
    );
  }

  private _renderDesktop(content: ITableContent): JSX.Element {
    return (
      <table className={styles.table}>
        <thead>
          <tr>
            {content.headers.map(heading => (
              <th key={heading}>{this._capitalizeFirstLetter(heading)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {content.data.map((row, rowIndex) => (
            <tr key={rowIndex}>{row.map((cell, cellIndex) => this._renderCell(cell, cellIndex))}</tr>
          ))}
        </tbody>
      </table>
    );
  }

  private _renderMobile(content: ITableContent): JSX.Element {
    const headers = this.props.content.headers;
    return (
      <div>
        {content.data.map((row, rowIndex) => (
          <table className={css(styles.tableMobile, styles.table)} key={rowIndex}>
            <tbody>
              {row.map((cell, cellIndex) => (
                <tr key={cellIndex}>
                  <td>{this._capitalizeFirstLetter(headers[cellIndex])}</td>
                  {this._renderCell(cell, cellIndex)}
                </tr>
              ))}
            </tbody>
          </table>
        ))}
      </div>
    );
  }

  /** Capitalize the first letter of a string */
  private _capitalizeFirstLetter(str: string): string {
    return str[0].toUpperCase() + str.slice(1);
  }

  /** Check current window size and set state if current size is different from state */
  private _handleResize = () => {
    const currBreakpoint = window.innerWidth < MOBILE_BREAKPOINT ? 'mobile' : 'desktop';

    if (this.state.currentBreakpoint !== currBreakpoint) {
      this.setState({
        currentBreakpoint: currBreakpoint,
      });
    }
  };
}
