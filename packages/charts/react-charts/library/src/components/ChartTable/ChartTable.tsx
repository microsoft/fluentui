import * as React from 'react';
import { ChartTableProps } from './ChartTable.types';
import { useChartTableStyles } from './useChartTableStyles.styles';
import { useRtl } from '../../utilities/utilities';
import { ImageExportOptions } from '../../types/index';
import { toImage } from '../../utilities/image-export-utils';

export const ChartTable: React.FunctionComponent<ChartTableProps> = React.forwardRef<HTMLDivElement, ChartTableProps>(
  (props, forwardedRef) => {
    const { headers, rows, width, height } = props;
    const _isRTL: boolean = useRtl();
    const _rootElem = React.useRef<HTMLDivElement | null>(null);
    const classes = useChartTableStyles(props);

    React.useImperativeHandle(
      props.componentRef,
      () => ({
        chartContainer: _rootElem.current,
        toImage: (opts?: ImageExportOptions): Promise<string> => {
          return toImage(_rootElem.current, undefined, _isRTL, opts);
        },
      }),
      [],
    );

    if (!headers || headers.length === 0) {
      return <div>No data available</div>;
    }

    return (
      <div
        ref={el => (_rootElem.current = el)}
        className={classes.root as string}
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
                className={classes.table}
                style={{
                  width: width ? `${width}px` : '100%',
                  height: height ? `${height}px` : '650px',
                }}
              >
                <thead>
                  <tr>
                    {headers.map((header, idx) => (
                      <th key={idx} className={classes.headerCell}>
                        {header.value}
                      </th>
                    ))}
                  </tr>
                </thead>
                {rows && rows.length > 0 && (
                  <tbody>
                    {rows.map((row, rowIdx) => (
                      <tr key={rowIdx}>
                        {row.map((cell, colIdx) => (
                          <td key={colIdx} className={classes.bodyCell} style={cell.style}>
                            {cell.value}
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
  },
);

ChartTable.displayName = 'ChartTable';
