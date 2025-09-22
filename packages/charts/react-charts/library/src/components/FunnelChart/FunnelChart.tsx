import * as React from 'react';
import { useId } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import { useRtl } from '../../utilities/index';
import { FunnelChartDataPoint, FunnelChartProps } from './FunnelChart.types';
import { Legend, Legends, LegendContainer } from '../Legends/index';
import { useFocusableGroup } from '@fluentui/react-tabster';
import { ChartPopover } from '../CommonComponents/ChartPopover';
import { formatToLocaleString } from '@fluentui/chart-utilities';
import { getContrastTextColor } from '../../utilities/colors';
import { useFunnelChartStyles } from './useFunnelChartStyles.styles';
import {
  getHorizontalFunnelSegmentGeometry,
  getVerticalFunnelSegmentGeometry,
  getSegmentTextProps,
  getStackedHorizontalFunnelSegmentGeometry,
  getStackedVerticalFunnelSegmentGeometry,
} from './funnelGeometry';
import { ChartPopoverProps, ImageExportOptions } from '../../index';
import { toImage } from '../../utilities/image-export-utils';

export const FunnelChart: React.FunctionComponent<FunnelChartProps> = React.forwardRef<
  HTMLDivElement,
  FunnelChartProps
>((props, forwardedRef) => {
  const _emptyChartId: string = useId('_FunnelChart_empty');
  const isRTL = useRtl();

  const [hoveredStage, setHoveredStage] = React.useState<string | null>(null);
  const [calloutData, setCalloutData] = React.useState<FunnelChartDataPoint | null>(null);
  const [selectedLegends, setSelectedLegends] = React.useState<string[]>([]);
  const [clickPosition, setClickPosition] = React.useState({ x: 0, y: 0 });
  const [isPopoverOpen, setPopoverOpen] = React.useState(false);
  const chartContainerRef = React.useRef<HTMLDivElement | null>(null);
  const isStacked = isStackedFunnelData(props.data);
  const _legendsRef = React.useRef<LegendContainer>(null);

  React.useEffect(() => {
    if (props.legendProps?.selectedLegends) {
      setSelectedLegends(props.legendProps.selectedLegends);
    }
  }, [props.legendProps?.selectedLegends]);

  React.useImperativeHandle(
    props.componentRef,
    () => ({
      toImage: (opts?: ImageExportOptions): Promise<string> => {
        return toImage(chartContainerRef.current, _legendsRef.current?.toSVG, isRTL, opts);
      },
    }),
    [],
  );

  function _handleHover(data: FunnelChartDataPoint, mouseEvent: React.MouseEvent<SVGElement>) {
    mouseEvent?.persist();
    updatePosition(mouseEvent.clientX, mouseEvent.clientY);
    setCalloutData(data);
    setPopoverOpen(true);
  }

  function _handleFocus(data: FunnelChartDataPoint, focusEvent: React.FocusEvent<SVGPathElement>) {
    focusEvent?.persist();
    let x = 0;
    let y = 0;
    const targetRect = (focusEvent.target as SVGPathElement).getBoundingClientRect();
    x = targetRect.left + targetRect.width / 2;
    y = targetRect.top + targetRect.height / 2;

    updatePosition(x, y);
    setCalloutData(data);
    setPopoverOpen(true);
  }

  function _handleStackedHover(
    stage: string,
    subValue: { category: string; value: number; color: string },
    mouseEvent: React.MouseEvent<SVGElement>,
  ) {
    mouseEvent?.persist();
    updatePosition(mouseEvent.clientX, mouseEvent.clientY);
    setCalloutData({
      stage,
      value: subValue.value,
      color: subValue.color,
      category: subValue.category,
    } as FunnelChartDataPoint);
    setPopoverOpen(true);
  }

  function _handleStackedFocus(
    stage: string,
    subValue: { category: string; value: number; color: string },
    focusEvent: React.FocusEvent<SVGPathElement>,
  ) {
    focusEvent?.persist();
    let x = 0;
    let y = 0;
    const targetRect = (focusEvent.target as SVGPathElement).getBoundingClientRect();
    x = targetRect.left + targetRect.width / 2;
    y = targetRect.top + targetRect.height / 2;

    updatePosition(x, y);
    setCalloutData({
      stage,
      value: subValue.value,
      color: subValue.color,
      category: subValue.category,
    } as FunnelChartDataPoint);
    setPopoverOpen(true);
  }

  function _handleMouseOut() {
    setHoveredStage(null);
    setPopoverOpen(false);
    setCalloutData(null);
  }

  function _onLegendSelectionChange(
    legendsSelected: string[],
    event: React.MouseEvent<HTMLButtonElement>,
    currentLegend?: Legend,
  ): void {
    if (props.legendProps?.canSelectMultipleLegends) {
      setSelectedLegends(legendsSelected);
    } else {
      setSelectedLegends(legendsSelected.slice(-1));
    }

    if (props.legendProps?.onChange) {
      props.legendProps.onChange(legendsSelected, event, currentLegend);
    }
  }

  const _onLegendSelectionChangeCallback = React.useCallback(_onLegendSelectionChange, [props.legendProps]);

  function getHighlightedLegend(): string[] {
    return selectedLegends.length > 0 ? selectedLegends : hoveredStage ? [hoveredStage] : [];
  }

  function legendHighlighted(legend: string): boolean {
    return getHighlightedLegend().includes(legend);
  }

  function noLegendHighlighted(): boolean {
    return getHighlightedLegend().length === 0;
  }

  function _getEventHandlerProps(
    data: FunnelChartDataPoint | { stage: string; subValue: { category: string; value: number; color: string } },
    opacity?: number,
  ) {
    if ('subValue' in data) {
      return {
        culture: props.culture,
        onMouseOver:
          opacity == 1
            ? (event: React.MouseEvent<SVGElement>) => _handleStackedHover(data.stage, data.subValue, event)
            : undefined,
        onMouseMove:
          opacity == 1
            ? (event: React.MouseEvent<SVGElement>) => _handleStackedHover(data.stage, data.subValue, event)
            : undefined,
        onFocus: (event: React.FocusEvent<SVGPathElement>) => _handleStackedFocus(data.stage, data.subValue, event),
        onBlur: () => _handleMouseOut(),
        onMouseOut: () => _handleMouseOut(),
      };
    } else {
      return {
        culture: props.culture,
        onMouseOver: opacity == 1 ? (event: React.MouseEvent<SVGElement>) => _handleHover(data, event) : undefined,
        onMouseMove: opacity == 1 ? (event: React.MouseEvent<SVGElement>) => _handleHover(data, event) : undefined,
        onFocus: (event: React.FocusEvent<SVGPathElement>) => _handleFocus(data, event),
        onBlur: () => _handleMouseOut(),
        onMouseOut: () => _handleMouseOut(),
      };
    }
  }

  function _renderSegmentText({
    show,
    x,
    y,
    value,
    textColor,
    opacity,
  }: {
    show: boolean;
    x: number;
    y: number;
    value: number;
    textColor: string;
    opacity: number;
  }) {
    if (!show) {
      return null;
    }

    const textElement = (
      <text
        x={isRTL ? funnelWidth - x : x}
        y={y}
        opacity={opacity}
        textAnchor="middle"
        alignmentBaseline="middle"
        fill={textColor}
      >
        {formatToLocaleString(value.toString(), props.culture) as React.ReactNode}
      </text>
    );

    if (isRTL) {
      return <g transform={`scale(-1,1) translate(${-funnelWidth},0)`}>{textElement}</g>;
    }
    return textElement;
  }

  function _renderFunnelSegment({
    key,
    pathD,
    fill,
    opacity,
    textProps,
    data,
    tabIndex,
  }: {
    key: string | number;
    pathD: string;
    fill: string;
    opacity: number;
    textProps?: {
      show: boolean;
      x: number;
      y: number;
      value: number;
    };
    data: FunnelChartDataPoint | { stage: string; subValue: { category: string; value: number; color: string } };
    tabIndex?: number;
  }) {
    const eventHandlers = _getEventHandlerProps(data, opacity);
    const textColor = getContrastTextColor(fill);

    return (
      <g key={key}>
        <path d={pathD} fill={fill} opacity={opacity} {...eventHandlers} tabIndex={tabIndex} />
        {textProps && <g {...eventHandlers}>{_renderSegmentText({ ...textProps, textColor, opacity })}</g>}
      </g>
    );
  }

  function _createFunnel(
    containerHeight: number,
    containerWidth: number,
  ): // eslint-disable-next-line @typescript-eslint/no-deprecated
  JSXElement[] {
    const { data } = props;
    const funnelWidth = containerWidth;
    const funnelHeight = containerHeight * 0.8;

    return data.map((d, i) => {
      const geometryProps =
        props.orientation === 'vertical'
          ? getVerticalFunnelSegmentGeometry({ d, i, data, funnelWidth, funnelHeight, isRTL })
          : getHorizontalFunnelSegmentGeometry({ d, i, data, funnelWidth, funnelHeight, isRTL });

      const { pathD, textX, textY, availableWidth } = geometryProps;
      const minTextWidth = 16;
      const eventHandlerProps = _getEventHandlerProps(d);
      const textProps = getSegmentTextProps({
        availableWidth,
        minTextWidth,
        textX,
        textY,
        value: d.value!,
        ...eventHandlerProps,
      });

      return _renderFunnelSegment({
        key: i,
        pathD,
        fill: d.color!,
        opacity: legendHighlighted(d.stage as string) || noLegendHighlighted() ? 1 : 0.1,
        textProps,
        data: d,
        tabIndex: legendHighlighted(d.stage as string) || noLegendHighlighted() ? 0 : undefined,
      });
    });
  }

  function isStackedFunnelData(data: FunnelChartDataPoint[]): boolean {
    return Array.isArray(data) && data.every(stage => Array.isArray(stage.subValues));
  }

  function _renderStackedSegment(
    stage: FunnelChartDataPoint,
    subValue: { value: number; color: string; category: string },
    stageIndex: number,
    subValueIndex: number,
    geometryParams: {
      stages: FunnelChartDataPoint[];
      totals: number[];
      maxTotal: number;
      funnelWidth: number;
      funnelHeight: number;
      isRTL: boolean;
    },
  ): // eslint-disable-next-line @typescript-eslint/no-deprecated
  JSXElement {
    // Ensure stages have subValues for geometry functions
    const stagesWithSubValues = geometryParams.stages.map(s => ({
      ...s,
      subValues: s.subValues || [],
    }));
    const geom =
      props.orientation === 'vertical'
        ? getStackedVerticalFunnelSegmentGeometry({
            ...geometryParams,
            stages: stagesWithSubValues,
            i: stageIndex,
            k: subValueIndex,
          })
        : getStackedHorizontalFunnelSegmentGeometry({
            ...geometryParams,
            stages: stagesWithSubValues,
            i: stageIndex,
            k: subValueIndex,
          });

    const minTextWidth = 16;
    const eventHandlerProps = _getEventHandlerProps({ stage: stage.stage as string, subValue });
    const textProps = getSegmentTextProps({
      availableWidth: geom.availableWidth,
      minTextWidth,
      textX: geom.textX,
      textY: geom.textY,
      value: subValue.value,
      ...eventHandlerProps,
    });

    return _renderFunnelSegment({
      key: `${stageIndex}-${subValueIndex}`,
      pathD: geom.pathD,
      fill: subValue.color,
      opacity:
        (isStackedFunnelData(props.data) && legendHighlighted(subValue.category)) || noLegendHighlighted() ? 1 : 0.1,
      textProps,
      data: { stage: stage.stage as string, subValue },
      tabIndex: legendHighlighted(subValue.category) || noLegendHighlighted() ? 0 : undefined,
    });
  }

  function _createStackedFunnel(
    containerHeight: number,
    containerWidth: number,
  ): // eslint-disable-next-line @typescript-eslint/no-deprecated
  JSXElement[] {
    const { data } = props;

    const stages = data;
    const totals = stages.map(s => s?.subValues?.reduce((sum, subValue) => sum + subValue.value, 0) ?? 0);
    const maxTotal = Math.max(...totals);

    const funnelWidth = containerWidth;
    const funnelHeight = containerHeight * 0.8;

    // eslint-disable-next-line @typescript-eslint/no-deprecated
    const paths: JSXElement[] = [];

    const geometryParams = {
      stages,
      totals,
      maxTotal,
      funnelWidth,
      funnelHeight,
      isRTL,
    };

    for (let i = 0; i < stages.length; i++) {
      const cur = stages[i];
      for (let k = 0; k < (cur.subValues ?? []).length; k++) {
        const v = cur.subValues?.[k];
        if (!v) {
          continue;
        }
        paths.push(_renderStackedSegment(cur, v, i, k, geometryParams));
      }
    }
    return paths;
  }

  function _renderLegends(): // eslint-disable-next-line @typescript-eslint/no-deprecated
  JSXElement {
    if (props.hideLegend) {
      return <></>;
    }
    let legends: Legend[];

    if (isStacked) {
      // Collect unique categories and their color
      const categoryMap: Record<string, string> = {};
      props.data.forEach((stage: FunnelChartDataPoint) => {
        (stage.subValues || []).forEach(sub => {
          if (!(sub.category in categoryMap)) {
            categoryMap[sub.category] = sub.color;
          }
        });
      });
      legends = Object.entries(categoryMap).map(([category, color]) => ({
        title: category,
        color,
        hoverAction: () => setHoveredStage(category),
        onMouseOutAction: () => setHoveredStage(null),
      }));
    } else {
      legends = props.data.map((d: FunnelChartDataPoint) => ({
        title: d.stage as string,
        color: d.color!,
        hoverAction: () => setHoveredStage(d.stage as string),
        onMouseOutAction: () => setHoveredStage(null),
      }));
    }

    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Legends
          legends={legends}
          centerLegends={true}
          onChange={_onLegendSelectionChangeCallback}
          {...props.legendProps}
          legendRef={_legendsRef}
        />
      </div>
    );
  }

  function _isChartEmpty(): boolean {
    return !(props.data && props.data.length > 0);
  }

  function updatePosition(newX: number, newY: number) {
    const threshold = 1; // Set a threshold for movement
    const { x, y } = clickPosition;
    // Calculate the distance moved
    const distance = Math.sqrt(Math.pow(newX - x, 2) + Math.pow(newY - y, 2));
    // Update the position only if the distance moved is greater than the threshold
    if (distance > threshold) {
      setClickPosition({ x: newX, y: newY });
      setPopoverOpen(true);
    }
  }

  const classes = useFunnelChartStyles(props);

  const calloutProps: ChartPopoverProps = {
    ...props.calloutProps,
    color: calloutData?.color,
    hoverXValue: calloutData?.stage,
    YValue: calloutData?.value,
  };

  const width = props.width || 350;
  const height = props.height || 500;

  const funnelMarginTop = 40;
  const funnelWidth = width * 0.8;
  const funnelOffsetX = (width - funnelWidth) / 2;
  const focusAttributes = useFocusableGroup();

  return !_isChartEmpty() ? (
    <div ref={chartContainerRef} className={classes.root} {...focusAttributes}>
      <svg width={width} height={height} className={classes.chart} role={'img'} aria-label={props.chartTitle}>
        <g
          transform={
            isRTL
              ? `translate(${funnelOffsetX + funnelWidth}, ${funnelMarginTop}) scale(-1,1)`
              : `translate(${funnelOffsetX}, ${funnelMarginTop})`
          }
        >
          {isStacked
            ? _createStackedFunnel(height - funnelMarginTop, funnelWidth)
            : _createFunnel(height - funnelMarginTop, funnelWidth)}
        </g>
      </svg>
      {isPopoverOpen && (
        <ChartPopover
          {...props.calloutProps}
          XValue={calloutProps?.hoverXValue as string}
          yCalloutValue={calloutProps?.YValue as string}
          culture={props.culture}
          clickPosition={clickPosition}
          isPopoverOpen={isPopoverOpen}
          color={calloutProps?.color}
          isCartesian={false}
        />
      )}
      {_renderLegends()}
    </div>
  ) : (
    <div id={_emptyChartId} role={'alert'} style={{ opacity: '0' }} aria-label={'Graph has no data to display'} />
  );
});
FunnelChart.displayName = 'FunnelChart';
// eslint-disable-next-line @typescript-eslint/no-deprecated
FunnelChart.defaultProps = {
  orientation: 'vertical',
};
