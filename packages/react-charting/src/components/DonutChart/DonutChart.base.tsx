import * as React from 'react';
import { classNamesFunction, getId } from '@fluentui/react/lib/Utilities';
import { IProcessedStyleSet, IPalette } from '@fluentui/react/lib/Styling';
import { Callout, DirectionalHint } from '@fluentui/react/lib/Callout';
import { FocusZone, FocusZoneDirection, FocusZoneTabbableElements } from '@fluentui/react-focus';
import { IAccessibilityProps, ChartHoverCard, ILegend, Legends } from '../../index';
import { Pie } from './Pie/index';
import { IChartDataPoint, IChartProps, IDonutChartProps, IDonutChartStyleProps, IDonutChartStyles } from './index';
import { convertToLocaleString, getAccessibleDataObject } from '../../utilities/index';

const getClassNames = classNamesFunction<IDonutChartStyleProps, IDonutChartStyles>();
const LEGEND_CONTAINER_HEIGHT = 40;

export const DonutChartBase = (props: IDonutChartProps) => {
  const { innerRadius = 0, hideLabels = true } = props;

  const _classNames = React.useRef<IProcessedStyleSet<IDonutChartStyles>>();
  const _rootElem = React.useRef<HTMLDivElement>(null);
  const _uniqText = React.useRef<string>(getId('_Pie_'));
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const _currentHoverElement = React.useRef<any>();
  const _calloutId = React.useRef<string>(getId('callout'));
  const _calloutAnchorPoint = React.useRef<IChartDataPoint | null>(null);
  const _prevWidth = React.useRef<number>();
  const _prevHeight = React.useRef<number>();

  const [_width, setWidth] = React.useState<number>(props.width || 200);
  const [_height, setHeight] = React.useState<number>(props.height || 200);
  const [activeLegend, setActiveLegend] = React.useState<string>('');
  const [selectedLegend, setSelectedLegend] = React.useState<string>('');
  const [focusedArcId, setFocusedArcId] = React.useState<string>('');
  const [showHover, setShowHover] = React.useState<boolean>(false);

  // Can use a single state or reducer for the following:
  const [value, setValue] = React.useState<string>('');
  const [legend, setLegend] = React.useState<string>('');
  const [color, setColor] = React.useState<string>('');
  const [xCalloutValue, setXCalloutValue] = React.useState<string>('');
  const [yCalloutValue, setYCalloutValue] = React.useState<string>('');
  const [dataPointCalloutProps, setDataPointCalloutProps] = React.useState<IChartDataPoint>();
  const [callOutAccessibilityData, setCallOutAccessibilityData] = React.useState<IAccessibilityProps>();

  React.useEffect(() => {
    if (_rootElem.current) {
      if (!props.width) {
        setWidth(_rootElem.current.offsetWidth);
      } else if (props.width !== _prevWidth.current) {
        setWidth(props.width);
        _prevWidth.current = props.width;
      }

      if (!props.height) {
        setHeight(_rootElem.current.offsetHeight - LEGEND_CONTAINER_HEIGHT);
      } else if (props.height !== _prevHeight.current) {
        setHeight(props.height - LEGEND_CONTAINER_HEIGHT);
        _prevHeight.current = props.height;
      }
    }
  }, [props.width, props.height]);

  const _closeCallout = React.useCallback(() => {
    setShowHover(false);
  }, []);

  const _setViewBox = React.useCallback(
    (node: SVGElement | null): void => {
      if (node === null) {
        return;
      }

      const widthVal = node.parentElement ? node.parentElement.clientWidth : _width;

      const heightVal =
        node.parentElement && node.parentElement?.offsetHeight > _height! ? node.parentElement?.offsetHeight : _height;
      const viewbox = `0 0 ${widthVal!} ${heightVal!}`;
      node.setAttribute('viewBox', viewbox);
    },
    [_height, _width],
  );

  const _handleChartMouseLeave = React.useCallback(() => {
    _calloutAnchorPoint.current = null;
    setShowHover(false);
  }, []);

  const _createLegends = React.useCallback(
    (data: IChartProps, palette: IPalette): JSX.Element => {
      const defaultPalette: string[] = [palette.blueLight, palette.blue, palette.blueMid, palette.red, palette.black];
      const legendDataItems =
        data &&
        data!.chartData!.map((point: IChartDataPoint, index: number) => {
          const col: string = point.color ? point.color : defaultPalette[Math.floor(Math.random() * 4 + 1)];
          // mapping data to the format Legends component needs
          const leg: ILegend = {
            title: point.legend!,
            color: col,
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
          return leg;
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
    },
    [
      _handleChartMouseLeave,
      props.focusZonePropsForLegendsInHoverCard,
      props.legendProps,
      props.legendsOverflowProps,
      props.legendsOverflowText,
      selectedLegend,
    ],
  );

  const _focusCallback = React.useCallback(
    (data: IChartDataPoint, id: string, element: SVGPathElement): void => {
      _currentHoverElement.current = element;
      /** Show the callout if highlighted arc is focused and Hide it if unhighlighted arc is focused */
      setShowHover(selectedLegend === '' || selectedLegend === data.legend);
      setValue(data.data!.toString());
      setLegend(data.legend!);
      setColor(data.color!);
      setXCalloutValue(data.xAxisCalloutData!);
      setYCalloutValue(data.yAxisCalloutData!);
      setFocusedArcId(id);
      setDataPointCalloutProps(data);
      setCallOutAccessibilityData(data.callOutAccessibilityData!);
    },
    [selectedLegend],
  );

  const _hoverCallback = React.useCallback(
    (data: IChartDataPoint, e: React.MouseEvent<SVGPathElement>): void => {
      if (_calloutAnchorPoint.current !== data) {
        _calloutAnchorPoint.current = data;
        _currentHoverElement.current = e;
        /** Show the callout if highlighted arc is hovered and Hide it if unhighlighted arc is hovered */
        setShowHover(selectedLegend === '' || selectedLegend === data.legend);
        setValue(data.data!.toString());
        setLegend(data.legend!);
        setColor(data.color!);
        setXCalloutValue(data.xAxisCalloutData!);
        setYCalloutValue(data.yAxisCalloutData!);
        setDataPointCalloutProps(data);
        setCallOutAccessibilityData(data.callOutAccessibilityData!);
      }
    },
    [selectedLegend],
  );

  const _onBlur = React.useCallback((): void => {
    setFocusedArcId('');
  }, []);

  const _hoverLeave = React.useCallback((): void => {
    /**/
  }, []);

  /**
   * This function returns
   * the selected legend if there is one
   * or the hovered legend if none of the legends is selected.
   * Note: This won't work in case of multiple legends selection.
   */
  const _getHighlightedLegend = React.useCallback(() => {
    return selectedLegend || activeLegend;
  }, [activeLegend, selectedLegend]);

  const _valueInsideDonut = React.useCallback(
    (valueInsideDonut: string | number | undefined, data: IChartDataPoint[]) => {
      const highlightedLegend = _getHighlightedLegend();
      if (valueInsideDonut !== undefined && highlightedLegend !== '' && !showHover) {
        let legendValue = valueInsideDonut;
        data!.map((point: IChartDataPoint, index: number) => {
          if (point.legend === highlightedLegend) {
            legendValue = point.yAxisCalloutData ? point.yAxisCalloutData : point.data!;
          }
          return;
        });
        return legendValue;
      } else {
        return valueInsideDonut;
      }
    },
    [_getHighlightedLegend, showHover],
  );

  const _toLocaleString = React.useCallback(
    (data: string | number | undefined) => {
      const localeString = convertToLocaleString(data, props.culture);
      if (!localeString) {
        return data;
      }
      return localeString?.toString();
    },
    [props.culture],
  );

  const { data, hideLegend = false } = props;
  const { palette } = props.theme!;

  _classNames.current = getClassNames(props.styles!, {
    theme: props.theme!,
    width: _width!,
    height: _height!,
    color: color!,
    className: props.className!,
  });

  const legendBars = _createLegends(data!, palette);
  const donutMarginHorizontal = hideLabels ? 0 : 80;
  const donutMarginVertical = hideLabels ? 0 : 40;
  const outerRadius = Math.min(_width! - donutMarginHorizontal, _height! - donutMarginVertical) / 2;
  const chartData = data && data.chartData?.filter((d: IChartDataPoint) => d.data! > 0);
  const valueInsideDonut = _valueInsideDonut(props.valueInsideDonut!, chartData!);
  return (
    <div className={_classNames.current.root} ref={_rootElem} onMouseLeave={_handleChartMouseLeave}>
      <FocusZone direction={FocusZoneDirection.horizontal} handleTabKey={FocusZoneTabbableElements.all}>
        <div>
          <svg
            className={_classNames.current.chart}
            aria-label={data?.chartTitle}
            ref={(node: SVGElement | null) => _setViewBox(node)}
          >
            <Pie
              width={_width!}
              height={_height!}
              outerRadius={outerRadius}
              innerRadius={innerRadius!}
              data={chartData!}
              onFocusCallback={_focusCallback}
              hoverOnCallback={_hoverCallback}
              hoverLeaveCallback={_hoverLeave}
              uniqText={_uniqText.current}
              onBlurCallback={_onBlur}
              activeArc={_getHighlightedLegend()}
              focusedArcId={focusedArcId || ''}
              href={props.href!}
              calloutId={_calloutId.current}
              valueInsideDonut={_toLocaleString(valueInsideDonut)}
              theme={props.theme!}
              showLabelsInPercent={props.showLabelsInPercent}
              hideLabels={hideLabels}
            />
          </svg>
        </div>
      </FocusZone>
      <Callout
        target={_currentHoverElement.current}
        alignTargetEdge={true}
        isBeakVisible={false}
        directionalHint={DirectionalHint.topAutoEdge}
        gapSpace={15}
        hidden={!(!props.hideTooltip && showHover)}
        id={_calloutId.current}
        onDismiss={_closeCallout}
        preventDismissOnLostFocus={true}
        /** Keep the callout updated with details of focused/hovered arc */
        shouldUpdateWhenHidden={true}
        {...props.calloutProps!}
        {...getAccessibleDataObject(callOutAccessibilityData, 'text', false)}
      >
        {props.onRenderCalloutPerDataPoint ? (
          props.onRenderCalloutPerDataPoint(dataPointCalloutProps!)
        ) : (
          <ChartHoverCard
            Legend={xCalloutValue ? xCalloutValue : legend}
            YValue={yCalloutValue ? yCalloutValue : value}
            color={color}
            culture={props.culture}
          />
        )}
      </Callout>
      {!hideLegend && <div className={_classNames.current.legendContainer}>{legendBars}</div>}
    </div>
  );
};
