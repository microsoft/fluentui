/* eslint-disable react/jsx-no-bind */
import * as React from 'react';
import { Pie } from './Pie/index';
import { IDonutChartProps } from './DonutChart.types';
import { useDonutChartStyles_unstable } from './DonutChart.styles';
import { IChartDataPoint } from '../../DonutChart';
import { convertToLocaleString } from '../../utilities/locale-util';
import { getColorFromToken, getNextColor } from '../../utilities/index';
import { IAccessibilityProps, ChartHoverCard, ILegend, Legends } from '../../index';
import { ScaleOrdinal } from 'd3-scale';
import {
  Popover,
  PopoverSurface,
  PositioningVirtualElement,
  useFocusableGroup,
} from '../../../../react-components/src/index';

const LEGEND_CONTAINER_HEIGHT = 40;

// Create a DonutChart variant which uses these default styles and this styled subcomponent.
/**
 * Donutchart component.
 * {@docCategory DonutChart}
 */
export const DonutChart: React.FunctionComponent<IDonutChartProps> = React.forwardRef<HTMLDivElement, IDonutChartProps>(
  (props, forwardedRef) => {
    let colors: ScaleOrdinal<string, {}>;
    let _rootElem: HTMLElement | null;
    let _uniqText: string;
    /* eslint-disable @typescript-eslint/no-explicit-any */
    let _currentHoverElement: any;
    let _calloutId: string;
    let _calloutAnchorPoint: IChartDataPoint | null;
    let _emptyChartId: string | null;

    const [showHover, setShowHover] = React.useState<boolean>(false);
    const [value, setValue] = React.useState<string | undefined>('');
    const [legend, setLegend] = React.useState<string | undefined>('');
    const [_width, setWidth] = React.useState<number | undefined>(props.width || 200);
    const [_height, setHeight] = React.useState<number | undefined>(props.height || 200);
    const [activeLegend, setActiveLegend] = React.useState<string>('');
    const [color, setColor] = React.useState<string | undefined>('');
    const [xCalloutValue, setXCalloutValue] = React.useState<string>('');
    const [yCalloutValue, setYCalloutValue] = React.useState<string>('');
    const [selectedLegend, setSelectedLegend] = React.useState<string>('');
    const [focusedArcId, setFocusedArcId] = React.useState<string>('');
    const [dataPointCalloutProps, setDataPointCalloutProps] = React.useState<IChartDataPoint | undefined>();
    const [callOutAccessibilityData, setCallOutAccessibilityData] = React.useState<IAccessibilityProps | undefined>();
    const [clickPosition, setClickPosition] = React.useState({ x: 0, y: 0 });
    const [isPopoverOpen, setPopoverOpen] = React.useState(false);

    React.useEffect(() => {
      if (_rootElem) {
        setWidth(_rootElem.offsetWidth);
        setHeight(_rootElem.offsetHeight - LEGEND_CONTAINER_HEIGHT);
      }
    }, []);

    // React.useEffect(() => {
    //   let widthState: { _width: number } | undefined;
    //   if (props.width && props.width !== _width) {
    //     widthState = { _width: props.width };
    //   }

    //   let heightState: { _height: number } | undefined;
    //   if (props.height && props.height !== _height) {
    //     heightState = { _height: props.height - LEGEND_CONTAINER_HEIGHT };
    //   }
    //   if (widthState && widthState._width) {
    //     setWidth(widthState!._width);
    //   }
    //   if (heightState && heightState._height) {
    //     setHeight(heightState!._height);
    //   }
    // }, [props.width, props.height, _width, _height]);

    function _closeCallout() {
      setShowHover(false);
    }

    function _elevateToMinimums(data: IChartDataPoint[]) {
      let sumOfData = 0;
      const minPercent = 0.01;
      const elevatedData: IChartDataPoint[] = [];
      data.forEach(item => {
        sumOfData += item.data!;
      });
      data.forEach(item => {
        elevatedData.push(
          minPercent * sumOfData > item.data! && item.data! > 0
            ? {
                ...item,
                data: minPercent * sumOfData,
                yAxisCalloutData:
                  item.yAxisCalloutData === undefined ? item.data!.toLocaleString() : item.yAxisCalloutData,
              }
            : item,
        );
      });
      return elevatedData;
    }
    function _setViewBox(node: SVGElement | null): void {
      if (node === null) {
        return;
      }

      const widthVal = node.parentElement ? node.parentElement.clientWidth : _width;

      const heightVal =
        node.parentElement && node.parentElement?.offsetHeight > _height! ? node.parentElement?.offsetHeight : _height;
      const viewbox = `0 0 ${widthVal!} ${heightVal!}`;
      node.setAttribute('viewBox', viewbox);
    }
    function _createLegends(chartData: IChartDataPoint[]): JSX.Element {
      const legendDataItems = chartData.map((point: IChartDataPoint, index: number) => {
        const color: string = point.color!;
        // mapping data to the format Legends component needs
        const legend: ILegend = {
          title: point.legend!,
          color,
          action: () => {
            if (selectedLegend === point.legend) {
              setSelectedLegend('');
            } else {
              setSelectedLegend(point.legend!);
            }
          },
          hoverAction: () => {
            _handleChartMouseLeave();
            setActiveLegend(point.legend!);
          },
          onMouseOutAction: () => {
            setActiveLegend('');
          },
        };
        return legend;
      });
      const legends = (
        <Legends
          legends={legendDataItems}
          centerLegends
          overflowProps={props.legendsOverflowProps}
          focusZonePropsInHoverCard={props.focusZonePropsForLegendsInHoverCard}
          overflowText={props.legendsOverflowText}
          {...props.legendProps}
        />
      );
      return legends;
    }

    function _focusCallback(data: IChartDataPoint, id: string, element: SVGPathElement): void {
      _currentHoverElement = element;
      setShowHover(selectedLegend === '' || selectedLegend === data.legend);
      setValue(data.data!.toString());
      setLegend(data.legend);
      setColor(data.color!);
      setXCalloutValue(data.xAxisCalloutData!);
      setYCalloutValue(data.yAxisCalloutData!);
      setFocusedArcId(id);
      setDataPointCalloutProps(data);
      setCallOutAccessibilityData(data.callOutAccessibilityData!);
    }

    function _hoverCallback(data: IChartDataPoint, e: React.MouseEvent<SVGPathElement>): void {
      if (_calloutAnchorPoint !== data) {
        _calloutAnchorPoint = data;
        _currentHoverElement = e;
        setShowHover(selectedLegend === '' || selectedLegend === data.legend);
        setValue(data.data!.toString());
        setLegend(data.legend);
        setColor(data.color!);
        setXCalloutValue(data.xAxisCalloutData!);
        setYCalloutValue(data.yAxisCalloutData!);
        setDataPointCalloutProps(data);
        setCallOutAccessibilityData(data.callOutAccessibilityData!);
        updatePosition(e.clientX, e.clientY);
      }
    }
    function _onBlur(): void {
      setFocusedArcId('');
    }

    function _hoverLeave(): void {
      /**/
    }

    function _handleChartMouseLeave() {
      _calloutAnchorPoint = null;
      setShowHover(false);
      if (isPopoverOpen) {
        setPopoverOpen(false);
      }
    }

    function _valueInsideDonut(valueInsideDonut: string | number | undefined, data: IChartDataPoint[]) {
      const highlightedLegend = _getHighlightedLegend();
      if (valueInsideDonut !== undefined && (highlightedLegend !== '' || showHover)) {
        let legendValue = valueInsideDonut;
        data!.map((point: IChartDataPoint, index: number) => {
          if (point.legend === highlightedLegend || (showHover && point.legend === legend)) {
            legendValue = point.yAxisCalloutData ? point.yAxisCalloutData : point.data!;
          }
          return;
        });
        return legendValue;
      } else {
        return valueInsideDonut;
      }
    }

    function _toLocaleString(data: string | number | undefined) {
      const localeString = convertToLocaleString(data, props.culture);
      if (!localeString) {
        return data;
      }
      return localeString?.toString();
    }

    /**
     * This function returns
     * the selected legend if there is one
     * or the hovered legend if none of the legends is selected.
     * Note: This won't work in case of multiple legends selection.
     */
    function _getHighlightedLegend() {
      return selectedLegend || activeLegend;
    }

    function _isChartEmpty(): boolean {
      return !(
        props.data &&
        props.data.chartData &&
        props.data.chartData!.filter((d: IChartDataPoint) => d.data! > 0).length > 0
      );
    }

    function _addDefaultColors(donutChartDataPoint?: IChartDataPoint[]): IChartDataPoint[] {
      return donutChartDataPoint
        ? donutChartDataPoint.map((item, index) => {
            let defaultColor: string;
            // isInverted property is applicable to v8 themes only
            if (typeof item.color === 'undefined') {
              defaultColor = getNextColor(index, 0);
            } else {
              defaultColor = getColorFromToken(item.color);
            }
            console.log('color = ', defaultColor);
            return { ...item, defaultColor };
          })
        : [];
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

    const virtualElement: PositioningVirtualElement = {
      getBoundingClientRect: () => ({
        top: clickPosition.y,
        left: clickPosition.x,
        right: clickPosition.x,
        bottom: clickPosition.y,
        x: clickPosition.x,
        y: clickPosition.y,
        width: 0,
        height: 0,
      }),
    };

    const { data, hideLegend = false } = props;
    const points = _addDefaultColors(data?.chartData);

    const classes = useDonutChartStyles_unstable(props);

    const legendBars = _createLegends(points);
    const donutMarginHorizontal = props.hideLabels ? 0 : 80;
    const donutMarginVertical = props.hideLabels ? 0 : 40;
    const outerRadius = Math.min(_width! - donutMarginHorizontal, _height! - donutMarginVertical) / 2;
    const chartData = _elevateToMinimums(points.filter((d: IChartDataPoint) => d.data! >= 0));
    const valueInsideDonut = _valueInsideDonut(props.valueInsideDonut!, chartData!);
    const focusAttributes = useFocusableGroup();

    return !_isChartEmpty() ? (
      <div
        className={classes.root}
        ref={(rootElem: HTMLElement | null) => (_rootElem = rootElem)}
        onMouseLeave={_handleChartMouseLeave}
      >
        <div {...focusAttributes}>
          <div>
            <svg
              className={classes.chart}
              aria-label={data?.chartTitle}
              ref={(node: SVGElement | null) => _setViewBox(node)}
            >
              <Pie
                width={_width!}
                height={_height!}
                outerRadius={outerRadius}
                innerRadius={props.innerRadius!}
                data={chartData!}
                onFocusCallback={_focusCallback}
                hoverOnCallback={_hoverCallback}
                hoverLeaveCallback={_hoverLeave}
                uniqText={_uniqText}
                onBlurCallback={_onBlur}
                activeArc={_getHighlightedLegend()}
                focusedArcId={focusedArcId || ''}
                href={props.href!}
                calloutId={_calloutId}
                valueInsideDonut={_toLocaleString(valueInsideDonut)}
                showLabelsInPercent={props.showLabelsInPercent}
                hideLabels={props.hideLabels}
              />
            </svg>
          </div>
        </div>
        <Popover positioning={{ target: virtualElement }} open={isPopoverOpen} openOnHover>
          <PopoverSurface tabIndex={-1}>
            <ChartHoverCard
              Legend={xCalloutValue ? xCalloutValue : legend}
              YValue={yCalloutValue ? yCalloutValue : value}
              color={color}
              culture={props.culture}
            />
          </PopoverSurface>
        </Popover>
        {!hideLegend && <div className={classes.legendContainer}>{legendBars}</div>}
      </div>
    ) : (
      <div id={_emptyChartId!} role={'alert'} style={{ opacity: '0' }} aria-label={'Graph has no data to display'} />
    );
  },
);

DonutChart.displayName = 'DonutChart';
DonutChart.defaultProps = {
  innerRadius: 0,
  hideLabels: true,
};
