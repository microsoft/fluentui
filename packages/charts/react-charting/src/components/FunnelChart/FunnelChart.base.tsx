import * as React from 'react';
import { classNamesFunction, getId, getRTL } from '@fluentui/react/lib/Utilities';
import {
  IFunnelChartDataPoint,
  IFunnelChartProps,
  IFunnelChartStyleProps,
  IFunnelChartStyles,
} from './FunnelChart.types';
import { FocusZone, FocusZoneDirection } from '@fluentui/react-focus';
import { ILegend, Legends } from '../Legends/index';
import { Callout, DirectionalHint } from '@fluentui/react/lib/Callout';
import { ChartHoverCard } from '../../utilities/ChartHoverCard/ChartHoverCard';
import { formatToLocaleString } from '@fluentui/chart-utilities';
import { IImageExportOptions } from '../../types/index';
import { toImage as convertToImage } from '../../utilities/image-export-utils';
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
  const [refSelected, setRefSelected] = React.useState<any>(null);
  const [selectedLegends, setSelectedLegends] = React.useState<string[]>([]);
  const chartContainerRef = React.useRef<any>(null);
  const legendsRef = React.useRef<any>(null);

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

  function _handleStackedHover(
    stage: string,
    subValue: { category: string; value: number; color: string },
    mouseEvent: React.MouseEvent<SVGElement>,
  ) {
    mouseEvent?.persist();
    setHoveredStage(stage);
    setCalloutData({
      stage,
      value: subValue.value,
      color: subValue.color,
      category: subValue.category,
    } as IFunnelChartDataPoint);
    setIsCalloutVisible(true);
    setRefSelected(mouseEvent.currentTarget);
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

  function getHighlightedLegend(): string[] {
    return selectedLegends.length > 0 ? selectedLegends : hoveredStage ? [hoveredStage] : [];
  }

  function legendHighlighted(legend: string): boolean {
    return getHighlightedLegend().includes(legend);
  }

  function noLegendHighlighted(): boolean {
    return getHighlightedLegend().length === 0;
  }

  function _createFunnel(containerHeight: number, containerWidth: number): JSX.Element[] {
    const { data, culture } = props;
    const funnelWidth = containerWidth;
    const funnelHeight = containerHeight * 0.8;

    if (props.orientation === 'horizontal') {
      return data.map((d, i) => {
        const { pathD, textX, textY, availableWidth } = getHorizontalFunnelSegmentGeometry({
          d,
          i,
          data,
          funnelWidth,
          funnelHeight,
          isRTL,
        });
        const minTextWidth = 24;
        const textProps = getSegmentTextProps({
          availableWidth,
          minTextWidth,
          textX,
          textY,
          value: d.value!,
          culture,
          onMouseOver: event => _handleHover(d, event),
          onMouseMove: event => _handleHover(d, event),
          onMouseOut: () => _handleMouseOut(),
        });
        return renderFunnelSegment({
          key: i,
          pathD,
          fill: d.color!,
          opacity: legendHighlighted(d.stage as string) || noLegendHighlighted() ? 1 : 0.1,
          onMouseOver: event => _handleHover(d, event),
          onMouseMove: event => _handleHover(d, event),
          onMouseOut: () => _handleMouseOut(),
          textProps,
        });
      });
    } else {
      return data.map((d, i) => {
        const { pathD, textX, textY, availableWidth } = getVerticalFunnelSegmentGeometry({
          d,
          i,
          data,
          funnelWidth,
          funnelHeight,
          isRTL,
        });
        const minTextWidth = 24;
        const textProps = getSegmentTextProps({
          availableWidth,
          minTextWidth,
          textX,
          textY,
          value: d.value!,
          culture,
          onMouseOver: event => _handleHover(d, event),
          onMouseMove: event => _handleHover(d, event),
          onMouseOut: () => _handleMouseOut(),
        });
        return renderFunnelSegment({
          key: i,
          pathD,
          fill: d.color!,
          opacity: legendHighlighted(d.stage as string) || noLegendHighlighted() ? 1 : 0.1,
          onMouseOver: event => _handleHover(d, event),
          onMouseMove: event => _handleHover(d, event),
          onMouseOut: () => _handleMouseOut(),
          textProps,
        });
      });
    }
  }

  function isStackedFunnelData(data: IFunnelChartDataPoint[]): boolean {
    return Array.isArray(data) && data.every(stage => Array.isArray(stage.subValues));
  }

  function _createStackedFunnel(containerHeight: number, containerWidth: number): JSX.Element[] {
    const { data, culture, orientation = 'horizontal' } = props;

    const stages = data;
    const totals = stages.map(s => s?.subValues?.reduce((sum, s) => sum + s.value, 0) ?? 0);
    const maxTotal = Math.max(...totals);

    const funnelWidth = containerWidth;
    const funnelHeight = containerHeight * 0.8;

    const paths: JSX.Element[] = [];

    if (orientation === 'horizontal') {
      for (let i = 0; i < stages.length; i++) {
        const cur = stages[i];
        for (let k = 0; k < (cur.subValues ?? []).length; k++) {
          const v = cur.subValues?.[k];
          if (!v) continue;
          const geom = getStackedHorizontalFunnelSegmentGeometry({
            i,
            k,
            stages,
            totals,
            maxTotal,
            funnelWidth,
            funnelHeight,
          });
          const minTextWidth = 24;
          const textProps = getSegmentTextProps({
            availableWidth: geom.availableWidth,
            minTextWidth,
            textX: geom.textX,
            textY: geom.textY,
            value: v.value,
            culture,
            onMouseOver: event => _handleStackedHover(cur.stage as string, v, event),
            onMouseMove: event => _handleStackedHover(cur.stage as string, v, event),
            onMouseOut: () => _handleMouseOut(),
          });
          paths.push(
            renderFunnelSegment({
              key: `${i}-${k}`,
              pathD: geom.pathD,
              fill: v.color,
              opacity:
                (isStackedFunnelData(props.data) && legendHighlighted(v.category)) || noLegendHighlighted() ? 1 : 0.1,
              onMouseOver: event => _handleStackedHover(cur.stage as string, v, event),
              onMouseMove: event => _handleStackedHover(cur.stage as string, v, event),
              onMouseOut: () => _handleMouseOut(),
              textProps,
            }),
          );
        }
      }
    } else {
      for (let i = 0; i < stages.length; i++) {
        const cur = stages[i];
        for (let k = 0; k < (cur.subValues ?? []).length; k++) {
          const v = cur.subValues?.[k];
          if (!v) continue;
          const geom = getStackedVerticalFunnelSegmentGeometry({
            i,
            k,
            stages,
            totals,
            maxTotal,
            funnelWidth,
            funnelHeight,
          });
          const minTextWidth = 24;
          const textProps = getSegmentTextProps({
            availableWidth: geom.availableWidth,
            minTextWidth,
            textX: geom.textX,
            textY: geom.textY,
            value: v.value,
            culture,
            onMouseOver: event => _handleStackedHover(cur.stage as string, v, event),
            onMouseMove: event => _handleStackedHover(cur.stage as string, v, event),
            onMouseOut: () => _handleMouseOut(),
          });
          paths.push(
            renderFunnelSegment({
              key: `${i}-${k}`,
              pathD: geom.pathD,
              fill: v.color,
              opacity:
                (isStackedFunnelData(props.data) && legendHighlighted(v.category)) || noLegendHighlighted() ? 1 : 0.1,
              onMouseOver: event => _handleStackedHover(cur.stage as string, v, event),
              onMouseMove: event => _handleStackedHover(cur.stage as string, v, event),
              onMouseOut: () => _handleMouseOut(),
              textProps,
            }),
          );
        }
      }
    }
    return paths;
  }

  function _renderLegends(): JSX.Element {
    if (props.hideLegend) {
      return <></>;
    }

    const funnelData = props.data;

    // For stacked funnel, show only the unique categories as legends (e.g., 'A', 'B')
    if (isStackedFunnelData(funnelData)) {
      // Collect unique categories and their color
      const categoryMap: Record<string, string> = {};
      funnelData.forEach((stage: IFunnelChartDataPoint) => {
        (stage.subValues || []).forEach(sub => {
          if (!(sub.category in categoryMap)) {
            categoryMap[sub.category] = sub.color;
          }
        });
      });
      const legends: ILegend[] = Object.entries(categoryMap).map(([category, color]) => ({
        title: category,
        color,
        hoverAction: () => setHoveredStage(category),
        onMouseOutAction: () => setHoveredStage(null),
      }));

      return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Legends
            legends={legends}
            centerLegends
            onChange={_onLegendSelectionChange}
            ref={legendsRef}
            {...props.legendProps}
          />
        </div>
      );
    }

    const legends: ILegend[] = funnelData.map((d: IFunnelChartDataPoint) => ({
      title: d.stage as string,
      color: d.color!,
      hoverAction: () => setHoveredStage(d.stage as string),
      onMouseOutAction: () => setHoveredStage(null),
    }));

    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Legends
          legends={legends}
          centerLegends
          onChange={_onLegendSelectionChange}
          ref={legendsRef}
          {...props.legendProps}
        />
      </div>
    );
  }

  function _isChartEmpty(): boolean {
    return !(props.data && props.data.length > 0);
  }

  const calloutProps = {
    isCalloutVisible: isCalloutVisible,
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
    ...props.calloutProps!,
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
          <g transform={`translate(${funnelOffsetX}, ${funnelMarginTop})`}>
            {isStackedFunnelData(props.data)
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
FunnelChartBase.defaultProps = {
  orientation: 'horizontal',
};

function renderSegmentText({
  show,
  x,
  y,
  value,
  culture,
  onMouseOver,
  onMouseMove,
  onMouseOut,
}: {
  show: boolean;
  x: number;
  y: number;
  value: number;
  culture: string | undefined;
  onMouseOver: (event: React.MouseEvent<SVGElement>) => void;
  onMouseMove: (event: React.MouseEvent<SVGElement>) => void;
  onMouseOut: () => void;
}) {
  if (!show) return null;
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      alignmentBaseline="middle"
      onMouseOver={onMouseOver}
      onMouseMove={onMouseMove}
      onMouseOut={onMouseOut}
    >
      {formatToLocaleString(value.toString(), culture)}
    </text>
  );
}

function renderFunnelSegment({
  key,
  pathD,
  fill,
  opacity,
  onMouseOver,
  onMouseMove,
  onMouseOut,
  textProps,
}: {
  key: string | number;
  pathD: string;
  fill: string;
  opacity: number;
  onMouseOver: (event: React.MouseEvent<SVGElement>) => void;
  onMouseMove: (event: React.MouseEvent<SVGElement>) => void;
  onMouseOut: () => void;
  textProps?: {
    show: boolean;
    x: number;
    y: number;
    value: number;
    culture: string | undefined;
    onMouseOver: (event: React.MouseEvent<SVGElement>) => void;
    onMouseMove: (event: React.MouseEvent<SVGElement>) => void;
    onMouseOut: () => void;
  };
}) {
  return (
    <g key={key}>
      <path
        d={pathD}
        fill={fill}
        opacity={opacity}
        onMouseOver={onMouseOver}
        onMouseMove={onMouseMove}
        onMouseOut={onMouseOut}
      />
      {textProps && renderSegmentText(textProps)}
    </g>
  );
}
