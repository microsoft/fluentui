import * as React from 'react';
import { classNamesFunction, getId, getRTL } from '@fluentui/react/lib/Utilities';
import {
  IFunnelChartDataPoint,
  IFunnelChartProps,
  IFunnelChartStyleProps,
  IFunnelChartStyles,
} from './FunnelChart.types';
import { FocusZone, FocusZoneDirection } from '@fluentui/react-focus';
import { ILegend, ILegendContainer, Legends } from '../Legends/index';
import { Callout, DirectionalHint } from '@fluentui/react/lib/Callout';
import { ChartHoverCard } from '../../utilities/ChartHoverCard/ChartHoverCard';
import { formatToLocaleString } from '@fluentui/chart-utilities';
import { IImageExportOptions } from '../../types/index';
import { toImage as convertToImage } from '../../utilities/image-export-utils';
import { getContrastTextColor } from '../../utilities/utilities';
import {
  getHorizontalFunnelSegmentGeometry,
  getVerticalFunnelSegmentGeometry,
  getSegmentTextProps,
  getStackedHorizontalFunnelSegmentGeometry,
  getStackedVerticalFunnelSegmentGeometry,
} from './funnelGeometry';

const getClassNames = classNamesFunction<IFunnelChartStyleProps, IFunnelChartStyles>();

export const FunnelChartBase: React.FunctionComponent<IFunnelChartProps> = React.forwardRef<
  HTMLDivElement,
  IFunnelChartProps
>((props, forwardedRef) => {
  const _tooltipId: string = getId('FunnelChartTooltipId_');
  const _emptyChartId: string = getId('_FunnelChart_empty');
  const isRTL = getRTL();

  const [hoveredStage, setHoveredStage] = React.useState<string | null>(null);
  const [isCalloutVisible, setIsCalloutVisible] = React.useState(false);
  const [calloutData, setCalloutData] = React.useState<IFunnelChartDataPoint | null>(null);
  const [refSelected, setRefSelected] = React.useState<SVGElement | null>(null);
  const [selectedLegends, setSelectedLegends] = React.useState<string[]>([]);
  const chartContainerRef = React.useRef<HTMLDivElement | null>(null);
  const legendsRef = React.useRef<ILegendContainer | null>(null);
  const isStacked = isStackedFunnelData(props.data);

  React.useEffect(() => {
    if (props.legendProps?.selectedLegends) {
      setSelectedLegends(props.legendProps.selectedLegends);
    }
  }, [props.legendProps?.selectedLegends]);

  React.useImperativeHandle(
    props.componentRef,
    () => ({
      chartContainer: chartContainerRef ?? null,
      toImage: (opts?: IImageExportOptions): Promise<string> => {
        return convertToImage(chartContainerRef.current, legendsRef.current?.toSVG, getRTL(), opts);
      },
    }),
    [],
  );

  function _handleHover(data: IFunnelChartDataPoint, mouseEvent: React.MouseEvent<SVGElement>) {
    mouseEvent?.persist();
    setHoveredStage(data.stage as string);
    setCalloutData(data);
    setIsCalloutVisible(true);
    setRefSelected(mouseEvent.currentTarget);
  }

  function _handleFocus(data: IFunnelChartDataPoint, focusEvent: React.FocusEvent<SVGPathElement>) {
    focusEvent?.persist();
    setCalloutData(data);
    setIsCalloutVisible(true);
    setRefSelected(focusEvent.currentTarget);
  }

  function _handleStackedHover(
    stage: string,
    subValue: { category: string; value: number; color: string },
    mouseEvent: React.MouseEvent<SVGElement>,
  ) {
    mouseEvent?.persist();
    setHoveredStage(subValue.category);
    setCalloutData({
      stage,
      value: subValue.value,
      color: subValue.color,
      category: subValue.category,
    } as IFunnelChartDataPoint);
    setIsCalloutVisible(true);
    setRefSelected(mouseEvent.currentTarget);
  }

  function _handleStackedFocus(
    stage: string,
    subValue: { category: string; value: number; color: string },
    focusEvent: React.FocusEvent<SVGPathElement>,
  ) {
    focusEvent?.persist();
    setCalloutData({
      stage,
      value: subValue.value,
      color: subValue.color,
      category: subValue.category,
    } as IFunnelChartDataPoint);
    setIsCalloutVisible(true);
    setRefSelected(focusEvent.currentTarget);
  }

  function _handleMouseOut() {
    setHoveredStage(null);
    setIsCalloutVisible(false);
    setCalloutData(null);
    setRefSelected(null);
  }

  function _onLegendSelectionChange(
    legendsSelected: string[],
    event: React.MouseEvent<HTMLButtonElement>,
    currentLegend?: ILegend,
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
    data: IFunnelChartDataPoint | { stage: string; subValue: { category: string; value: number; color: string } },
    opacity?: number,
  ) {
    if ('subValue' in data) {
      return {
        culture: props.culture,
        onMouseOver:
          opacity === 1
            ? (event: React.MouseEvent<SVGElement>) => _handleStackedHover(data.stage, data.subValue, event)
            : undefined,
        onMouseMove:
          opacity === 1
            ? (event: React.MouseEvent<SVGElement>) => _handleStackedHover(data.stage, data.subValue, event)
            : undefined,
        onFocus: (event: React.FocusEvent<SVGPathElement>) => _handleStackedFocus(data.stage, data.subValue, event),
        onBlur: () => _handleMouseOut(),
        onMouseOut: () => _handleMouseOut(),
      };
    } else {
      return {
        culture: props.culture,
        onMouseOver: opacity === 1 ? (event: React.MouseEvent<SVGElement>) => _handleHover(data, event) : undefined,
        onMouseMove: opacity === 1 ? (event: React.MouseEvent<SVGElement>) => _handleHover(data, event) : undefined,
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
  }: {
    show: boolean;
    x: number;
    y: number;
    value: number;
    textColor: string;
  }) {
    if (!show) {
      return null;
    }

    const textElement = (
      <text x={isRTL ? funnelWidth - x : x} y={y} textAnchor="middle" alignmentBaseline="middle" fill={textColor}>
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
    isFocusable,
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
    data: IFunnelChartDataPoint | { stage: string; subValue: { category: string; value: number; color: string } };
    isFocusable?: boolean;
  }) {
    const eventHandlers = _getEventHandlerProps(data, opacity);
    const textColor = getContrastTextColor(fill, props.theme!);

    return (
      <g key={key}>
        <path d={pathD} fill={fill} opacity={opacity} {...eventHandlers} data-is-focusable={isFocusable} />
        {textProps && <g {...eventHandlers}>{_renderSegmentText({ ...textProps, textColor })}</g>}
      </g>
    );
  }

  function _createFunnel(
    containerHeight: number,
    containerWidth: number,
  ): // eslint-disable-next-line @typescript-eslint/no-deprecated
  JSX.Element[] {
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
        isFocusable: legendHighlighted(d.stage as string) || noLegendHighlighted() ? true : false,
      });
    });
  }

  function isStackedFunnelData(data: IFunnelChartDataPoint[]): boolean {
    return Array.isArray(data) && data.every(stage => Array.isArray(stage.subValues));
  }

  function _renderStackedSegment(
    stage: IFunnelChartDataPoint,
    subValue: { value: number; color: string; category: string },
    stageIndex: number,
    subValueIndex: number,
    geometryParams: {
      stages: IFunnelChartDataPoint[];
      totals: number[];
      maxTotal: number;
      funnelWidth: number;
      funnelHeight: number;
      isRTL: boolean;
    },
  ): // eslint-disable-next-line @typescript-eslint/no-deprecated
  JSX.Element {
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
      isFocusable:
        (isStackedFunnelData(props.data) && legendHighlighted(subValue.category)) || noLegendHighlighted()
          ? true
          : false,
    });
  }

  function _createStackedFunnel(
    containerHeight: number,
    containerWidth: number,
  ): // eslint-disable-next-line @typescript-eslint/no-deprecated
  JSX.Element[] {
    const { data } = props;

    const stages = data;
    const totals = stages.map(s => s?.subValues?.reduce((sum, subValue) => sum + subValue.value, 0) ?? 0);
    const maxTotal = Math.max(...totals);

    const funnelWidth = containerWidth;
    const funnelHeight = containerHeight * 0.8;

    // eslint-disable-next-line @typescript-eslint/no-deprecated
    const paths: JSX.Element[] = [];

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
  JSX.Element {
    if (props.hideLegend) {
      return <></>;
    }
    let legends: ILegend[];

    if (isStacked) {
      // Collect unique categories and their color
      const categoryMap: Record<string, string> = {};
      props.data.forEach((stage: IFunnelChartDataPoint) => {
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
      legends = props.data.map((d: IFunnelChartDataPoint) => ({
        title: d.stage as string,
        color: d.color!,
        hoverAction: () => setHoveredStage(d.stage as string),
        onMouseOutAction: () => setHoveredStage(null),
      }));
    }

    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Legends
          ref={legendsRef}
          legends={legends}
          centerLegends={true}
          onChange={_onLegendSelectionChangeCallback}
          {...props.legendProps}
        />
      </div>
    );
  }

  function _isChartEmpty(): boolean {
    return !(props.data && props.data.length > 0);
  }

  const calloutProps = {
    isCalloutVisible,
    directionalHint: DirectionalHint.topAutoEdge,
    id: `toolTip${_tooltipId}`,
    target: refSelected,
    color: calloutData?.color,
    XValue: calloutData?.stage,
    YValue: calloutData?.value,
    isBeakVisible: false,
    gapSpace: 15,
    onDismiss: () => {
      setIsCalloutVisible(false);
    },
    preventDismissOnLostFocus: true,
    ...props.calloutProps,
  };

  const width = props.width || 350;
  const height = props.height || 500;
  const classNames = getClassNames(props.styles!, {
    theme: props.theme!,
    className: props.className,
    chartWidth: width,
    chartHeight: height,
  });

  const funnelMarginTop = 40;
  const funnelWidth = width * 0.8;
  const funnelOffsetX = (width - funnelWidth) / 2;

  return !_isChartEmpty() ? (
    <div ref={chartContainerRef} className={classNames.root}>
      <FocusZone direction={FocusZoneDirection.horizontal}>
        <svg width={width} height={height} className={classNames.chart} role={'img'} aria-label={props.chartTitle}>
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
          {isCalloutVisible && (
            <Callout {...calloutProps}>
              <ChartHoverCard
                XValue={calloutProps?.XValue as string}
                YValue={calloutProps?.YValue}
                color={calloutProps?.color}
              />
            </Callout>
          )}
        </svg>
      </FocusZone>
      {_renderLegends()}
    </div>
  ) : (
    <div id={_emptyChartId} role={'alert'} style={{ opacity: '0' }} aria-label={'Graph has no data to display'} />
  );
});
FunnelChartBase.displayName = 'FunnelChart';
// eslint-disable-next-line @typescript-eslint/no-deprecated
FunnelChartBase.defaultProps = {
  orientation: 'vertical',
};
