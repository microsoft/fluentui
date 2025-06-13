import * as React from 'react';
import { classNamesFunction, getId, getRTL } from '@fluentui/react/lib/Utilities';
import {
  IFunnelChartDataPoint,
  IFunnelChartProps,
  IFunnelChartStyleProps,
  IFunnelChartStyles,
} from './FunnelChart.types';
import { scaleLinear as d3ScaleLinear } from 'd3-scale';
import { FocusZone, FocusZoneDirection } from '@fluentui/react-focus';
import { ILegend, /* ILegendContainer, */ Legends } from '../Legends/index';
import { Callout, DirectionalHint } from '@fluentui/react/lib/Callout';
import { ChartHoverCard } from '../../utilities/ChartHoverCard/ChartHoverCard';
import { formatToLocaleString } from '@fluentui/chart-utilities';
import { IImageExportOptions } from '../../types/index';
import { toImage as convertToImage } from '../../utilities/image-export-utils';

// ToDo
// Add export as image [Done]
// Test support for RTl
// Need to support 1, 2, 3, 4 from this https://chatgpt.com/share/68155f7d-19e8-800a-93e9-3014219dc91d [Done]
// Center align control similar to gauge [Done]
// Multiple legend selection [Done]
const getClassNames = classNamesFunction<IFunnelChartStyleProps, IFunnelChartStyles>();

export const FunnelChartBase: React.FunctionComponent<IFunnelChartProps> = React.forwardRef<
  HTMLDivElement,
  IFunnelChartProps
>((props, forwardedRef) => {
  const _tooltipId: string = getId('FunnelChartTooltipId_');
  const _emptyChartId: string = getId('_FunnelChart_empty');
  const isRTL = getRTL(); // Determine if RTL mode is enabled
  //const chartRef = React.useRef<SVGSVGElement | null>(null);

  //let margins: Margins;

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

  function getHighlightedLegend() {
    return selectedLegends.length > 0 ? selectedLegends : hoveredStage ? [hoveredStage] : [];
  }

  function legendHighlighted(legend: string) {
    return getHighlightedLegend().includes(legend!);
  }

  function noLegendHighlighted() {
    return getHighlightedLegend().length === 0;
  }

  function _createFunnel(containerHeight: number, containerWidth: number): JSX.Element[] {
    const { data, culture } = props;
    const funnelWidth = containerWidth * 0.8;
    const funnelHeight = containerHeight * 0.8;
    const funnelX = (containerWidth - funnelWidth) / 2;
    const funnelY = (containerHeight - funnelHeight) / 2;

    if (props.orientation === 'horizontal') {
      const widthScale = d3ScaleLinear()
        .domain([0, Math.max(...data.map(d => d.value!))])
        .range([0, funnelWidth]);

      const segmentHeight = funnelHeight / data.length;

      return data.map((d, i) => {
        const topWidth = widthScale(d.value!);
        const bottomWidth = i < data.length - 1 ? widthScale(data[i + 1].value!) : 0;
        const xOffset = (funnelWidth - topWidth) / 2;
        const nextXOffset = (funnelWidth - bottomWidth) / 2;

        // Adjust x-coordinates for RTL mode
        const xStart = isRTL ? funnelWidth - xOffset : xOffset;
        const xEnd = isRTL ? funnelWidth - nextXOffset : nextXOffset;

        return (
          <g key={i} transform={`translate(${funnelX}, ${funnelY})`}>
            <path
              d={`
              M${xStart},${i * segmentHeight}
              L${funnelWidth - xStart},${i * segmentHeight}
              L${funnelWidth - xEnd},${(i + 1) * segmentHeight}
              L${xEnd},${(i + 1) * segmentHeight}
              Z
            `}
              fill={d.color}
              opacity={legendHighlighted(d.stage as string) || noLegendHighlighted() ? 1 : 0.1}
              onMouseOver={(event: React.MouseEvent<SVGElement>) => _handleHover(d, event)}
              onMouseMove={(event: React.MouseEvent<SVGElement>) => _handleHover(d, event)}
              onMouseOut={() => _handleMouseOut()}
            />
            <text
              x={funnelWidth / 2}
              y={i * segmentHeight + segmentHeight / 2}
              textAnchor="middle"
              onMouseOver={(event: React.MouseEvent<SVGElement>) => _handleHover(d, event)}
              onMouseMove={(event: React.MouseEvent<SVGElement>) => _handleHover(d, event)}
              onMouseOut={() => _handleMouseOut()}
            >
              {formatToLocaleString(d.value!.toString(), culture)}
            </text>
          </g>
        );
      });
    } else {
      console.log('Creating vertical funnel chart');
      // x is category, y is value, so we scale on height
      const heightScale = d3ScaleLinear()
        .domain([0, Math.max(...data.map(d => d.stage as number))])
        .range([0, funnelHeight]);
      const segmentWidth = funnelWidth / data.length;
      console.log('funnelWidth', funnelWidth, 'funnelHeight', funnelHeight);
      console.log('segmentWidth', segmentWidth);

      return data.map((d, i) => {
        console.log('data', data);
        const leftHeight = heightScale(d.stage as number);
        const rightHeight = i < data.length - 1 ? heightScale(data[i + 1].stage as number) : 0;
        const yOffset = (funnelHeight - leftHeight) / 2;
        const nextYOffset = (funnelHeight - rightHeight) / 2;
        console.log('leftHeight', leftHeight, 'rightHeight', rightHeight);
        console.log('yOffset', yOffset, 'nextYOffset', nextYOffset);
        // Adjust x-coordinates for RTL mode
        const x0 = isRTL ? funnelWidth - (i + 1) * segmentWidth : i * segmentWidth;
        const x1 = isRTL ? funnelWidth - i * segmentWidth : (i + 1) * segmentWidth;

        return (
          <g key={i} transform={`translate(${funnelX}, ${funnelY})`}>
            <path
              d={`
              M${x0},${yOffset}
              L${x1},${nextYOffset}
              L${x1},${funnelHeight - nextYOffset}
              L${x0},${funnelHeight - yOffset}
              Z
            `}
              fill={d.color}
              opacity={legendHighlighted(d.stage as string) || noLegendHighlighted() ? 1 : 0.1}
              onMouseOver={(event: React.MouseEvent<SVGElement>) => _handleHover(d, event)}
              onMouseMove={(event: React.MouseEvent<SVGElement>) => _handleHover(d, event)}
              onMouseOut={() => _handleMouseOut()}
            />
            <text
              x={(x0 + x1) / 2}
              y={funnelHeight / 2}
              textAnchor="middle"
              onMouseOver={(event: React.MouseEvent<SVGElement>) => _handleHover(d, event)}
              onMouseMove={(event: React.MouseEvent<SVGElement>) => _handleHover(d, event)}
              onMouseOut={() => _handleMouseOut()}
            >
              {formatToLocaleString(d.stage.toString(), culture)}
            </text>
          </g>
        );
      });
    }
  }

  function isStackedFunnelData(data: any): boolean {
    return Array.isArray(data) && data.every(stage => Array.isArray(stage.subValues));
  }

  function _createStackedFunnel(containerHeight: number, containerWidth: number): JSX.Element[] {
    const { data, culture, orientation = 'horizontal' } = props;

    const stages = data; // [{stage, subValues:[{category,value,color}]}]
    const totals = stages.map(s => s?.subValues?.reduce((sum, s) => sum + s.value, 0));
    const maxTotal = Math.max(...totals.filter((total): total is number => total !== undefined));

    const funnelWidth = containerWidth * 0.8;
    const funnelHeight = containerHeight * 0.8;
    const funnelX = (containerWidth - funnelWidth) / 2;
    const funnelY = (containerHeight - funnelHeight) / 2;

    let paths: JSX.Element[] = [];

    if (orientation === 'horizontal') {
      const segmentHeight = funnelHeight / stages.length;

      for (let i = 0; i < stages.length; i++) {
        const cur = stages[i];
        const next = stages[i + 1] || { subValues: [] };
        const curTotal = totals[i] ?? 1;
        const nextTotal = totals[i + 1] ?? 0;

        let cumTop = 0;
        let cumBot = 0;

        for (let k = 0; k < (cur.subValues ?? []).length; k++) {
          const v = cur.subValues?.[k];
          const vNext = next?.subValues?.find(x => x.category === v?.category);
          const val = v?.value ?? 0;
          const nextVal = vNext ? vNext.value : 0;

          const topW = (val / curTotal) * (curTotal / maxTotal) * funnelWidth;
          const botW = (nextVal / nextTotal || 0) * (nextTotal / maxTotal) * funnelWidth;

          const topStart = (funnelWidth - (curTotal / maxTotal) * funnelWidth) / 2 + cumTop;
          const topEnd = topStart + topW;
          const botStart = (funnelWidth - (nextTotal / maxTotal) * funnelWidth) / 2 + cumBot;
          const botEnd = botStart + botW;

          const textX = (topStart + topEnd + botStart + botEnd) / 4;
          const textY = i * segmentHeight + segmentHeight / 2;

          paths.push(
            <g key={`${i}-${k}`} transform={`translate(${funnelX},${funnelY})`}>
              <path
                d={`
                  M${topStart},${i * segmentHeight}
                  L${topEnd},${i * segmentHeight}
                  L${botEnd},${(i + 1) * segmentHeight}
                  L${botStart},${(i + 1) * segmentHeight}
                  Z
                `}
                fill={v?.color}
                opacity={
                  (isStackedFunnelData(props.data) && legendHighlighted(v?.category!)) || noLegendHighlighted()
                    ? 1
                    : 0.1
                }
                onMouseOver={(event: React.MouseEvent<SVGElement>) =>
                  _handleStackedHover(cur.stage as string, v!, event)
                }
                onMouseMove={(event: React.MouseEvent<SVGElement>) =>
                  _handleStackedHover(cur.stage as string, v!, event)
                }
                onMouseOut={() => _handleMouseOut()}
              />
              <text
                x={textX}
                y={textY}
                textAnchor="middle"
                alignmentBaseline="middle"
                onMouseOver={(event: React.MouseEvent<SVGElement>) =>
                  _handleStackedHover(cur.stage as string, v!, event)
                }
                onMouseMove={(event: React.MouseEvent<SVGElement>) =>
                  _handleStackedHover(cur.stage as string, v!, event)
                }
                onMouseOut={() => _handleMouseOut()}
              >
                {formatToLocaleString(v?.value.toString(), culture)}
              </text>
            </g>,
          );

          cumTop += topW;
          cumBot += botW;
        }
      }
    } else {
      const segmentWidth = funnelWidth / stages.length;

      for (let i = 0; i < stages.length; i++) {
        const cur = stages[i];
        const next = stages[i + 1] || { subValues: [] };
        const curTotal = totals[i] ?? 1;
        const nextTotal = totals[i + 1] ?? 0;

        let cumTop = 0;
        let cumBot = 0;

        for (let k = 0; k < (cur.subValues ?? []).length; k++) {
          const v = cur.subValues?.[k];
          const vNext = next.subValues?.find(x => x.category === v?.category);
          const val = v?.value ?? 0;
          const nextVal = vNext ? vNext.value : 0;

          const topH = (val / curTotal) * (curTotal / maxTotal) * funnelHeight;
          const botH = (nextVal / nextTotal || 0) * (nextTotal / maxTotal) * funnelHeight;

          const leftStart = i * segmentWidth;
          const leftEnd = (i + 1) * segmentWidth;
          const topStart = (funnelHeight - (curTotal / maxTotal) * funnelHeight) / 2 + cumTop;
          const topEnd = topStart + topH;
          const botStart = (funnelHeight - (nextTotal / maxTotal) * funnelHeight) / 2 + cumBot;
          const botEnd = botStart + botH;

          // Center of the stack segment
          const textX = (leftStart + leftEnd) / 2;
          const textY = (topStart + topEnd + botStart + botEnd) / 4;

          paths.push(
            <g key={`${i}-${k}`} transform={`translate(${funnelX},${funnelY})`}>
              <path
                d={`
                  M${leftStart},${topStart}
                  L${leftEnd},${botStart}
                  L${leftEnd},${botEnd}
                  L${leftStart},${topEnd}
                  Z
                `}
                fill={v?.color}
                opacity={
                  (isStackedFunnelData(props.data) && legendHighlighted(v?.category!)) || noLegendHighlighted()
                    ? 1
                    : 0.1
                }
                onMouseOver={(event: React.MouseEvent<SVGElement>) =>
                  _handleStackedHover(cur.stage as string, v!, event)
                }
                onMouseMove={(event: React.MouseEvent<SVGElement>) =>
                  _handleStackedHover(cur.stage as string, v!, event)
                }
                onMouseOut={() => _handleMouseOut()}
              />
              <text
                x={textX}
                y={textY}
                textAnchor="middle"
                alignmentBaseline="middle"
                onMouseOver={(event: React.MouseEvent<SVGElement>) =>
                  _handleStackedHover(cur.stage as string, v!, event)
                }
                onMouseMove={(event: React.MouseEvent<SVGElement>) =>
                  _handleStackedHover(cur.stage as string, v!, event)
                }
                onMouseOut={() => _handleMouseOut()}
              >
                {formatToLocaleString(v?.value.toString(), culture)}
              </text>
            </g>,
          );

          cumTop += topH;
          cumBot += botH;
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
      // Collect unique categories and their color (first color found for each category)
      const categoryMap: Record<string, string> = {};
      funnelData.forEach((stage: any) => {
        (stage.subValues || []).forEach((sub: any) => {
          if (!(sub.category in categoryMap)) {
            categoryMap[sub.category] = sub.color;
          }
        });
      });
      const legends: ILegend[] = Object.entries(categoryMap).map(([category, color]) => ({
        title: category,
        color,
        hoverAction: () => setHoveredStage(category), // highlight all segments of this category
        onMouseOutAction: () => setHoveredStage(null),
      }));

      return (
        <div>
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

    // Non-stacked: allow selection
    const legends: ILegend[] = funnelData.map((d: any) => ({
      title: d.stage,
      color: d.color,
      hoverAction: () => setHoveredStage(d.stage),
      onMouseOutAction: () => setHoveredStage(null),
    }));

    return (
      <div>
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
  console.log('isStackedFunnelData', isStackedFunnelData(props.data));
  console.log('orientation', props.orientation);
  console.log('props.data', props.data);
  return !_isChartEmpty() ? (
    <div ref={chartContainerRef} className={classNames.root}>
      <FocusZone direction={FocusZoneDirection.horizontal}>
        <svg width={width} height={height} className={classNames.chart} role={'img'} aria-label={props.chartTitle}>
          {isStackedFunnelData(props.data) ? _createStackedFunnel(height, width) : _createFunnel(height, width)}
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
