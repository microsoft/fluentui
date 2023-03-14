/* eslint-disable no-restricted-globals */
//import { ScaleBand, ScaleLinear, ScaleTime } from 'd3-scale';
import {
  // createDateXAxis,
  // createNumericXAxis,
  // createStringXAxis,
  getDomainNRangeValues,
  //XAxisTypes,
} from '../../../utilities/utilities';
import { ICreateXAxisWorkerMessage, ICreateXAxisWorkerResponse } from '../CartesianChart.base';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ctx: Worker = self as any;

ctx.onmessage = (e: MessageEvent) => {
  const request = e.data as ICreateXAxisWorkerMessage;
  const { props, margins, containerWidth, rtl } = request;
  const {
    points,
    chartType,
    xAxisType,
    barwidth,
    tickValues,
    xAxisTickCount,
    xAxistickSize,
    tickPadding,
    xAxisPadding,
    // culture,
    // dateLocalizeOptions,
    // timeFormatLocale,
    // customDateTimeFormatter,
    // tickParams,
    showXAxisLablesTooltip,
    // datasetForXAxisDomain,
  } = props;
  const xAxisElement = null;

  const XAxisParams = {
    domainNRangeValues: getDomainNRangeValues(
      points,
      margins,
      containerWidth,
      chartType,
      rtl,
      xAxisType,
      barwidth!,
      tickValues!,
    ),
    xAxisElement: xAxisElement!,
    showRoundOffXTickValues: true,
    xAxisCount: xAxisTickCount,
    xAxistickSize: xAxistickSize,
    tickPadding: tickPadding || showXAxisLablesTooltip ? 5 : 10,
    xAxisPadding: xAxisPadding,
  };
  /**
   * These scales used for 2 purposes.
   * 1. To create x and y axis
   * 2. To draw the graph.
   * For area/line chart using same scales. For other charts, creating their own scales to draw the graph.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // let xScale: ScaleLinear<number, number, never> | ScaleBand<string> | ScaleTime<number, number, never>;
  // switch (xAxisType!) {
  //   case XAxisTypes.NumericAxis:
  //     xScale = createNumericXAxis(XAxisParams, culture);
  //     break;
  //   case XAxisTypes.DateAxis:
  //     xScale = createDateXAxis(
  //       XAxisParams,
  //       tickParams!,
  //       culture,
  //       dateLocalizeOptions,
  //       timeFormatLocale,
  //       customDateTimeFormatter,
  //     );
  //     break;
  //   case XAxisTypes.StringAxis:
  //     xScale = createStringXAxis(XAxisParams, tickParams!, datasetForXAxisDomain!, culture);
  //     break;
  //   default:
  //     xScale = createNumericXAxis(XAxisParams, culture);
  // }

  const response: ICreateXAxisWorkerResponse = { XAxisParams, XAxisElement: xAxisElement };
  ctx.postMessage(response);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default null as any;
