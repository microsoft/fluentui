import * as React from 'react';
import { color as d3Color } from 'd3-color';
import type { PieColors, Color, PlotData, Layout } from '@fluentui/chart-utilities';
import { isArrayOrTypedArray } from '@fluentui/chart-utilities';
import { areArraysEqual } from '../../utilities/utilities';
import { DataVizPalette, getColorFromToken, getNextColor } from '../../utilities/colors';
import { scaleLinear as d3ScaleLinear } from 'd3-scale';

type PlotlyColorway = 'plotly' | 'others';

// The color sequences in plotly express are defined here:
// https://plotly.com/python/discrete-color/#:~:text=Join%20now.-,Color%20Sequences%20in%20Plotly%20Express,-By%20default%2C%20Plotly
export type ColorwayType = 'default' | 'builtin' | 'others' | undefined;

const DEFAULT_PLOTLY_COLORWAY = [
  '#636efa', //1
  '#ef553b', //2
  '#00cc96', //3
  '#ab63fa', //4
  '#ffa15a', //5
  '#19d3f3', //6
  '#ff6692', //7
  '#b6e880', //8
  '#ff97ff', //9
  '#fecb52', //10
];

const PLOTLY_FLUENTVIZ_COLORWAY_MAPPING = [
  DataVizPalette.color1, //1
  DataVizPalette.warning, //2
  DataVizPalette.color8, //3
  DataVizPalette.color4, //4
  DataVizPalette.color7, //5
  DataVizPalette.color6, //6
  DataVizPalette.color2, //7
  DataVizPalette.color5, //8
  DataVizPalette.color9, //9
  DataVizPalette.color10, //10
];

function getPlotlyColorway(colorway: string[] | undefined): PlotlyColorway {
  const isPlotlyColorway =
    isArrayOrTypedArray(colorway) &&
    areArraysEqual(
      colorway?.map(c => c.toLowerCase()),
      DEFAULT_PLOTLY_COLORWAY,
    );

  return isPlotlyColorway ? 'plotly' : 'others';
}

function tryMapFluentDataViz(hexColor: string, templateColorway: PlotlyColorway, isDarkTheme?: boolean): string {
  if (templateColorway !== 'plotly') {
    return hexColor;
  }
  const index = DEFAULT_PLOTLY_COLORWAY.indexOf(hexColor.toLowerCase());
  if (index !== -1) {
    return getColorFromToken(PLOTLY_FLUENTVIZ_COLORWAY_MAPPING[index], isDarkTheme);
  }
  return hexColor;
}

export const getColor = (
  legendLabel: string,
  colorMap: React.MutableRefObject<Map<string, string>>,
  isDarkTheme?: boolean,
): string => {
  if (!colorMap.current.has(legendLabel)) {
    let nextColor: string;
    if (colorMap.current.size < PLOTLY_FLUENTVIZ_COLORWAY_MAPPING.length) {
      // Get first 10 colors from plotly-fluentviz colorway mapping
      nextColor = getColorFromToken(PLOTLY_FLUENTVIZ_COLORWAY_MAPPING[colorMap.current.size], isDarkTheme);
    } else {
      nextColor = getNextColor(colorMap.current.size, 0, isDarkTheme);
    }
    colorMap.current.set(legendLabel, nextColor);
    return nextColor;
  }

  return colorMap.current.get(legendLabel) as string;
};

export const getSchemaColors = (
  colorway: string[] | undefined,
  colors: PieColors | Color | Color[] | string | null | undefined,
  colorMap: React.MutableRefObject<Map<string, string>>,
  isDarkTheme?: boolean,
): string[] | string | undefined => {
  const hexColors: string[] = [];
  if (!colors) {
    return undefined;
  }
  const templateColorway = getPlotlyColorway(colorway);
  if (isArrayOrTypedArray(colors)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (colors as any[]).forEach((element, index) => {
      const colorString = element?.toString().trim();
      const nextFluentColor = getColor(`Label_${index}`, colorMap, isDarkTheme);
      if (colorString) {
        const parsedColor = d3Color(colorString);
        hexColors.push(
          parsedColor ? tryMapFluentDataViz(parsedColor.formatHex(), templateColorway, isDarkTheme) : nextFluentColor,
        );
      } else {
        hexColors.push(nextFluentColor);
      }
    });
  } else if (typeof colors === 'string') {
    const parsedColor = d3Color(colors);
    return parsedColor
      ? tryMapFluentDataViz(parsedColor.formatHex(), templateColorway, isDarkTheme)
      : getColor('Label_0', colorMap, isDarkTheme);
  }
  return hexColors;
};

export const extractColor = (
  colorway: string[] | undefined,
  colorwayType: ColorwayType,
  colors: PieColors | Color | Color[] | string | null | undefined,
  colorMap: React.MutableRefObject<Map<string, string>>,
  isDarkTheme?: boolean,
): string | string[] | undefined => {
  return colorwayType === 'default' && colors ? getSchemaColors(colorway, colors, colorMap, isDarkTheme) : undefined;
};

export const resolveColor = (
  extractedColors: string[] | string | null | undefined,
  index: number,
  legend: string,
  colorMap: React.MutableRefObject<Map<string, string>>,
  isDarkTheme?: boolean,
): string => {
  let color = '';
  if (extractedColors && isArrayOrTypedArray(extractedColors) && extractedColors.length > 0) {
    color = extractedColors[index % extractedColors.length];
  } else if (typeof extractedColors === 'string') {
    color = extractedColors;
  } else {
    color = getColor(legend, colorMap, isDarkTheme);
  }
  return color;
};

export const getOpacity = (series: Partial<PlotData>, index: number): number => {
  return series.marker?.opacity
    ? isArrayOrTypedArray(series.marker?.opacity)
      ? (series.marker?.opacity as number[])[index % (series.marker?.opacity as number[]).length]
      : (series.marker?.opacity as number)
    : series.opacity ?? 1;
};

export const createColorScale = (
  layout: Partial<Layout> | undefined,
  series: Partial<PlotData>,
  currentColorScale: ((value: number) => string) | undefined,
): ((value: number) => string) | undefined => {
  if (
    layout?.coloraxis?.colorscale?.length &&
    isArrayOrTypedArray(series.marker?.color) &&
    (series.marker?.color as Color[]).length > 0 &&
    typeof (series.marker?.color as Color[])?.[0] === 'number'
  ) {
    const scale = layout?.coloraxis?.colorscale as Array<[number, string]>;
    const colorValues = series.marker?.color as number[];
    const [dMin, dMax] = [
      layout?.coloraxis?.cmin ?? Math.min(...colorValues),
      layout?.coloraxis?.cmax ?? Math.max(...colorValues),
    ];

    // Normalize colorscale domain to actual data domain
    const scaleDomain = scale.map(([pos]) => dMin + pos * (dMax - dMin));
    const scaleColors = scale.map(item => item[1]);

    return d3ScaleLinear<string>().domain(scaleDomain).range(scaleColors);
  }
  return currentColorScale;
};
