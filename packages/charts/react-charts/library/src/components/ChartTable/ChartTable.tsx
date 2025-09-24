import * as React from 'react';
import { ChartTableProps } from './ChartTable.types';
import { useChartTableStyles } from './useChartTableStyles.styles';
import { useRtl } from '../../utilities/utilities';
import { ImageExportOptions } from '../../types/index';
import { toImage } from '../../utilities/image-export-utils';
import { tokens } from '@fluentui/react-theme';
import * as d3 from 'd3-color';
import { getColorContrast } from '../../utilities/colors';
import { ThemeContext_unstable as V9ThemeContext } from '@fluentui/react-shared-contexts';
import { Theme, webLightTheme } from '@fluentui/tokens';

function invertHexColor(hex: string): string {
  const color = d3.color(hex);
  if (!color) {
    return tokens.colorNeutralForeground1!;
  }
  const rgb = color.rgb();
  return d3.rgb(255 - rgb.r, 255 - rgb.g, 255 - rgb.b).formatHex();
}

function getSafeBackgroundColor(v9Theme: Theme, foreground?: string, background?: string): string {
  const fallbackFg = v9Theme.colorNeutralForeground1;
  const fallbackBg = v9Theme.colorNeutralBackground1;

  const fg = d3.color(foreground || fallbackFg);
  const bg = d3.color(background || fallbackBg);
  if (!fg || !bg) {
    return fallbackBg;
  }
  const contrast = getColorContrast(fg.formatHex(), bg.formatHex());
  if (contrast >= 3) {
    return bg.formatHex();
  }

  const invertedBg = invertHexColor(bg.formatHex());
  const invertedContrast = getColorContrast(fg.formatHex(), invertedBg);
  return invertedContrast >= 3 ? invertedBg : fallbackBg;
}

export const ChartTable: React.FunctionComponent<ChartTableProps> = React.forwardRef<HTMLDivElement, ChartTableProps>(
  (props, forwardedRef) => {
    const parentV9Theme = React.useContext(V9ThemeContext) as Theme;
    const v9Theme: Theme = parentV9Theme ? parentV9Theme : webLightTheme;
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

    const bgColorSet = new Set<string>();
    headers.forEach(header => {
      const bg = header?.style?.backgroundColor;
      const normalized = d3.color(bg || '')?.formatHex();
      if (normalized) {
        bgColorSet.add(normalized);
      }
    });
    let sharedBackgroundColor: string | undefined;
    let useSharedBackground = false;

    /*
    If we have only one or two unique background colors, we can consider using a shared background color
    for the table headers. This is to ensure better contrast with the foreground text.
    For size 1, we will consider that as default color if it satisfies the contrast ratio.
    There could also be a scenario where backgroundcolor array is of size 2, for eg: ["dimsgray", "gray"],
    which will assign 1st column header bg color to dimsgray and rest to gray. so our logic of shared background
    color won't run here. So will consider for size 2 as well.
    For size greater than this, we will consider that user wants different colors and will let color contrast fail
    if any.
    */
    if (bgColorSet.size === 1 || bgColorSet.size === 2) {
      const candidateBg = bgColorSet.size === 1 ? Array.from(bgColorSet)[0] : Array.from(bgColorSet)[1];
      for (const header of headers) {
        const fg = header?.style?.color;
        if (fg && getColorContrast(fg, candidateBg) >= 3) {
          sharedBackgroundColor = candidateBg;
          useSharedBackground = true;
          break;
        }
      }
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
                }}
              >
                <thead>
                  <tr>
                    {headers.map((header, idx) => {
                      const style = { ...header?.style };
                      const fg = style.color;
                      const bg = style.backgroundColor;

                      if (useSharedBackground) {
                        style.backgroundColor = sharedBackgroundColor;
                      } else if (fg || bg) {
                        style.backgroundColor = getSafeBackgroundColor(v9Theme, fg, bg);
                      }
                      return (
                        <th key={idx} className={classes.headerCell} style={style} tabIndex={0}>
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
                            style.backgroundColor = getSafeBackgroundColor(v9Theme, fg, bg);
                          }
                          return (
                            <td key={colIdx} className={classes.bodyCell} style={style} tabIndex={0}>
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
  },
);

ChartTable.displayName = 'ChartTable';
