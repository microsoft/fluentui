import { isArrayOrTypedArray } from '@fluentui/chart-utilities';
import { areArraysEqual } from '../../utilities/utilities';
import { DataVizPalette, getColorFromToken } from '../../utilities/colors';

export type PlotlyColorPallete = 'plotly' | 'others';

export const DEFAULT_PLOTLY_PALETTE = [
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

const PLOTLY_FLUENTVIZ_PALETTE_MAPPING = [
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

export function getPlotlyColorPalette(colorway: string[] | undefined): PlotlyColorPallete {
  const isPlotlyColorPalette =
    isArrayOrTypedArray(colorway) &&
    areArraysEqual(
      colorway?.map(c => c.toLowerCase()),
      DEFAULT_PLOTLY_PALETTE,
    );

  return isPlotlyColorPalette ? 'plotly' : 'others';
}

export function tryMapFluentDataViz(hexColor: string, templatePalette: PlotlyColorPallete): string {
  if (templatePalette !== 'plotly') {
    return hexColor;
  }
  const index = DEFAULT_PLOTLY_PALETTE.indexOf(hexColor.toLowerCase());
  if (index !== -1) {
    return getColorFromToken(PLOTLY_FLUENTVIZ_PALETTE_MAPPING[index]);
  }
  return hexColor;
}
