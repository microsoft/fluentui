/* eslint-disable react/jsx-no-bind */
import * as React from 'react';
import { Pie } from './Pie/index';
import { DonutChartProps } from './DonutChart.types';
import { useDonutChartStyles_unstable } from './useDonutChartStyles.styles';
import { ChartDataPoint } from '../../DonutChart';
import { convertToLocaleString } from '../../utilities/locale-util';
import { getColorFromToken, getNextColor } from '../../utilities/index';
import { Legend, Legends } from '../../index';
import { useId } from '@fluentui/react-utilities';
import { useFocusableGroup } from '@fluentui/react-tabster';
import { ChartPopover } from '../CommonComponents/ChartPopover';
import { ResponsiveContainer } from '../CommonComponents/ResponsiveContainer';

const MIN_LEGEND_CONTAINER_HEIGHT = 40;

// Create a DonutChart variant which uses these default styles and this styled subcomponent.
/**
 * Donutchart component.
 * {@docCategory DonutChart}
 */
const DonutChartBase: React.FunctionComponent<DonutChartProps> = React.forwardRef<HTMLDivElement, DonutChartProps>(
  (props, forwardedRef) => {
    const _rootElem = React.useRef<HTMLDivElement | null>(null);
    const _uniqText: string = useId('_Pie_');
    /* eslint-disable @typescript-eslint/no-explicit-any */
    let _calloutAnchorPoint: ChartDataPoint | null;
    let _emptyChartId: string | null;
    const legendContainer = React.useRef<HTMLDivElement | null>(null);
    const prevSize = React.useRef<{ width?: number; height?: number }>({});

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
    const [dataPointCalloutProps, setDataPointCalloutProps] = React.useState<ChartDataPoint | undefined>();
    const [clickPosition, setClickPosition] = React.useState({ x: 0, y: 0 });
    const [isPopoverOpen, setPopoverOpen] = React.useState(false);

    React.useEffect(() => {
      _fitParentContainer();
    }, []);

    React.useEffect(() => {
      if (prevSize.current.height !== props.height || prevSize.current.width !== props.width) {
        _fitParentContainer();
      }
      prevSize.current.height = props.height;
      prevSize.current.width = props.width;
    }, [props.width, props.height]);

    function _elevateToMinimums(data: ChartDataPoint[]) {
      let sumOfData = 0;
      const minPercent = 0.01;
      const elevatedData: ChartDataPoint[] = [];
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
    function _createLegends(chartData: ChartDataPoint[]): JSX.Element {
      const legendDataItems = chartData.map((point: ChartDataPoint, index: number) => {
        const color: string = point.color!;
        // mapping data to the format Legends component needs
        const legend: Legend = {
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
          overflowText={props.legendsOverflowText}
          {...props.legendProps}
        />
      );
      return legends;
    }

    function _focusCallback(data: ChartDataPoint, id: string, element: SVGPathElement): void {
      setPopoverOpen(selectedLegend === '' || selectedLegend === data.legend);
      setValue(data.data!.toString());
      setLegend(data.legend);
      setColor(data.color!);
      setXCalloutValue(data.xAxisCalloutData!);
      setYCalloutValue(data.yAxisCalloutData!);
      setFocusedArcId(id);
      setDataPointCalloutProps(data);
    }

    function _hoverCallback(data: ChartDataPoint, e: React.MouseEvent<SVGPathElement>): void {
      if (_calloutAnchorPoint !== data) {
        _calloutAnchorPoint = data;
        setPopoverOpen(selectedLegend === '' || selectedLegend === data.legend);
        setValue(data.data!.toString());
        setLegend(data.legend);
        setColor(data.color!);
        setXCalloutValue(data.xAxisCalloutData!);
        setYCalloutValue(data.yAxisCalloutData!);
        setDataPointCalloutProps(data);
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
      setPopoverOpen(false);
    }

    function _valueInsideDonut(valueInsideDonut: string | number | undefined, data: ChartDataPoint[]) {
      const highlightedLegend = _getHighlightedLegend();
      if (valueInsideDonut !== undefined && (highlightedLegend !== '' || isPopoverOpen)) {
        let legendValue = valueInsideDonut;
        data!.map((point: ChartDataPoint, index: number) => {
          if (point.legend === highlightedLegend || (isPopoverOpen && point.legend === legend)) {
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
        props.data.chartData!.filter((d: ChartDataPoint) => d.data! > 0).length > 0
      );
    }

    function _addDefaultColors(donutChartDataPoint?: ChartDataPoint[]): ChartDataPoint[] {
      return donutChartDataPoint
        ? donutChartDataPoint.map((item, index) => {
            let defaultColor: string;
            if (typeof item.color === 'undefined') {
              defaultColor = getNextColor(index, 0);
            } else {
              defaultColor = getColorFromToken(item.color);
            }
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

    /**
     * When screen resizes, along with screen, chart also auto adjusted.
     * This method used to adjust height and width of the charts.
     */
    function _fitParentContainer(): void {
      //_reqID = requestAnimationFrame(() => {
      let legendContainerHeight;
      if (props.hideLegend) {
        // If there is no legend, need not to allocate some space from total chart space.
        legendContainerHeight = 0;
      } else {
        const legendContainerComputedStyles = legendContainer.current && getComputedStyle(legendContainer.current);
        legendContainerHeight =
          ((legendContainer.current && legendContainer.current.getBoundingClientRect().height) ||
            MIN_LEGEND_CONTAINER_HEIGHT) +
          parseFloat((legendContainerComputedStyles && legendContainerComputedStyles.marginTop) || '0') +
          parseFloat((legendContainerComputedStyles && legendContainerComputedStyles.marginBottom) || '0');
      }
      if (props.parentRef || _rootElem.current) {
        const container = props.parentRef ? props.parentRef : _rootElem.current!;
        const currentContainerWidth = container.getBoundingClientRect().width;
        const currentContainerHeight =
          container.getBoundingClientRect().height > legendContainerHeight
            ? container.getBoundingClientRect().height
            : 200;
        const shouldResize =
          _width !== currentContainerWidth || _height !== currentContainerHeight - legendContainerHeight;
        if (shouldResize) {
          setWidth(currentContainerWidth);
          setHeight(currentContainerHeight - legendContainerHeight);
        }
      }
      //});
    }

    const { data, hideLegend = false } = props;
    const points = _addDefaultColors(data?.chartData);

    const classes = useDonutChartStyles_unstable(props);

    const legendBars = _createLegends(points);
    const donutMarginHorizontal = props.hideLabels ? 0 : 80;
    const donutMarginVertical = props.hideLabels ? 0 : 40;
    const outerRadius = Math.min(_width! - donutMarginHorizontal, _height! - donutMarginVertical) / 2;
    const chartData = _elevateToMinimums(points.filter((d: ChartDataPoint) => d.data! >= 0));
    const valueInsideDonut = _valueInsideDonut(props.valueInsideDonut!, chartData!);
    const focusAttributes = useFocusableGroup();
    return !_isChartEmpty() ? (
      <div
        className={classes.root}
        ref={(rootElem: HTMLDivElement | null) => (_rootElem.current = rootElem)}
        onMouseLeave={_handleChartMouseLeave}
      >
        <div className={classes.chartWrapper} {...focusAttributes}>
          <svg className={classes.chart} aria-label={data?.chartTitle} width={_width} height={_height}>
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
              valueInsideDonut={_toLocaleString(valueInsideDonut)}
              showLabelsInPercent={props.showLabelsInPercent}
              hideLabels={props.hideLabels}
            />
          </svg>
        </div>
        <ChartPopover
          xCalloutValue={xCalloutValue}
          yCalloutValue={yCalloutValue}
          culture={props.culture ?? 'en-us'}
          clickPosition={clickPosition}
          isPopoverOpen={isPopoverOpen}
          legend={legend!}
          YValue={value!}
          color={color}
          isCalloutForStack={false}
          customCallout={{
            customizedCallout: props.onRenderCalloutPerDataPoint
              ? props.onRenderCalloutPerDataPoint(dataPointCalloutProps!)
              : undefined,
            customCalloutProps: props.customProps ? props.customProps(dataPointCalloutProps!) : undefined,
          }}
          isCartesian={false}
        />
        {!hideLegend && (
          <div ref={(e: HTMLDivElement) => (legendContainer.current = e)} className={classes.legendContainer}>
            {legendBars}
          </div>
        )}
      </div>
    ) : (
      <div id={_emptyChartId!} role={'alert'} style={{ opacity: '0' }} aria-label={'Graph has no data to display'} />
    );
  },
);

export const DonutChart: React.FunctionComponent<DonutChartProps> = props => {
  if (!props.responsive) {
    return <DonutChartBase {...props} />;
  }

  return (
    <ResponsiveContainer onResize={props.onResize} width={props.width} height={props.height}>
      {({ containerWidth, containerHeight }) => (
        <DonutChartBase {...props} width={containerWidth} height={containerHeight} />
      )}
    </ResponsiveContainer>
  );
};
DonutChart.displayName = 'DonutChart';
DonutChart.defaultProps = {
  innerRadius: 0,
  hideLabels: true,
  responsive: true,
};
