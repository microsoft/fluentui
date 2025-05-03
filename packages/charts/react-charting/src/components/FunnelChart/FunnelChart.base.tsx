import * as React from 'react';
import { getId, getRTL } from '@fluentui/react/lib/Utilities';
import {
  IFunnelChartDataPoint,
  IFunnelChartProps,
} from './FunnelChart.types';
import { scaleLinear as d3ScaleLinear } from 'd3-scale';
import { FocusZone, FocusZoneDirection } from '@fluentui/react-focus';
import { ILegend, /* ILegendContainer, */ Legends } from '../Legends/index';
import { convertToLocaleString } from '../../utilities/locale-util';
import { Callout, DirectionalHint } from '@fluentui/react/lib/Callout';
import { ChartHoverCard } from '../../utilities/ChartHoverCard/ChartHoverCard';

// ToDo
// Add export as image
// Test support for RTl
// Need to support 1, 2, 3, 4 from this https://chatgpt.com/share/68155f7d-19e8-800a-93e9-3014219dc91d
// Center align control similar to gauge
// Multiple legend selection

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

  function _handleHover(
    data: IFunnelChartDataPoint,
    mouseEvent: React.MouseEvent<SVGElement>,
  ) {
    mouseEvent?.persist();
    setHoveredStage(data.stage);
    setCalloutData(data);
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

  function _createFunnel(containerHeight: number, containerWidth: number): JSX.Element[] {
    const {data, culture }= props;
    const funnelWidth = containerWidth * 0.8;
    const funnelHeight = containerHeight * 0.8;
    const funnelX = (containerWidth - funnelWidth) / 2;
    const funnelY = (containerHeight - funnelHeight) / 2;

    const widthScale = d3ScaleLinear()
      .domain([0, Math.max(...data.map(d => d.value))])
      .range([0, funnelWidth]);

    const segmentHeight = funnelHeight / data.length;

    return data.map((d, i) => {
      const topWidth = widthScale(d.value);
      const bottomWidth = i < data.length - 1 ? widthScale(data[i + 1].value) : 0;
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
            opacity={hoveredStage === d.stage || hoveredStage === null || selectedLegends?.includes(d.stage)? 1 : 0.3}
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
            {convertToLocaleString(d.value, culture)}
          </text>
        </g>
      );
    });
  }

  function _renderLegends(): JSX.Element {
      if (props.hideLegend) {
        return <></>;
      }

      const funnelData = props.data;

      const legends: ILegend[] = funnelData.map((d, i) => {

        return {
          title: d.stage,
          color: d.color,
          hoverAction: () => {
            setHoveredStage(d.stage);
          },
          onMouseOutAction: () => {
            setHoveredStage(null);
          },
        };
      });

      return (
        <div>
          <Legends
            legends={legends}
            centerLegends
            // // eslint-disable-next-line react/jsx-no-bind
            onChange={_onLegendSelectionChange}
            // ref={this._legendsRef}
          />
        </div>
      );
    };

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
    descriptionMessage: "Placeholder",
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

  return !_isChartEmpty() ? (
    <>
    <FocusZone direction={FocusZoneDirection.horizontal}>
      <svg width={width} height={height}>
        {_createFunnel(height, width)}
        {isCalloutVisible && (
          <Callout {...calloutProps}>
            <ChartHoverCard
              XValue={calloutProps?.XValue}
              YValue={calloutProps?.YValue}
              color={calloutProps?.color}
              descriptionMessage={calloutProps.descriptionMessage ? calloutProps.descriptionMessage : ''}
            />
          </Callout>
        )}
      </svg>
    </FocusZone>
    {_renderLegends()}
    </>
  ) : (
    <div id={_emptyChartId} role={'alert'} style={{ opacity: '0' }} aria-label={'Graph has no data to display'} />
  );
});
FunnelChartBase.displayName = 'FunnelChart';
