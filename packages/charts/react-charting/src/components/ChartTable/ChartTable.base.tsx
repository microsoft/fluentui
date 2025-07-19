import * as React from 'react';
import { IChartTableProps } from './ChartTable.types';
import { IChartTableStyleProps, IChartTableStyles } from '../../index';
import { classNamesFunction, getRTL, initializeComponentRef } from '@fluentui/react/lib/Utilities';
import { IImageExportOptions } from '../../types/index';
import { toImage } from '../../utilities/image-export-utils';
import * as d3 from 'd3-color';
import { getColorContrast } from '../../utilities/colors';
import { ITheme } from '@fluentui/react';

function invertHexColor(hex: string, theme: ITheme): string {
  const color = d3.color(hex);
  if (!color) {
    return theme.semanticColors.bodyText!;
  }
  const rgb = color.rgb();
  return d3.rgb(255 - rgb.r, 255 - rgb.g, 255 - rgb.b).formatHex();
}

function getSafeTextColor(theme: ITheme, foreground?: string, background?: string): string {
  const fallbackColor = theme.semanticColors.bodyText!;
  const fallbackBg = theme.semanticColors.bodyBackground!;

  const fg = d3.color(foreground || fallbackColor)!;
  const bg = d3.color(background || fallbackBg)!;
  const contrast = getColorContrast(fg.formatHex(), bg.formatHex());
  if (contrast >= 3) {
    return fg.formatHex();
  }

  const inverted = invertHexColor(fg.formatHex(), theme);
  const invertedContrast = getColorContrast(inverted, bg.formatHex());
  return invertedContrast >= 3 ? inverted : fallbackColor;
}

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

  // eslint-disable-next-line @typescript-eslint/no-deprecated
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
        <svg width={width ?? '100%'} height={height ?? '650px'} className={classNames.chart}>
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
                    {headers.map((header, idx) => {
                      const style = { ...header?.style };
                      const fg = style.color;
                      const bg = style.backgroundColor;
                      if (fg || bg) {
                        style.color = getSafeTextColor(theme!, fg, bg);
                      }
                      return (
                        <th key={idx} className={classNames.headerCell} style={style}>
                          {header.value}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                {rows && rows.length > 0 && (
                  <tbody>
                    {rows.map((row, rowIdx) => (
                      <tr key={rowIdx}>
                        {row.map((cell, colIdx) => {
                          const style = { ...cell?.style };
                          const fg = style.color;
                          const bg = style.backgroundColor;
                          if (fg || bg) {
                            style.color = getSafeTextColor(theme!, fg, bg);
                          }
                          return (
                            <td key={colIdx} className={classNames.bodyCell} style={style}>
                              {cell.value}
                            </td>
                          );
                        })}
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
