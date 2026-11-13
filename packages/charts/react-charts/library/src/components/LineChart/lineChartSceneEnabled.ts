import type { LineChartProps } from './LineChart.types';

/** Select the additive scene only when an extension is explicitly supplied. */
export const isLineChartSceneEnabled = (props: LineChartProps): boolean => {
  const extensions = [
    props.yScales,
    props.getSeriesYScaleKey,
    props.getSeriesKey,
    props.getPointKey,
    props.markerClipPadding,
    props.xAxisLabelRows,
    props.onRenderAxisDecoration,
    props.onRenderPlotLayers,
    props.onRenderSeries,
    props.onRenderMarker,
    props.interactionOptions,
    props.interactionState,
    props.onInteractionChange,
    props.motion,
    props.annotationLayout,
    props.getAnnotations,
    props.onRenderAnnotationContent,
    props.onRenderAnnotationConnector,
  ];
  if (extensions.some(value => value !== undefined)) {
    return true;
  }
  const xAxis = props.xAxis;
  if (
    xAxis &&
    [xAxis.domain, xAxis.nice, xAxis.inset, xAxis.line, xAxis.grid, xAxis.axis].some(value => value !== undefined)
  ) {
    return true;
  }
  for (const axis of [props.yAxis, props.secondaryYScaleOptions]) {
    if (
      axis &&
      [
        axis.domain,
        axis.nice,
        axis.includeZero,
        axis.inset,
        axis.tickValues,
        axis.tickCount,
        axis.tickPolicy,
        axis.tickFormat,
        axis.line,
        axis.grid,
        axis.axis,
      ].some(value => value !== undefined)
    ) {
      return true;
    }
  }
  return (
    props.data.lineChartData?.some(
      series => series.baselineFill !== undefined || series.lineOptions?.connectGaps !== undefined,
    ) === true ||
    props.annotations?.some(
      annotation =>
        annotation.action !== undefined ||
        ('yScaleKey' in annotation.coordinates && annotation.coordinates.yScaleKey !== undefined),
    ) === true
  );
};
