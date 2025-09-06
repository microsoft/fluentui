import * as React from 'react';
import { color as d3Color } from 'd3-color';
import type { PieColors, Color, PlotData, Layout } from '@fluentui/chart-utilities';
import { isArrayOrTypedArray } from '@fluentui/chart-utilities';
import { areArraysEqual } from '../../utilities/utilities';
import { DataVizPalette, getColorFromToken, getNextColor } from '../../utilities/colors';
import { scaleLinear as d3ScaleLinear } from 'd3-scale';

type PlotlyColorway = 'plotly' | 'd3' | 'others';

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

// Default D3 qualitative colorway (Category10), matching Plotly Express px.colors.qualitative.D3
// Source: https://plotly.com/python/discrete-color/#:~:text=Join%20now.-,Color%20Sequences%20in%20Plotly%20Express,-By%20default%2C%20Plotly
export const DEFAULT_D3_COLORWAY = [
  '#1f77b4', //1
  '#ff7f0e', //2
  '#2ca02c', //3
  '#d62728', //4
  '#9467bd', //5
  '#8c564b', //6
  '#e377c2', //7
  '#7f7f7f', //8
  '#bcbd22', //9
  '#17becf', //10
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

// Mapping from D3 Category10 order to Fluent DataViz tokens (light/dark handled via getColorFromToken)
// D3: [blue, orange, green, red, purple, brown, pink, gray, olive, cyan]
export const D3_FLUENTVIZ_COLORWAY_MAPPING: string[] = [
  DataVizPalette.color26, // blue -> lightBlue.shade10
  DataVizPalette.warning, // orange -> semantic warning
  DataVizPalette.color5, // green -> lightGreen.primary
  DataVizPalette.error, // red -> semantic error
  DataVizPalette.color4, // purple -> orchid.tint10
  DataVizPalette.color17, // brown -> pumpkin.shade20
  DataVizPalette.color22, // pink -> hotPink.tint20
  DataVizPalette.disabled, // gray -> semantic disabled
  DataVizPalette.color10, // olive/yellow-green -> gold.shade10
  DataVizPalette.color3, // cyan/teal -> teal.tint20
];

function getPlotlyColorway(colorway: string[] | undefined, isDonut: boolean = false): PlotlyColorway {
  if (!colorway || !isArrayOrTypedArray(colorway)) {
    return 'others';
  }
  const lower = colorway.map(c => c.toLowerCase());
  if (isDonut && areArraysEqual(lower, D3_FLUENTVIZ_COLORWAY_MAPPING)) {
    return 'd3';
  }
  if (areArraysEqual(lower, DEFAULT_PLOTLY_COLORWAY)) {
    return 'plotly';
  }
  return 'others';
}

function tryMapFluentDataViz(
  hexColor: string,
  templateColorway: PlotlyColorway,
  isDarkTheme?: boolean,
  isDonut?: boolean,
): string {
  if (templateColorway !== 'plotly') {
    return hexColor;
  }
  let defaultColorway: string[] = DEFAULT_PLOTLY_COLORWAY;
  let defaultMapping: string[] = PLOTLY_FLUENTVIZ_COLORWAY_MAPPING;
  if (isDonut) {
    defaultColorway = templateColorway === 'plotly' ? DEFAULT_PLOTLY_COLORWAY : DEFAULT_D3_COLORWAY;
    defaultMapping = templateColorway === 'plotly' ? PLOTLY_FLUENTVIZ_COLORWAY_MAPPING : D3_FLUENTVIZ_COLORWAY_MAPPING;
  }
  const idx = defaultColorway.indexOf(hexColor.toLowerCase());
  if (idx !== -1) {
    return getColorFromToken(defaultMapping[idx], !!isDarkTheme);
  }
  return hexColor;
}

export const getColor = (
  legendLabel: string,
  colorMap: React.MutableRefObject<Map<string, string>>,
  templateColorway: PlotlyColorway,
  isDarkTheme?: boolean,
  isDonut?: boolean,
): string => {
  if (!colorMap.current.has(legendLabel)) {
    let nextColor: string;
    const defaultColorMapping = isDonut
      ? templateColorway === 'plotly'
        ? PLOTLY_FLUENTVIZ_COLORWAY_MAPPING
        : D3_FLUENTVIZ_COLORWAY_MAPPING
      : PLOTLY_FLUENTVIZ_COLORWAY_MAPPING;
    if (colorMap.current.size < defaultColorMapping.length) {
      // Get first 10 colors from plotly-fluentviz colorway mapping
      nextColor = getColorFromToken(defaultColorMapping[colorMap.current.size], isDarkTheme);
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
  isDonut?: boolean,
): string[] | string | undefined => {
  const hexColors: string[] = [];
  if (!colors) {
    return undefined;
  }
  const templateColorway = getPlotlyColorway(colorway, isDonut);
  if (isArrayOrTypedArray(colors)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (colors as any[]).forEach((element, index) => {
      const colorString = element?.toString().trim();
      const nextFluentColor = getColor(`Label_${index}`, colorMap, templateColorway, isDarkTheme, isDonut);
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
      : getColor('Label_0', colorMap, templateColorway, isDarkTheme, isDonut);
  }
  return hexColors;
};

export const extractColor = (
  colorway: string[] | undefined,
  colorwayType: ColorwayType,
  colors: PieColors | Color | Color[] | string | null | undefined,
  colorMap: React.MutableRefObject<Map<string, string>>,
  isDarkTheme?: boolean,
  isDonut?: boolean,
): string | string[] | undefined => {
  return colorwayType === 'default' && colors
    ? getSchemaColors(colorway, colors, colorMap, isDarkTheme, isDonut)
    : undefined;
};

export const resolveColor = (
  extractedColors: string[] | string | null | undefined,
  index: number,
  legend: string,
  colorMap: React.MutableRefObject<Map<string, string>>,
  colorway: string[] | undefined,
  isDarkTheme?: boolean,
  isDonut?: boolean,
): string => {
  let color = '';
  const templateColorway = getPlotlyColorway(colorway, isDonut);
  if (extractedColors && isArrayOrTypedArray(extractedColors) && extractedColors.length > 0) {
    color = extractedColors[index % extractedColors.length];
  } else if (typeof extractedColors === 'string') {
    color = extractedColors;
  } else {
    color = getColor(legend, colorMap, templateColorway, isDarkTheme, isDonut);
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
) => {
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
