/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * This interface is extracted from Plotly.js typescript definitions.
 * All the unsupported types are removed to align with fluent charts.
 *  https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/plotly.js/index.d.ts
 */

export type PieColor = string | number;
export type PieColors = Array<PieColor | null | undefined>;

export interface PieFont {
  family: string | string[];
  size: number | number[];
  color: PieColor | PieColors;
}

export interface PieDataTitle extends Pick<DataTitle, 'text' | 'position'> {
  font: Partial<PieFont>;
}

export type PieTextPosition = 'inside' | 'outside' | 'auto' | 'none';

export type PieHoverInfo =
  | 'all'
  | 'none'
  | 'skip'
  | 'label'
  | 'text'
  | 'value'
  | 'percent'
  | 'name'
  | 'label+text'
  | 'label+value'
  | 'label+percent'
  | 'label+name'
  | 'text+value'
  | 'text+percent'
  | 'text+name'
  | 'value+percent'
  | 'value+name'
  | 'percent+name'
  | 'label+text+value'
  | 'label+text+percent'
  | 'label+text+name'
  | 'label+value+percent'
  | 'label+value+name'
  | 'label+percent+name'
  | 'text+value+percent'
  | 'text+value+name'
  | 'text+percent+name'
  | 'value+percent+name'
  | 'label+text+value+percent'
  | 'label+text+value+name'
  | 'label+text+percent+name'
  | 'label+value+percent+name'
  | 'text+value+percent+name';

export interface PieDomain {
  x: number[];
  y: number[];
  row: number;
  column: number;
}

export interface PieLine {
  color: PieColor | PieColors;
  width: number | number[];
}

export interface PieMarker {
  colors: PieColors;
  line: Partial<PieLine>;
}

export interface PieHoverLabel {
  bgcolor: PieColor | PieColors;
  bordercolor: PieColor | PieColors;
  font: PieFont;
  align: HoverLabel['align'] | Array<HoverLabel['align']>;
  namelength: number | number[];
}

export type PieInsideTextOrientation = 'horizontal' | 'radial' | 'tangential' | 'auto';

export interface PieData
  extends Pick<
    PlotData,
    | 'name'
    | 'visible'
    | 'showlegend'
    | 'legendgroup'
    | 'opacity'
    | 'ids'
    | 'labels'
    | 'hovertext'
    | 'automargin'
    | 'textinfo'
    | 'direction'
    | 'hole'
    | 'rotation'
  > {
  type: 'pie';
  title: Partial<PieDataTitle>;
  values: Array<number | string>;
  dlabel: number;
  label0: number;
  pull: number | number[];
  text: Datum | Datum[];
  textposition: PieTextPosition | PieTextPosition[];
  texttemplate: string | string[];
  hoverinfo: PieHoverInfo;
  hovertemplate: string | string[];
  meta: number | string;
  customdata: Datum[];
  domain: Partial<PieDomain>;
  marker: Partial<PieMarker>;
  textfont: PieFont;
  hoverlabel: Partial<PieHoverLabel>;
  insidetextfont: PieFont;
  insidetextorientation: PieInsideTextOrientation;
  outsidetextfont: PieFont;
  scalegroup: string;
  sort: boolean;
  uirevision: number | string;
}

export type SankeyColor = string | number;
export type SankeyColors = Array<SankeyColor | null | undefined>;

export interface SankeyFont {
  family: string | string[];
  size: number | number[];
  color: SankeyColor | SankeyColors;
}

export interface SankeyDataTitle {
  font: Partial<SankeyFont>;
  title: string;
}

export type SankeyOrientation = 'v' | 'h';

export interface SankeyHoverLabel {
  bgcolor: SankeyColor | SankeyColors;
  bordercolor: SankeyColor | SankeyColors;
  font: SankeyFont;
  align: HoverLabel['align'] | Array<HoverLabel['align']>;
  namelength: number | number[];
}

export interface SankeyDomain {
  row: number;
  column: number;
  x: number[];
  y: number[];
}

export interface SankeyNode {
  color: SankeyColor[];
  customdata: Datum[];
  groups: SankeyNode[];
  hoverinfo: 'all' | 'none' | 'skip';
  hoverlabel: Partial<SankeyHoverLabel>;
  hovertemplate: string | string[];
  label: Datum[];
  line: Partial<{
    color: SankeyColor;
    width: number;
  }>;
  pad: number;
  thickness: number;
  x: number[];
  y: number[];
}

export interface SankeyColorscale {
  cmax: number;
  cmin: number;
  colorscale: Array<[number, string]>;
  label: string;
  name: string;
  templateitemname: string;
}

export interface SankeyLink {
  arrowlen: number;
  color: SankeyColor | SankeyColor[];
  colorscale: Partial<SankeyColorscale>;
  customdata: Datum[];
  hoverinfo: 'all' | 'none' | 'skip';
  hoverlabel: Partial<SankeyHoverLabel>;
  hovertemplate: string | string[];
  hovercolor: SankeyColor | SankeyColor[];
  label: Datum[];
  line: Partial<{
    color: SankeyColor;
    width: number;
  }>;
  source: number[];
  target: number[];
  value: number[];
}

export interface SankeyData {
  type: 'sankey';
  name: string;
  orientation: SankeyOrientation;
  visible: boolean | 'legendonly';
  legend: string;
  legendrank: number;
  legendgrouptitle: Partial<SankeyDataTitle>;
  legendwidth: number;
  ids: string[];
  hoverinfo: string;
  meta: number | string;
  customdata: Datum[];
  domain: Partial<SankeyDomain>;
  node: Partial<SankeyNode>;
  link: Partial<SankeyLink>;
  textfont: Partial<SankeyFont>;
  selectpoints: string | number;
  arrangement: 'snap' | 'perpendicular' | 'freeform' | 'fixed';
  hoverlabel: Partial<SankeyHoverLabel>;
  valueformat: string;
  valuesuffix: string;
  uirevision: string | number;
}

export interface Point {
  x: number;
  y: number;
  z: number;
}

export interface PlotScatterDataPoint {
  curveNumber: number;
  data: PlotData;
  pointIndex: number;
  pointNumber: number;
  x: number;
  xaxis: LayoutAxis;
  y: number;
  yaxis: LayoutAxis;
}

export interface PlotDatum {
  curveNumber: number;
  data: PlotData;
  customdata: Datum;
  pointIndex: number;
  pointNumber: number;
  x: Datum;
  xaxis: LayoutAxis;
  y: Datum;
  yaxis: LayoutAxis;
  text: string;
}

export interface PlotCoordinate {
  x: number;
  y: number;
  pointNumber: number;
}

export interface SelectionRange {
  x: number[];
  y: number[];
}

export type PlotSelectedData = Partial<PlotDatum>;

export interface PlotScene {
  center: Point;
  eye: Point;
  up: Point;
}

export interface PolarLayout {
  domain: Partial<Domain>;
  sector: number[];
  hole: number;
  bgcolor: Color;
  radialaxis: Partial<LayoutAxis>;
  angularaxis: Partial<LayoutAxis>;
  gridshape: 'circular' | 'linear';
  uirevision: string | number;
  uid: string;
}

export interface PlotlySchema {
  data: Data[];
  layout?: Partial<Layout>;
  config?: Partial<Config>;
}

export interface ColorAxis {
  colorscale?: Array<[number, string]>;
  cmin?: number;
  cmax?: number;
  colorbar?: {
    title?: string | { text: string };
    thickness?: number;
    len?: number;
    outlinewidth?: number;
  };
  reversescale?: boolean;
  showscale?: boolean;
}

// Layout
export interface Layout {
  colorway: string[];
  piecolorway: string[];
  title:
    | string
    | Partial<{
        text: string;
        font: Partial<Font>;
        xref: 'container' | 'paper';
        yref: 'container' | 'paper';
        x: number;
        y: number;
        xanchor: 'auto' | 'left' | 'center' | 'right';
        yanchor: 'auto' | 'top' | 'middle' | 'bottom';
        pad: Partial<Padding>;
      }>;
  titlefont: Partial<Font>;
  autosize: boolean;
  showlegend: boolean;
  paper_bgcolor: Color;
  plot_bgcolor: Color;
  separators: string;
  hidesources: boolean;
  xaxis: Partial<LayoutAxis>;
  xaxis2: Partial<LayoutAxis>;
  xaxis3: Partial<LayoutAxis>;
  xaxis4: Partial<LayoutAxis>;
  xaxis5: Partial<LayoutAxis>;
  xaxis6: Partial<LayoutAxis>;
  xaxis7: Partial<LayoutAxis>;
  xaxis8: Partial<LayoutAxis>;
  xaxis9: Partial<LayoutAxis>;
  yaxis: Partial<LayoutAxis>;
  yaxis2: Partial<LayoutAxis>;
  yaxis3: Partial<LayoutAxis>;
  yaxis4: Partial<LayoutAxis>;
  yaxis5: Partial<LayoutAxis>;
  yaxis6: Partial<LayoutAxis>;
  yaxis7: Partial<LayoutAxis>;
  yaxis8: Partial<LayoutAxis>;
  yaxis9: Partial<LayoutAxis>;
  margin: Partial<Margin>;
  height: number;
  width: number;
  hovermode: 'closest' | 'x' | 'y' | 'x unified' | 'y unified' | false;
  hoverdistance: number;
  hoverlabel: Partial<HoverLabel>;
  calendar: Calendar;
  'xaxis.range': [Datum, Datum];
  'xaxis.range[0]': Datum;
  'xaxis.range[1]': Datum;
  'yaxis.range': [Datum, Datum];
  'yaxis.range[0]': Datum;
  'yaxis.range[1]': Datum;
  'yaxis.type': AxisType;
  'xaxis.type': AxisType;
  'xaxis.autorange': boolean;
  'yaxis.autorange': boolean;
  'xaxis.title': string;
  'yaxis.title': string;
  ternary: any;
  geo: any;
  mapbox: any;
  subplot: string;
  radialaxis: Partial<Axis>;
  angularaxis: {};
  dragmode:
    | 'zoom'
    | 'pan'
    | 'select'
    | 'lasso'
    | 'drawclosedpath'
    | 'drawopenpath'
    | 'drawline'
    | 'drawrect'
    | 'drawcircle'
    | 'orbit'
    | 'turntable'
    | false;
  orientation: number;
  annotations: Array<Partial<Annotations>>;
  shapes: Array<Partial<Shape>>;
  legend: Partial<Legend>;
  font: Partial<Font>;
  barmode: 'stack' | 'group' | 'overlay' | 'relative';
  barnorm: '' | 'fraction' | 'percent';
  bargap: number;
  bargroupgap: number;
  boxmode: 'group' | 'overlay';
  selectdirection: 'h' | 'v' | 'd' | 'any';
  hiddenlabels: string[];
  grid: Partial<{
    rows: number;
    roworder: 'top to bottom' | 'bottom to top';
    columns: number;
    subplots: string[];
    xaxes: string[];
    yaxes: string[];
    pattern: 'independent' | 'coupled';
    xgap: number;
    ygap: number;
    domain: Partial<{
      x: number[];
      y: number[];
    }>;
    xside: 'bottom' | 'bottom plot' | 'top plot' | 'top';
    yside: 'left' | 'left plot' | 'right plot' | 'right';
  }>;
  polar: Partial<PolarLayout>;
  polar2: Partial<PolarLayout>;
  polar3: Partial<PolarLayout>;
  polar4: Partial<PolarLayout>;
  polar5: Partial<PolarLayout>;
  polar6: Partial<PolarLayout>;
  polar7: Partial<PolarLayout>;
  polar8: Partial<PolarLayout>;
  polar9: Partial<PolarLayout>;
  template: Template;
  clickmode: 'event' | 'select' | 'event+select' | 'none';
  uirevision: number | string;
  uid: string;
  datarevision: number | string;
  editrevision: number | string;
  selectionrevision: number | string;
  colorscale:
    | Array<[number, string]>
    | Partial<{
        diverging: Array<[number, string]>;
        sequential: Array<[number, string]>;
        sequentialminus: Array<[number, string]>;
      }>;
  coloraxis: Partial<ColorAxis>;
}

export interface Legend extends Label {
  borderwidth: number;
  groupclick: 'toggleitem' | 'togglegroup';
  grouptitlefont: Partial<Font>;
  itemclick: 'toggle' | 'toggleothers' | false;
  itemdoubleclick: 'toggle' | 'toggleothers' | false;
  itemsizing: 'trace' | 'constant';
  itemwidth: number;
  orientation: 'v' | 'h';
  title: Partial<LegendTitle>;
  tracegroupgap: number;
  traceorder: 'grouped' | 'normal' | 'reversed' | 'reversed+grouped';
  uirevision: number | string;
  uid: string;
  valign: 'top' | 'middle' | 'bottom';
  x: number;
  xanchor: 'auto' | 'left' | 'center' | 'right';
  xref: 'container' | 'paper';
  y: number;
  yanchor: 'auto' | 'top' | 'middle' | 'bottom';
  yref: 'container' | 'paper';
}

export type AxisType = '-' | 'linear' | 'log' | 'date' | 'category' | 'multicategory';

export type DTickValue = number | string;

export interface TickFormatStop {
  /**
   * Determines whether or not this stop is used. If `false`,
   * this stop is ignored even within its `dtickrange`.
   */
  enabled: boolean;
  /**
   * Range [`min`, `max`], where `min`, `max` - dtick values
   * which describe some zoom level, it is possible to omit `min` or `max`
   * value by passing `null`
   */
  dtickrange: [DTickValue | null, DTickValue | null];
  /**
   * dtickformat for described zoom level, the same as `tickformat`
   */
  value: string;
  /**
   * When used in a template, named items are created in the output figure
   * in addition to any items the figure already has in this array.
   * You can modify these items in the output figure by making
   * your own item with `templateitemname` matching this `name`
   * alongside your modifications (including `visible: false` or `enabled: false` to hide it).
   * Has no effect outside of a template.
   */
  name: string;
  /**
   * Used to refer to a named item in this array in the template.
   * Named items from the template will be created even without
   * a matching item in the input figure, but you can modify one by
   * making an item with `templateitemname` matching its `name`,
   * alongside your modifications (including `visible: false` or `enabled: false` to hide it).
   * If there is no template or no matching item, this item will be hidden
   * unless you explicitly show it with `visible: true`.
   */
  templateitemname: string;
}

export interface AutoRangeOptions {
  clipmax: DTickValue;
  clipmin: DTickValue;
  include: DTickValue;
  maxallowed: DTickValue;
  minallowed: DTickValue;
}

export interface MinorAxisLayout {
  dtick: DTickValue;
  gridcolor: Color;
  griddash: Dash;
  gridwidth: number;
  nticks: number;
  showgrid: boolean;
  tick0: DTickValue;
  tickcolor: Color;
  ticklen: number;
  tickmode: 'auto' | 'linear' | 'array';
  ticks: 'outside' | 'inside' | '';
  tickvals: any[];
  tickwidth: number;
}

export interface RangeBreak {
  bounds: any[];
  dvalue: number;
  enabled: boolean;
  name: string;
  pattern: 'day of week' | 'hour' | '';
  templateitemname: string;
  values: any[];
}

export interface Axis {
  /**
   * A single toggle to hide the axis while preserving interaction like dragging.
   * Default is true when a cheater plot is present on the axis, otherwise
   * false
   */
  visible: boolean;
  /**
   * Sets default for all colors associated with this axis
   * all at once: line, font, tick, and grid colors.
   * Grid color is lightened by blending this with the plot background
   * Individual pieces can override this.
   */
  color: Color;
  title: string | Partial<DataTitle>;
  /**
   * Former `titlefont` is now the sub-attribute `font` of `title`.
   * To customize title font properties, please use `title.font` now.
   */
  titlefont: Partial<Font>;
  type: AxisType;
  autorange: true | false | 'reversed' | 'min reversed' | 'max reversed' | 'min' | 'max';
  autorangeoptions: Partial<AutoRangeOptions>;
  /**
   * 'If *normal*, the range is computed in relation to the extrema
   * of the input data.
   * If `*tozero*`, the range extends to 0,
   * regardless of the input data
   * If *nonnegative*, the range is non-negative,
   * regardless of the input data.
   * Applies only to linear axes.
   */
  rangemode: 'normal' | 'tozero' | 'nonnegative';
  range: any[];
  /**
   * Determines whether or not this axis is zoom-able.
   * If true, then zoom is disabled.
   */
  fixedrange: boolean;

  /**
   * Ticks
   */
  tickmode: 'auto' | 'linear' | 'array';
  nticks: number;
  tick0: number | string;
  dtick: DTickValue;
  tickvals: any[];
  ticktext: string[];
  ticks: 'outside' | 'inside' | '';
  mirror: true | 'ticks' | false | 'all' | 'allticks';
  ticklen: number;
  tickwidth: number;
  tickcolor: Color;
  showticklabels: boolean;
  showspikes: boolean;
  spikecolor: Color;
  spikethickness: number;
  /**
   * Specifies the ordering logic for the case of categorical variables.
   * By default, plotly uses *trace*, which specifies the order that is present in the data supplied.
   * Set `categoryorder` to *category ascending* or *category descending* if order should be determined by
   * the alphanumerical order of the category names.
   * Set `categoryorder` to *array* to derive the ordering from the attribute `categoryarray`. If a category
   * is not found in the `categoryarray` array, the sorting behavior for that attribute will be identical to
   * the *trace* mode. The unspecified categories will follow the categories in `categoryarray`.
   * Set `categoryorder` to *total ascending* or *total descending* if order should be determined by the
   * numerical order of the values.
   * Similarly, the order can be determined by the min, max, sum, mean or median of all the values.
   */
  categoryorder:
    | 'trace'
    | 'category ascending'
    | 'category descending'
    | 'array'
    | 'total ascending'
    | 'total descending'
    | 'min ascending'
    | 'min descending'
    | 'max ascending'
    | 'max descending'
    | 'sum ascending'
    | 'sum descending'
    | 'mean ascending'
    | 'mean descending'
    | 'median ascending'
    | 'median descending';
  categoryarray: any[];
  tickfont: Partial<Font>;
  tickangle: 'auto' | number;
  tickprefix: string;
  /**
   * If `all`, all tick labels are displayed with a prefix.
   * If `first`, only the first tick is displayed with a prefix.
   * If `last`, only the last tick is displayed with a suffix.
   * If `none`, tick prefixes are hidden.
   */
  showtickprefix: 'all' | 'first' | 'last' | 'none';
  /**
   * Sets a tick label suffix.
   */
  ticksuffix: string;
  /**
   * Same as `showtickprefix` but for tick suffixes.
   */
  showticksuffix: 'all' | 'first' | 'last' | 'none';
  /**
   * If `all`, all exponents are shown besides their significands.
   * If `first`, only the exponent of the first tick is shown.
   * If `last`, only the exponent of the last tick is shown.
   * If `none`, no exponents appear.
   */
  showexponent: 'all' | 'first' | 'last' | 'none';
  /**
   * Determines a formatting rule for the tick exponents.
   * For example, consider the number 1,000,000,000.
   * If `none`, it appears as *1,000,000,000*.
   * If `e`, *1e+9*.
   * If `E`, *1E+9*.
   * If `power`, *1x10^9* (with 9 in a super script).
   * If `SI`, *1G*.
   * If `B`, *1B*.
   */
  exponentformat: 'none' | 'e' | 'E' | 'power' | 'SI' | 'B';
  /**
   * Hide SI prefix for 10^n if |n| is below this number. This only has an effect when `tickformat` is "SI" or "B".
   */
  minexponent: number;
  /**
   * 'If `true`, even 4-digit integers are separated
   */
  separatethousands: boolean;
  /**
   * Sets the tick label formatting rule using d3 formatting mini-languages
   * which are very similar to those in Python.
   * For numbers, see: https://github.com/d3/d3-3.x-api-reference/blob/master/Formatting.md#d3_format
   * And for dates see: https://github.com/d3/d3-3.x-api-reference/blob/master/Time-Formatting.md#format
   * We add one item to d3's date formatter: `%{n}f` for fractional seconds with n digits.
   * For example, `"2016-10-13 09:15:23.456"` with tickformat `"%H~%M~%S.%2f"` would display `"09~15~23.46"`
   */
  tickformat: string;
  /**
   * Sets the hover text formatting rule using d3 formatting mini-languages
   * which are very similar to those in Python.
   * For numbers, see: https://github.com/d3/d3-3.x-api-reference/blob/master/Formatting.md#d3_format
   * And for dates see: https://github.com/d3/d3-3.x-api-reference/blob/master/Time-Formatting.md#format
   * We add one item to d3's date formatter: `%{n}f` for fractional seconds with n digits.
   * For example, `"2016-10-13 09:15:23.456"` with tickformat `"%H~%M~%S.%2f"` would display "09~15~23.46"
   */
  hoverformat: string;
  calendar: Calendar;
  /**
   * Array of `Partial<TickFormatStop>` objects.
   */
  tickformatstops: Array<Partial<TickFormatStop>>;
  spikedash: string;
  /**
   * Determines the drawing mode for the spike line.
   * If `toaxis`, the line is drawn from the data point to the axis the
   * series is plotted on.
   * If `across`, the line is drawn across the entire plot area, and
   * supercedes *toaxis*.
   * If `marker`, then a marker dot is drawn on the axis the series is
   * plotted on
   */
  spikemode:
    | 'toaxis'
    | 'across'
    | 'marker'
    | 'toaxis+across'
    | 'toaxis+across+marker'
    | 'across+marker'
    | 'toaxis+marker';
  /**
   * Determines whether spikelines are stuck to the cursor or to the closest datapoints.
   */
  spikesnap: 'data' | 'cursor' | 'hovered data';

  /**
   * Lines and Grids
   */

  /**
   * Determines whether or not a line bounding this axis is drawn.
   */
  showline: boolean;
  /**
   * Sets the axis line color
   */
  linecolor: Color;
  /**
   * Sets the width (in px) of the axis line.
   */
  linewidth: number;
  /**
   * Determines whether or not grid lines are drawn.
   * If `true`, the grid lines are drawn at every tick mark.
   */
  showgrid: boolean;
  /**
   * Sets the color of the grid lines.
   */
  gridcolor: Color;
  /**
   * Sets the width (in px) of the grid lines.
   */
  gridwidth: number;
  /**
   * Determines whether or not a line is drawn at along the 0 value
   * of this axis.
   * If `true`, the zero line is drawn on top of the grid lines.
   */
  zeroline: boolean;
  /**
   * Sets the line color of the zero line.
   */
  zerolinecolor: Color;
  /**
   * Sets the width (in px) of the zero line.
   */
  zerolinewidth: number;
  /**
   * Determines whether or not a dividers are drawn
   * between the category levels of this axis.
   * Only has an effect on *multicategory* axes.
   */
  showdividers: boolean;
  /**
   * Sets the color of the dividers
   * Only has an effect on *multicategory* axes.
   */
  dividercolor: Color;
  /**
   * Sets the width (in px) of the dividers
   * Only has an effect on *multicategory* axes.
   */
  dividerwidth: number;

  autotypenumbers: 'convert types' | 'strict';
  labelalias: DTickValue;
  maxallowed: DTickValue;
  minallowed: DTickValue;
}

export type Calendar =
  | 'gregorian'
  | 'chinese'
  | 'coptic'
  | 'discworld'
  | 'ethiopian'
  | 'hebrew'
  | 'islamic'
  | 'julian'
  | 'mayan'
  | 'nanakshahi'
  | 'nepali'
  | 'persian'
  | 'jalali'
  | 'taiwan'
  | 'thai'
  | 'ummalqura';

// regex from documentation: "/^x([2-9]|[1-9][0-9]+)?( domain)?$/" | "/^y([2-9]|[1-9][0-9]+)?( domain)?$/"
// regex allows for an unlimited amount of digits for the 'axis number',
// but the following typescript definition is limited to two digits
type xYAxisNames = `${
  | ''
  | `${2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
  | `${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`}${'' | ' domain'}`;

export type XAxisName = `x${xYAxisNames}`;
export type YAxisName = `y${xYAxisNames}`;

export type AxisName = XAxisName | YAxisName;

export interface LayoutAxis extends Axis {
  fixedrange: boolean;
  scaleanchor: AxisName;
  scaleratio: number;
  constrain: 'range' | 'domain';
  constraintoward: 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom';
  anchor: 'free' | AxisName;
  side: 'top' | 'bottom' | 'left' | 'right' | 'clockwise' | 'counterclockwise';
  overlaying: 'free' | AxisName;
  layer: 'above traces' | 'below traces';
  domain: number[];
  position: number;
  rotation: number;
  direction: 'counterclockwise' | 'clockwise';
  rangeslider: Partial<RangeSlider>;
  rangeselector: Partial<RangeSelector>;
  automargin: boolean;
  autotick: boolean;
  angle: any;
  griddash: Dash;
  l2p: (v: Datum) => number;

  autotickangles: number[];
  insiderange: any[];
  matches: AxisName;
  minor: Partial<MinorAxisLayout>;
  rangebreaks: Array<Partial<RangeBreak>>;
  ticklabelmode: 'instant' | 'period';
  ticklabeloverflow: 'allow' | 'hide past div' | 'hide past domain';
  ticklabelposition:
    | 'outside'
    | 'inside'
    | 'outside top'
    | 'inside top'
    | 'outside left'
    | 'inside left'
    | 'outside right'
    | 'inside right'
    | 'outside bottom'
    | 'inside bottom';
  ticklabelstep: number;
  tickson: 'labels' | 'boundaries';
  uirevision: DTickValue;
}

export interface SceneAxis extends Axis {
  spikesides: boolean;
  showbackground: boolean;
  backgroundcolor: Color;
  showaxeslabels: boolean;
}

export interface ShapeLine {
  color: string;
  width: number;
  dash: Dash;
}

export interface ShapeLabel {
  font: Partial<Font>;
  padding: number;
  text: string;
  textangle: 'auto' | number;
  textposition:
    | 'top left'
    | 'top center'
    | 'top right'
    | 'middle left'
    | 'middle center'
    | 'middle right'
    | 'bottom left'
    | 'bottom center'
    | 'bottom right'
    | 'start'
    | 'middle'
    | 'end';
  texttemplate: string;
  xanchor: 'auto' | 'left' | 'center' | 'right';
  yanchor: 'top' | 'middle' | 'bottom';
}

export interface Shape {
  visible: boolean | 'legendonly';
  layer: 'below' | 'above';
  type: 'rect' | 'circle' | 'line' | 'path';
  path: string;
  xref: 'paper' | XAxisName;
  xsizemode: 'scaled' | 'pixel';
  xanchor: number | string;
  yref: 'paper' | YAxisName;
  ysizemode: 'scaled' | 'pixel';
  yanchor: number | string;
  x0: Datum;
  y0: Datum;
  x1: Datum;
  y1: Datum;
  fillcolor: string;
  name: string;
  templateitemname: string;
  opacity: number;
  line: Partial<ShapeLine>;
  label: Partial<ShapeLabel>;
  showlegend: boolean;
  legendgroup: string;
  legendgrouptitle: {
    text: string;
    font?: Partial<Font>;
  };
  legendrank: number;
}

export interface Margin {
  t: number;
  b: number;
  l: number;
  r: number;
  pad: number;
}

export interface Icon {
  height?: number | undefined;
  width?: number | undefined;
  ascent?: number | undefined;
  descent?: number | undefined;
  name?: string | undefined;
  path?: string | undefined;
  svg?: string | undefined;
  transform?: string | undefined;
}

export interface GaugeLine {
  color: Color;
  width: number;
}
export interface Threshold {
  line: Partial<GaugeLine>;
  value: number;
  thickness: number;
}

export interface GaugeBar {
  color: Color;
  line: Partial<GaugeLine>;
  thickness: number;
}
export interface Gauge {
  shape: 'angular' | 'bullet';
  bar: Partial<GaugeBar>;
  bgcolor: Color;
  bordercolor: Color;
  borderwidth: number;
  axis: Partial<Axis>;
  steps: Array<{ range: number[]; color: Color }>;
  threshold: Partial<Threshold>;
}

export interface Delta {
  reference: number;
  position: 'top' | 'bottom' | 'left' | 'right';
  relative: boolean;
  valueformat: string;
  increasing: {
    symbol: string;
    color: Color;
  };
  decreasing: {
    symbol: string;
    color: Color;
  };
}

export interface DataTitle {
  text: string;
  font: Partial<Font>;
  standoff: number;
  position:
    | 'top left'
    | 'top center'
    | 'top right'
    | 'middle center'
    | 'bottom left'
    | 'bottom center'
    | 'bottom right';
}

export interface PlotNumber {
  valueformat: string;
  font: Partial<Font>;
  prefix: string;
  suffix: string;
}

export interface Template {
  data?: { [type in PlotType]?: Array<Partial<PlotData>> } | undefined;
  layout?: Partial<Layout> | undefined;
}

// Data

export type Datum = string | number | Date | null;
export type TypedArray =
  | Int8Array
  | Uint8Array
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Uint8ClampedArray
  | Float32Array
  | Float64Array;

export interface ErrorOptions {
  visible: boolean;
  symmetric: boolean;
  color: Color;
  thickness: number;
  width: number;
  opacity: number;
}

export type ErrorBar = Partial<ErrorOptions> &
  (
    | {
        type: 'constant' | 'percent';
        value: number;
        valueminus?: number | undefined;
      }
    | {
        type: 'data';
        array: Datum[];
        arrayminus?: Datum[] | undefined;
      }
  );

export type Dash = 'solid' | 'dot' | 'dash' | 'longdash' | 'dashdot' | 'longdashdot';
export type PlotType =
  | 'bar'
  | 'barpolar'
  | 'box'
  | 'candlestick'
  | 'carpet'
  | 'choropleth'
  | 'choroplethmapbox'
  | 'cone'
  | 'contour'
  | 'contourcarpet'
  | 'densitymapbox'
  | 'funnel'
  | 'funnelarea'
  | 'heatmap'
  | 'heatmapgl'
  | 'histogram'
  | 'histogram2d'
  | 'histogram2dcontour'
  | 'image'
  | 'indicator'
  | 'isosurface'
  | 'mesh3d'
  | 'ohlc'
  | 'parcats'
  | 'parcoords'
  | 'pie'
  | 'pointcloud'
  | 'sankey'
  | 'scatter'
  | 'scatter3d'
  | 'scattercarpet'
  | 'scattergeo'
  | 'scattergl'
  | 'scattermapbox'
  | 'scatterpolar'
  | 'scatterpolargl'
  | 'scatterternary'
  | 'splom'
  | 'streamtube'
  | 'sunburst'
  | 'surface'
  | 'table'
  | 'treemap'
  | 'violin'
  | 'volume'
  | 'waterfall'
  // adding custom plot types as seen in AI generated plotly schema
  | 'gauge';

export type Data = Partial<PlotData> | Partial<PieData> | Partial<SankeyData>;

export type Color =
  | string
  | number
  | Array<string | number | undefined | null>
  | Array<Array<string | number | undefined | null>>;
export type ColorScale = string | string[] | Array<[number, string]>;
export type DataTransform = Partial<Transform>;
export type ScatterData = PlotData;

// Bar Scatter
export interface PlotData {
  type: PlotType;
  x: Datum[] | Datum[][] | TypedArray;
  y: Datum[] | Datum[][] | TypedArray;
  z: Datum[] | Datum[][] | Datum[][][] | TypedArray;
  i: TypedArray;
  j: TypedArray;
  k: TypedArray;
  xy: Float32Array;
  error_x: ErrorBar;
  error_y: ErrorBar;
  xaxis: string;
  yaxis: string;
  text: string | string[];
  lat: Datum[];
  lon: Datum[];
  line: Partial<ScatterLine>;
  'line.color': Color;
  'line.width': number;
  'line.dash': Dash;
  'line.shape': 'linear' | 'spline' | 'hv' | 'vh' | 'hvh' | 'vhv';
  'line.smoothing': number;
  'line.simplify': boolean;
  marker: Partial<PlotMarker>;
  'marker.symbol': MarkerSymbol | MarkerSymbol[];
  'marker.color': Color;
  'marker.colorscale': ColorScale | ColorScale[];
  'marker.opacity': number | number[];
  'marker.size': number | number[] | number[][];
  'marker.maxdisplayed': number;
  'marker.sizeref': number;
  'marker.sizemax': number;
  'marker.sizemin': number;
  'marker.sizemode': 'diameter' | 'area';
  'marker.showscale': boolean;
  'marker.line': Partial<ScatterMarkerLine>;
  'marker.line.color': Color;
  'marker.line.colorscale': ColorScale | ColorScale[];
  'marker.colorbar': {}; // TODO
  'marker.pad.t': number;
  'marker.pad.b': number;
  'marker.pad.l': number;
  'marker.pad.r': number;
  mode:
    | 'lines'
    | 'markers'
    | 'text'
    | 'lines+markers'
    | 'text+markers'
    | 'text+lines'
    | 'text+lines+markers'
    | 'none'
    | 'gauge'
    | 'number'
    | 'delta'
    | 'number+delta'
    | 'gauge+number'
    | 'gauge+number+delta'
    | 'gauge+delta'
    | 'markers+text'
    | 'lines+text'
    | 'lines+markers+text';
  histfunc: 'count' | 'sum' | 'avg' | 'min' | 'max';
  histnorm: '' | 'percent' | 'probability' | 'density' | 'probability density';
  hoveron: 'points' | 'fills';
  hoverinfo:
    | 'all'
    | 'name'
    | 'none'
    | 'skip'
    | 'text'
    | 'x'
    | 'x+text'
    | 'x+name'
    | 'x+y'
    | 'x+y+text'
    | 'x+y+name'
    | 'x+y+z'
    | 'x+y+z+text'
    | 'x+y+z+name'
    | 'y'
    | 'y+name'
    | 'y+x'
    | 'y+text'
    | 'y+x+text'
    | 'y+x+name'
    | 'y+z'
    | 'y+z+text'
    | 'y+z+name'
    | 'y+x+z'
    | 'y+x+z+text'
    | 'y+x+z+name'
    | 'z'
    | 'z+x'
    | 'z+x+text'
    | 'z+x+name'
    | 'z+y+x'
    | 'z+y+x+text'
    | 'z+y+x+name'
    | 'z+x+y'
    | 'z+x+y+text'
    | 'z+x+y+name';
  hoverlabel: Partial<HoverLabel>;
  hovertemplate: string | string[];
  hovertext: string | string[];
  hoverongaps: boolean;
  xhoverformat: string;
  yhoverformat: string;
  zhoverformat: string;
  texttemplate: string | string[];
  textinfo:
    | 'label'
    | 'label+text'
    | 'label+value'
    | 'label+percent'
    | 'label+text+value'
    | 'label+text+percent'
    | 'label+value+percent'
    | 'text'
    | 'text+value'
    | 'text+percent'
    | 'text+value+percent'
    | 'value'
    | 'value+percent'
    | 'percent'
    | 'none';
  textposition:
    | 'top left'
    | 'top center'
    | 'top right'
    | 'middle left'
    | 'middle center'
    | 'middle right'
    | 'bottom left'
    | 'bottom center'
    | 'bottom right'
    | 'inside'
    | 'outside'
    | 'auto'
    | 'none';
  textfont: Partial<Font>;
  textangle: 'auto' | number;
  insidetextanchor: 'end' | 'middle' | 'start';
  constraintext: 'inside' | 'outside' | 'both' | 'none';
  fill: 'none' | 'tozeroy' | 'tozerox' | 'tonexty' | 'tonextx' | 'toself' | 'tonext';
  fillcolor: string;
  fillpattern: Partial<Pattern>;
  showlegend: boolean;
  legendgroup: string;
  legendgrouptitle: {
    text: string;
    font?: Partial<Font>;
  };
  legendrank: number;
  parents: string[];
  name: string;
  stackgroup: string;
  groupnorm: '' | 'fraction' | 'percent';
  stackgaps: 'infer zero' | 'interpolate';
  connectgaps: boolean;
  visible: boolean | 'legendonly';
  delta: Partial<Delta>;
  gauge: Partial<Gauge>;
  number: Partial<PlotNumber>;
  transforms: DataTransform[];
  orientation: 'v' | 'h';
  width: number | number[];
  boxmean: boolean | 'sd';
  boxpoints: 'all' | 'outliers' | 'suspectedoutliers' | false;
  jitter: number;
  pointpos: number;
  opacity: number;
  showscale: boolean;
  colorscale: ColorScale;
  zsmooth: 'fast' | 'best' | false;
  zmin: number;
  zmax: number;
  ygap: number;
  xgap: number;
  transpose: boolean;
  autobinx: boolean;
  xbins: {
    start: number | string;
    end: number | string;
    size: number | string;
  };
  ybins: {
    start: number | string;
    end: number | string;
    size: number | string;
  };
  value: number;
  values: Datum[];
  labels: Datum[];
  stage: string;
  direction: 'clockwise' | 'counterclockwise';
  hole: number;
  rotation: number;
  theta: Datum[];
  r: Datum[];
  customdata: Datum[] | Datum[][];
  selectedpoints: Datum[];
  domain: Partial<{
    row: number;
    column: number;
    x: number[];
    y: number[];
  }>;
  title: Partial<DataTitle>;
  branchvalues: 'total' | 'remainder';
  ids: string[];
  level: string;
  cliponaxis: boolean;
  automargin: boolean;
  locationmode: 'ISO-3' | 'USA-states' | 'country names' | 'geojson-id';
  locations: Datum[];
  reversescale: boolean;
  colorbar: Partial<ColorBar>;
  offset: number | number[];
  contours: Partial<{
    coloring: 'fill' | 'heatmap' | 'lines' | 'none';
    end: number;
    labelfont: Partial<Font>;
    labelformat: string;
    operation: '=' | '<' | '>=' | '>' | '<=' | '[]' | '()' | '[)' | '(]' | '][' | ')(' | '](' | ')[';
    showlabels: boolean;
    showlines: boolean;
    size: number;
    start: number;
    type: 'levels' | 'constraint';
    value: number | [lowerBound: number, upperBound: number];
  }>;
  autocontour: boolean;
  ncontours: number;
  uirevision: string | number;
  uid: string;
  base: Datum[] | Datum[][] | TypedArray;
  header?: {
    align?: 'left' | 'center' | 'right' | ('left' | 'center' | 'right')[];
    fill?: {
      color?: Color | Color[];
    };
    font?: {
      family?: string | string[];
      size?: number | number[];
      color?: Color | Color[];
    };
    values: (string | number | boolean | null)[];
  };
  cells?: {
    align?: 'left' | 'center' | 'right' | ('left' | 'center' | 'right')[];
    fill?: {
      color?: Color | Color[];
    };
    font?: {
      family?: string | string[];
      size?: number | number[];
      color?: Color | Color[];
    };
    values: (string | number | boolean | null)[][];
    format: string | string[];
    prefix: string | string[];
    suffix: string | string[];
  };
}

export interface TableData {
  type: 'table';
  header?: {
    align?: 'left' | 'center' | 'right' | ('left' | 'center' | 'right')[];
    fill?: {
      color?: Color | Color[];
    };
    font?: {
      family?: string | string[];
      size?: number | number[];
      color?: Color | Color[];
    };
    values: (string | number | boolean | null)[];
  };
  cells?: {
    align?: 'left' | 'center' | 'right' | ('left' | 'center' | 'right')[];
    fill?: {
      color?: Color | Color[];
    };
    font?: {
      family?: string | string[];
      size?: number | number[];
      color?: Color | Color[];
    };
    values: (string | number | boolean | null)[][];
    format?: string | string[];
    prefix?: string | string[];
    suffix?: string | string[];
  };
}

/**
 * These interfaces are based on attribute descriptions in
 * https://github.com/plotly/plotly.js/tree/9d6144304308fc3007f0facf2535d38ea3e9b26c/src/transforms
 */
export interface TransformStyle {
  target: number | string | number[] | string[];
  value: Partial<PlotData>;
}

export interface TransformAggregation {
  target: string;
  func?: 'count' | 'sum' | 'avg' | 'median' | 'mode' | 'rms' | 'stddev' | 'min' | 'max' | 'first' | 'last' | undefined;
  funcmode?: 'sample' | 'population' | undefined;
  enabled?: boolean | undefined;
}

export interface Transform {
  type: 'aggregate' | 'filter' | 'groupby' | 'sort';
  enabled: boolean;
  target: number | string | number[] | string[];
  operation: string;
  aggregations: TransformAggregation[];
  preservegaps: boolean;
  groups: string | number[] | string[];
  nameformat: string;
  styles: TransformStyle[];
  value: any;
  order: 'ascending' | 'descending';
}

export interface ColorBar {
  thicknessmode: 'fraction' | 'pixels';
  thickness: number;
  lenmode: 'fraction' | 'pixels';
  len: number;
  x: number;
  xanchor: 'left' | 'center' | 'right';
  xpad: number;
  y: number;
  yanchor: 'top' | 'middle' | 'bottom';
  ypad: number;
  outlinecolor: Color;
  outlinewidth: number;
  bordercolor: Color;
  borderwidth: Color;
  bgcolor: Color;
  tickmode: 'auto' | 'linear' | 'array';
  nticks: number;
  tick0: number | string;
  dtick: DTickValue;
  tickvals: Datum[] | Datum[][] | Datum[][][] | TypedArray;
  ticktext: Datum[] | Datum[][] | Datum[][][] | TypedArray;
  ticks: 'outside' | 'inside' | '';
  ticklen: number;
  tickwidth: number;
  tickcolor: Color;
  showticklabels: boolean;
  tickfont: Font;
  tickangle: 'auto' | number;
  tickformat: string;
  tickformatstops: Array<Partial<TickFormatStop>>;
  tickprefix: string;
  showtickprefix: 'all' | 'first' | 'last' | 'none';
  ticksuffix: string;
  showticksuffix: 'all' | 'first' | 'last' | 'none';
  separatethousands: boolean;
  exponentformat: 'none' | 'e' | 'E' | 'power' | 'SI' | 'B';
  showexponent: 'all' | 'first' | 'last' | 'none';
  minexponent: number;
  title: string;
  titlefont: Font;
  titleside: 'right' | 'top' | 'bottom';
  tickvalssrc: any;
  ticktextsrc: any;
}

export type MarkerSymbol = string | number | Array<string | number>;

/**
 * Any combination of "x", "y", "z", "text", "name" joined with a "+" OR "all" or "none" or "skip".
 * examples: "x", "y", "x+y", "x+y+z", "all"
 * default: "all"
 */
export interface PlotMarker {
  symbol: MarkerSymbol;
  color?: Color | Color[] | undefined;
  colors?: Color[] | undefined;
  colorscale?: ColorScale | undefined;
  cauto?: boolean | undefined;
  cmax?: number | undefined;
  cmin?: number | undefined;
  autocolorscale?: boolean | undefined;
  reversescale?: boolean | undefined;
  opacity: number | number[];
  size: number | number[];
  maxdisplayed?: number | undefined;
  sizeref?: number | undefined;
  sizemax?: number | undefined;
  sizemin?: number | undefined;
  sizemode?: 'diameter' | 'area' | undefined;
  showscale?: boolean | undefined;
  line: Partial<ScatterMarkerLine>;
  pad?: Partial<Padding> | undefined;
  width?: number | undefined;
  colorbar?: Partial<ColorBar> | undefined;
  gradient?:
    | {
        type: 'radial' | 'horizontal' | 'vertical' | 'none';
        color: Color;
        typesrc: any;
        colorsrc: any;
      }
    | undefined;
  pattern?: Partial<Pattern>;
}

export type ScatterMarker = PlotMarker;

export interface ScatterMarkerLine {
  width: number | number[];
  color: Color;
  cauto?: boolean | undefined;
  cmax?: number | undefined;
  cmin?: number | undefined;
  cmid?: number | undefined;
  colorscale?: ColorScale | undefined;
  autocolorscale?: boolean | undefined;
  reversescale?: boolean | undefined;
  coloraxis?: string | undefined;
}

export interface ScatterLine {
  color: Color;
  width: number;
  dash: Dash;
  shape: 'linear' | 'spline' | 'hv' | 'vh' | 'hvh' | 'vhv';
  smoothing: number;
  simplify: boolean;
}

export interface Font {
  color: Color;
  /**
   * HTML font family - the typeface that will be applied by the web browser.
   * The web browser will only be able to apply a font if it is available on the system
   * which it operates. Provide multiple font families, separated by commas, to indicate
   * the preference in which to apply fonts if they aren't available on the system.
   * The plotly service (at https://plot.ly or on-premise) generates images on a server,
   * where only a select number of fonts are installed and supported.
   * These include *Arial*, *Balto*, *Courier New*, *Droid Sans*, *Droid Serif*,
   * *Droid Sans Mono*, *Gravitas One*, *Old Standard TT*, *Open Sans*, *Overpass*,
   * *PT Sans Narrow*, *Raleway*, *Times New Roman*.
   * @default "Arial, sans-serif"
   */
  family: string;
  /**
   * Sets the shape and color of the shadow behind text. "auto" places minimal shadow and applies contrast text font color. See https://developer.mozilla.org/en-US/docs/Web/CSS/text-shadow for additional options.
   * @default "none"
   */
  shadow: string;
  /**
   * number greater than or equal to 1
   * @default 13
   */
  size: number;
  /**
   * Sets the weight (or boldness) of the font.
   * number between or equal to 1 and 1000
   * @default normal
   */
  weight: number;
}

export interface Config {
  /**
   * Determines whether math should be typeset or not,
   * when MathJax (either v2 or v3) is present on the page.
   */
  typesetMath: boolean;

  /** DO autosize once regardless of layout.autosize (use default width or height values otherwise) */
  autosizable: boolean;

  /** set the length of the undo/redo queue */
  queueLength: number;

  /** if we DO autosize, do we fill the container or the screen? */
  fillFrame: boolean;

  /** if we DO autosize, set the frame margins in percents of plot size */
  frameMargins: number;

  /** Set global transform to be applied to all traces with no specification needed */
  globalTransforms: any[];

  /** Which localization should we use? Should be a string like 'en' or 'en-US' */
  locale: string;

  /**
   * Localization definitions
   * Locales can be provided either here (specific to one chart) or globally
   * by registering them as modules.
   * Should be an object of objects \{locale: \{dictionary: \{...\}, format: \{...\}\}\}
   * \{
   *     da: \{
   *         dictionary: \{'Reset axes': 'Nulstil aksler', ...\},
   *         format: \{months: [...], shortMonths: [...]\}
   *     \},
   *     ...
   * \}
   * All parts are optional. When looking for translation or format fields, we
   * look first for an exact match in a config locale, then in a registered
   * module. If those fail, we strip off any regionalization ('en-US' -\> 'en')
   * and try each (config, registry) again. The final fallback for translation
   * is untranslated (which is US English) and for formats is the base English
   * (the only consequence being the last fallback date format %x is DD/MM/YYYY
   * instead of MM/DD/YYYY). Currently `grouping` and `currency` are ignored
   * for our automatic number formatting, but can be used in custom formats.
   */
  locales: {};

  /** Make the chart responsive to window size */
  responsive: boolean;
}

// Components

export interface RangeSlider {
  visible: boolean;
  thickness: number;
  range: [Datum, Datum];
  borderwidth: number;
  bordercolor: string;
  bgcolor: string;
}

export interface RangeSelectorButton {
  step: 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year' | 'all';
  stepmode: 'backward' | 'todate';
  count: number;
  label: string;
}

export interface RangeSelector extends Label {
  buttons: Array<Partial<RangeSelectorButton>>;
  visible: boolean;
  x: number;
  xanchor: 'auto' | 'left' | 'center' | 'right';
  y: number;
  yanchor: 'auto' | 'top' | 'middle' | 'bottom';
  activecolor: string;
  borderwidth: number;
}

export interface Label {
  /** Sets the background color of all hover labels on graph. */
  bgcolor: string;

  /** Sets the border color of all hover labels on graph. */
  bordercolor: string;

  /** Sets the default hover label font used by all traces on the graph. */
  font: Partial<Font>;
}

export interface LegendTitle {
  font: Partial<Font>;
  side: 'top' | 'left' | 'top left' | 'top center' | 'top right';
  text: string;
}

export interface HoverLabel extends Label {
  /**
   * Sets the horizontal alignment of the text content within hover label box.
   * @default "auto"
   */
  align: 'left' | 'right' | 'auto';

  /**
   * Sets the default length (in number of characters) of the trace name
   * in the hover labels for all traces.
   * -1 shows the whole name regardless of length.
   * @default 15
   */
  namelength: number;
}

export interface Annotations extends Label {
  /** Determines whether or not this annotation is visible. */
  visible: boolean;

  /**
   * Sets the text associated with this annotation.
   * Plotly uses a subset of HTML tags to do things like
   * newline (<br>), bold (<b></b>), italics (<i></i>),
   * hyperlinks (<a href='...'></a>). Tags <em>, <sup>, <sub>
   * <span> are also supported.
   */
  text: string;

  /** Sets the angle at which the `text` is drawn with respect to the horizontal. */
  textangle: string | number;

  /**
   * Sets an explicit width for the text box. null (default) lets the
   * text set the box width. Wider text will be clipped.
   * There is no automatic wrapping; use <br> to start a new line.
   */
  width: number;

  /**
   * Sets an explicit height for the text box. null (default) lets the
   * text set the box height. Taller text will be clipped.
   */
  height: number;

  /** Sets the opacity of the annotation (text + arrow). */
  opacity: number;

  /**
   * Sets the horizontal alignment of the `text` within the box.
   * Has an effect only if `text` spans more two or more lines
   * (i.e. `text` contains one or more <br> HTML tags) or if an
   * explicit width is set to override the text width.
   */
  align: 'left' | 'center' | 'right';

  /**
   * Sets the vertical alignment of the `text` within the box.
   * Has an effect only if an explicit height is set to override the text height.
   */
  valign: 'top' | 'middle' | 'bottom';

  /** Sets the padding (in px) between the `text` and the enclosing border. */
  borderpad: number;

  /** Sets the width (in px) of the border enclosing the annotation `text`. */
  borderwidth: number;

  /**
   * Determines whether or not the annotation is drawn with an arrow.
   * If *true*, `text` is placed near the arrow's tail.
   * If *false*, `text` lines up with the `x` and `y` provided.
   */
  showarrow: boolean;

  /** Sets the color of the annotation arrow. */
  arrowcolor: string;

  /** Sets the end annotation arrow head style. */
  arrowhead: number;

  /** Sets the start annotation arrow head style. */
  startarrowhead: number;

  /** Sets the annotation arrow head position. */
  arrowside: 'end' | 'start';

  /**
   * Sets the size of the end annotation arrow head, relative to `arrowwidth`.
   * A value of 1 (default) gives a head about 3x as wide as the line.
   */
  arrowsize: number;

  /**
   * Sets the size of the start annotation arrow head, relative to `arrowwidth`.
   * A value of 1 (default) gives a head about 3x as wide as the line.
   */
  startarrowsize: number;

  /** Sets the width (in px) of annotation arrow line. */
  arrowwidth: number;

  /**
   * Sets a distance, in pixels, to move the end arrowhead away from the
   * position it is pointing at, for example to point at the edge of
   * a marker independent of zoom. Note that this shortens the arrow
   * from the `ax` / `ay` vector, in contrast to `xshift` / `yshift`
   * which moves everything by this amount.
   */
  standoff: number;

  /**
   * Sets a distance, in pixels, to move the start arrowhead away from the
   * position it is pointing at, for example to point at the edge of
   * a marker independent of zoom. Note that this shortens the arrow
   * from the `ax` / `ay` vector, in contrast to `xshift` / `yshift`
   * which moves everything by this amount.
   */
  startstandoff: number;

  /**
   * Sets the x component of the arrow tail about the arrow head.
   * If `axref` is `pixel`, a positive (negative)
   * component corresponds to an arrow pointing
   * from right to left (left to right).
   * If `axref` is an axis, this is an absolute value on that axis,
   * like `x`, NOT a relative value.
   */
  ax: number;

  /**
   * Sets the y component of the arrow tail about the arrow head.
   * If `ayref` is `pixel`, a positive (negative)
   * component corresponds to an arrow pointing
   * from bottom to top (top to bottom).
   * If `ayref` is an axis, this is an absolute value on that axis,
   * like `y`, NOT a relative value.
   */
  ay: number;

  /**
   * Indicates in what terms the tail of the annotation (ax,ay)
   * is specified. If `pixel`, `ax` is a relative offset in pixels
   * from `x`. If set to an x axis id (e.g. *x* or *x2*), `ax` is
   * specified in the same terms as that axis. This is useful
   * for trendline annotations which should continue to indicate
   * the correct trend when zoomed.
   */
  axref: 'pixel' | XAxisName;

  /**
   * Indicates in what terms the tail of the annotation (ax,ay)
   * is specified. If `pixel`, `ay` is a relative offset in pixels
   * from `y`. If set to a y axis id (e.g. *y* or *y2*), `ay` is
   * specified in the same terms as that axis. This is useful
   * for trendline annotations which should continue to indicate
   * the correct trend when zoomed.
   */
  ayref: 'pixel' | YAxisName;

  /**
   * Sets the annotation's x coordinate axis.
   * If set to an x axis id (e.g. *x* or *x2*), the `x` position refers to an x coordinate
   * If set to *paper*, the `x` position refers to the distance from
   * the left side of the plotting area in normalized coordinates
   * where 0 (1) corresponds to the left (right) side.
   */
  xref: 'paper' | XAxisName;

  /**
   * Sets the annotation's x position.
   * If the axis `type` is *log*, then you must take the log of your desired range.
   * If the axis `type` is *date*, it should be date strings, like date data,
   * though Date objects and unix milliseconds will be accepted and converted to strings.
   * If the axis `type` is *category*, it should be numbers, using the scale where each
   * category is assigned a serial number from zero in the order it appears.
   */
  x: number | string;

  /**
   * Sets the text box's horizontal position anchor
   * This anchor binds the `x` position to the *left*, *center* or *right* of the annotation.
   * For example, if `x` is set to 1, `xref` to *paper* and `xanchor` to *right* then the
   * right-most portion of the annotation lines up with the right-most edge of the plotting area.
   * If *auto*, the anchor is equivalent to *center* for data-referenced annotations or if there
   * is an arrow, whereas for paper-referenced with no arrow, the anchor picked corresponds to the closest side.
   */
  xanchor: 'auto' | 'left' | 'center' | 'right';

  /**
   * Shifts the position of the whole annotation and arrow to the
   * right (positive) or left (negative) by this many pixels.
   */
  xshift: number;

  /**
   * Sets the annotation's y coordinate axis.
   * If set to an y axis id (e.g. *y* or *y2*), the `y` position refers to an y coordinate
   * If set to *paper*, the `y` position refers to the distance from
   * the bottom of the plotting area in normalized coordinates
   * where 0 (1) corresponds to the bottom (top).
   */
  yref: 'paper' | YAxisName;

  /**
   * Sets the annotation's y position.
   * If the axis `type` is *log*, then you must take the log of your desired range.
   * If the axis `type` is *date*, it should be date strings, like date data,
   * though Date objects and unix milliseconds will be accepted and converted to strings.
   * If the axis `type` is *category*, it should be numbers, using the scale where each
   * category is assigned a serial number from zero in the order it appears.
   */
  y: number | string;

  /**
   * Sets the text box's vertical position anchor
   * This anchor binds the `y` position to the *top*, *middle* or *bottom* of the annotation.
   * For example, if `y` is set to 1, `yref` to *paper* and `yanchor` to *top* then the
   * top-most portion of the annotation lines up with the top-most edge of the plotting area.
   * If *auto*, the anchor is equivalent to *middle* for data-referenced annotations or if
   * there is an arrow, whereas for paper-referenced with no arrow, the anchor picked
   * corresponds to the closest side.
   */
  yanchor: 'auto' | 'top' | 'middle' | 'bottom';

  /**
   * Shifts the position of the whole annotation and arrow up
   * (positive) or down (negative) by this many pixels.
   */
  yshift: number;

  /**
   * Makes this annotation respond to clicks on the plot.
   * If you click a data point that exactly matches the `x` and `y` values of this annotation,
   * and it is hidden (visible: false), it will appear. In *onoff* mode, you must click the same
   * point again to make it disappear, so if you click multiple points, you can show multiple
   * annotations. In *onout* mode, a click anywhere else in the plot (on another data point or not)
   * will hide this annotation. If you need to show/hide this annotation in response to different
   * `x` or `y` values, you can set `xclick` and/or `yclick`. This is useful for example to label
   * the side of a bar. To label markers though, `standoff` is preferred over `xclick` and `yclick`.
   */
  clicktoshow: false | 'onoff' | 'onout';

  /**
   * Toggle this annotation when clicking a data point whose `x` value
   * is `xclick` rather than the annotation's `x` value.
   */
  xclick: any;

  /**
   * Toggle this annotation when clicking a data point whose `y` value
   * is `yclick` rather than the annotation's `y` value.
   */
  yclick: any;

  /**
   * Sets text to appear when hovering over this annotation.
   * If omitted or blank, no hover label will appear.
   */
  hovertext: string;

  hoverlabel: Partial<HoverLabel>;

  /**
   * Determines whether the annotation text box captures mouse move and click events,
   * or allows those events to pass through to data points in the plot that may be
   * behind the annotation. By default `captureevents` is *false* unless `hovertext`
   * is provided. If you use the event `plotly_clickannotation` without `hovertext`
   * you must explicitly enable `captureevents`.
   */
  captureevents: boolean;
}

export interface Domain {
  x: number[];
  y: number[];
  row: number;
  column: number;
}

export interface Padding {
  /**
   * The amount of padding (in px) along the top of the component.
   */
  t: number;
  /**
   * The amount of padding (in px) on the right side of the component.
   */
  r: number;
  /**
   * The amount of padding (in px) along the bottom of the component.
   */
  b: number;
  /**
   * The amount of padding (in px) on the left side of the component.
   */
  l: number;
  editType: 'arraydraw';
}

/**
 * 'Sets the pattern within the marker.
 */
export interface Pattern {
  /**
   * Sets the shape of the pattern fill.
   * By default, no pattern is used for filling the area.
   */
  shape?: '' | '/' | '\\' | 'x' | '-' | '|' | '+' | '.';
  /**
   * Determines whether `marker.color` should be used
   * as a default to `bgcolor` or a `fgcolor`.
   */
  fillmode?: 'replace' | 'overlay';
  /**
   * When there is no colorscale sets the color of background pattern fill.
   * Defaults to a `marker.color` background when `fillmode` is *overlay*.
   * Otherwise, defaults to a transparent background.
   */
  bgcolor?: string;
  /**
   * When there is no colorscale sets the color of foreground pattern fill.
   * Defaults to a `marker.color` background when `fillmode` is *replace*.
   * Otherwise, defaults to dark grey or white
   * to increase contrast with the `bgcolor`.
   */
  fgcolor?: string;
  /**
   * Sets the opacity of the foreground pattern fill.
   * Defaults to a 0.5 when `fillmode` is *overlay*.
   * Otherwise, defaults to 1.
   */
  fgopacity?: string;
  /**
   * Sets the size of unit squares of the pattern fill in pixels,
   * which corresponds to the interval of repetition of the pattern.
   */
  size?: number;
  /**
   * Sets the solidity of the pattern fill.
   * Solidity is roughly the fraction of the area filled by the pattern.
   * Solidity of 0 shows only the background color without pattern
   * and solidty of 1 shows only the foreground color without pattern.
   */
  solidity?: number;
}
