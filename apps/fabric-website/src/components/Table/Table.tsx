import * as React from 'react';
import { AnimationCell } from './AnimationCell/AnimationCell';
import * as stylesImport from './Table.module.scss';
const styles: any = stylesImport;

export interface ITableProps {
  content: any;
  isAnimation?: boolean;
  responsive?: boolean;
}

export interface ITableState {
  currentBreakpoint: string;
}

export class Table extends React.Component<ITableProps, ITableState> {
  // Set mobile breakpoint to Screen XL
  private MOBILE_BREAKPOINT = 1024;

  constructor(props: ITableProps) {
    super(props);
    this.state = {
      currentBreakpoint: ''
    };
  }

  // Set component event handler resize and bind component events
  public componentDidMount(): void {
    this._windowEventHandler = this._windowEventHandler.bind(this);
    window.addEventListener('resize', this._windowEventHandler);
    this._windowEventHandler();
  }

  public render() {
    let { content } = this.props;
    return (this.state.currentBreakpoint === 'mobile' && this.props.responsive) ? this._renderMobile(content) : this._renderDesktop(content);
  }

  // Render Table cell.  Cell content is either cell's value property, or cell's html property (if value is an empty string)
  private _renderCell(cell, index): JSX.Element {
    return (
      (cell.value.length) ?
        <td className={ cell.className } key={ index }>{ cell.value }</td> :
        <td className={ cell.className } key={ index } dangerouslySetInnerHTML={ { __html: cell.html } }></td>
    );
  }

  // Render Desktop view
  private _renderDesktop(content): JSX.Element {
    return (
      <table className={ `${styles.table} ` + (this.props.isAnimation ? 'docs_animationsTable_body' : '') }>
        <thead>
          <tr>
            {
              content.headers.map((heading, headingIndex) => (
                <th key={ headingIndex }>{ this._capitalizeFirstLetter(heading) }</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          { content.data.map((row, rowIndex) => (
            <tr key={ rowIndex }>
              {
                row.map((cell, cellIndex) => (
                  this._renderCell(cell, cellIndex)
                ))
              }
              { this.props.isAnimation && <td className={ styles.animCell }><AnimationCell data={ row } /></td> }
            </tr>
          )) }
        </tbody>
      </table>
    );
  }

  // Render Mobile view
  private _renderMobile(content): JSX.Element {
    const headers = this.props.content.headers;
    return (
      <div>
        { content.data.map((row, rowIndex) => (
          <table className={ `${styles.tableMobile} ${styles.table} ` + (this.props.isAnimation ? 'docs_animationsTable_body' : '') }
            key={ rowIndex }>
            <tbody>
              {
                row.map((cell, cellIndex) => (
                  <tr key={ cellIndex }>
                    <td>{ this._capitalizeFirstLetter(headers[cellIndex]) }</td>
                    { this._renderCell(cell, cellIndex) }
                  </tr>
                ))
              }
              { this.props.isAnimation &&
                <tr>
                  <td>Animation</td>
                  <td><AnimationCell data={ row } /></td>
                </tr>
              }
            </tbody>
          </table>
        )) }
      </div>
    );
  }

  // Capitalize the first letter of a string
  private _capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Check current window size and set state if current size is different from state
  private _windowEventHandler(): void {
    let currSize = this._getWindowSize();
    if (this.state.currentBreakpoint !== currSize) {
      this.setState({
        currentBreakpoint: currSize
      });
    }
  }

  // Check and return window size
  private _getWindowSize(): string {
    return (window.innerWidth < this.MOBILE_BREAKPOINT) ? 'mobile' : 'desktop';
  }
}
