import * as React from 'react';
import { IChartTableProps } from './ChartTable.types';
import { IChartTableStyleProps, IChartTableStyles } from '../../index';
import { classNamesFunction, getRTL, initializeComponentRef } from '@fluentui/react/lib/Utilities';
import { IImageExportOptions } from '../../types/index';
import { toImage } from '../../utilities/image-export-utils';

const getClassNames = classNamesFunction<IChartTableStyleProps, IChartTableStyles>();

export class ChartTableBase extends React.Component<IChartTableProps> {
  private _isRTL: boolean;
  private _rootElem: HTMLDivElement | null;

  constructor(props: IChartTableProps) {
    super(props);
    initializeComponentRef(this);
    this._isRTL = getRTL(props.theme);
  }
  public toImage = (opts?: IImageExportOptions): Promise<string> => {
    return toImage(this._rootElem, undefined, this._isRTL, opts);
  };

  public render(): JSX.Element {
    const { headers, rows, width, height, styles, theme } = this.props;

    const classNames = getClassNames(styles!, {
      theme: theme!,
    });

    if (!headers || headers.length === 0) {
      return <div>No data available</div>;
    }

    return (
      <div
        ref={el => (this._rootElem = el)}
        className={classNames.root}
        style={{ height: height ? `${height}px` : '650px', overflow: 'hidden' }}
      >
        <svg width={width ?? '100%'} height={height ?? '650px'}>
          <foreignObject x="0" y="0" width="100%" height="100%">
            <div
              style={{
                maxHeight: height ? `${height}px` : '650px',
                overflowY: 'auto',
                overflowX: 'auto',
              }}
            >
              <table
                className={classNames.table}
                style={{
                  width: width ? `${width}px` : '100%',
                }}
              >
                <thead>
                  <tr>
                    {headers.map((header, idx) => (
                      <th key={idx} className={classNames.headerCell}>
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                {rows && rows.length > 0 && (
                  <tbody>
                    {rows.map((row, rowIdx) => (
                      <tr key={rowIdx}>
                        {row.map((cell, colIdx) => (
                          <td key={colIdx} className={classNames.bodyCell}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          </foreignObject>
        </svg>
      </div>
    );
  }
}
