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

  render() {
    const { headers, rows, width, height, styles, theme } = this.props;

    const classNames = getClassNames(styles!, {
      theme: theme!,
    });

    if (!headers || headers.length === 0 || !rows || rows.length === 0) {
      return <div>No data available</div>;
    }

    return (
      <div ref={el => (this._rootElem = el)}>
        <svg width={width ?? '100%'} height={height ?? '650px'}>
          <foreignObject x="0" y="0" width="100%" height="100%">
            <div className={classNames.root}>
              <table className={classNames.table}>
                <thead>
                  <tr>
                    {headers.map((header, idx) => (
                      <th key={idx} className={classNames.headerCell}>
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
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
              </table>
            </div>
          </foreignObject>
        </svg>
      </div>
    );
  }
}
