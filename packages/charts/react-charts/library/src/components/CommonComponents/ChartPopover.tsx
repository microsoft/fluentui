import * as React from 'react';
import { Popover, PopoverSurface } from '@fluentui/react-popover';
import { mergeClasses } from '@griffel/react';
import type { PositioningVirtualElement } from '@fluentui/react-positioning';
import { tokens } from '@fluentui/react-theme';
import { useId } from '@fluentui/react-utilities';
import { getAccessibleDataObject, Points, pointTypes } from '../../utilities/index';
import { convertToLocaleString } from '../../utilities/locale-util';
import { Shape } from '../Legends/shape';
import { usePopoverStyles_unstable } from './useChartPopoverStyles.styles';
import { YValueHover } from './CartesianChart.types';
import { LegendShape } from '../Legends/Legends.types';
import { ChartPopoverProps } from './ChartPopover.types';

/* This component is a wrapper over Popover component which implements the logic for rendering popovers for any chart
combining the logic for Callout and ChartHoverCard in v8 charts. */
export const ChartPopover: React.FunctionComponent<ChartPopoverProps> = React.forwardRef<
  HTMLDivElement,
  ChartPopoverProps
>((props, forwardedRef) => {
  const virtualElement: PositioningVirtualElement = {
    getBoundingClientRect: () => ({
      top: props.clickPosition!.y,
      left: props.clickPosition!.x,
      right: props.clickPosition!.x,
      bottom: props.clickPosition!.y,
      x: props.clickPosition!.x,
      y: props.clickPosition!.y,
      width: 0,
      height: 0,
    }),
  };
  props = { ...props, ...props.customCallout?.customCalloutProps };
  const classes = usePopoverStyles_unstable(props);
  const legend = props.xCalloutValue ? props.xCalloutValue : props.legend;
  const YValue = props.yCalloutValue ? props.yCalloutValue : props.YValue;
  return (
    <div id={useId('callout')} ref={forwardedRef} className={classes.calloutContainer}>
      <Popover
        positioning={{ target: virtualElement, autoSize: 'always', offset: 20, coverTarget: false }}
        open={props.isPopoverOpen}
        inline
      >
        <PopoverSurface>
          {/** Given custom callout, then it will render */}
          {props.customCallout && props.customCallout.customizedCallout && props.customCallout.customizedCallout}
          {/** single x point its corresponding y points of all the bars/lines in chart will render in callout */}
          {(!props.customCallout || !props.customCallout.customizedCallout) &&
            props.isCalloutForStack &&
            _multiValueCallout()}
          {/** single x point its corresponding y point of single line/bar in the chart will render in callout */}
          {(!props.customCallout || !props.customCallout.customizedCallout) && !props.isCalloutForStack && (
            <div className={classes.calloutContentRoot}>
              <div className={classes.calloutDateTimeContainer}>
                <div className={classes.calloutContentX}>{props.XValue} </div>
                {/*TO DO  if we add time for callout then will use this */}
                {/* <div className={classNames.calloutContentX}>07:00am</div> */}
              </div>
              <div
                className={classes.calloutInfoContainer}
                style={{
                  ...(props.ratio && {
                    display: 'flex',
                    alignItems: 'flex-end',
                  }),
                  borderLeft: `4px solid ${props.color}`,
                }}
              >
                <div className={classes.calloutBlockContainer}>
                  <div className={classes.calloutlegendText}>{convertToLocaleString(legend, props.culture)}</div>
                  <div
                    className={classes.calloutContentY}
                    style={{ color: props.color ? props.color : tokens.colorNeutralForeground1 }}
                  >
                    {convertToLocaleString(YValue, props.culture)}
                  </div>
                </div>
                {!!props.ratio && (
                  <div className={classes.ratio}>
                    <>
                      <span className={classes.numerator}>{convertToLocaleString(props.ratio[0], props.culture)}</span>/
                      <span className={classes.denominator}>
                        {convertToLocaleString(props.ratio[1], props.culture)}
                      </span>
                    </>
                  </div>
                )}
              </div>
              {!!props.descriptionMessage && (
                <div className={classes.descriptionMessage}>{props.descriptionMessage}</div>
              )}
            </div>
          )}
        </PopoverSurface>
      </Popover>
    </div>
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function _multiValueCallout() {
    const yValueHoverSubCountsExists: boolean = _yValueHoverSubCountsExists(props.YValueHover) ?? false;
    return (
      <div className={classes.calloutContentRoot}>
        <div
          className={classes.calloutDateTimeContainer}
          style={yValueHoverSubCountsExists ? { marginBottom: '11px' } : {}}
        >
          <div
            className={classes.calloutContentX}
            {...getAccessibleDataObject(props!.xAxisCalloutAccessibilityData, 'text', false)}
          >
            {convertToLocaleString(props!.hoverXValue, props.culture)}
          </div>
        </div>
        <div style={yValueHoverSubCountsExists ? { display: 'flex' } : {}}>
          {props!.YValueHover &&
            props!.YValueHover.map((yValue: YValueHover, index: number, yValues: YValueHover[]) => {
              const isLast: boolean = index + 1 === yValues.length;
              const { shouldDrawBorderBottom = false } = yValue;
              return (
                <div
                  {...getAccessibleDataObject(yValue.callOutAccessibilityData, 'text', false)}
                  key={`callout-content-${index}`}
                  style={
                    yValueHoverSubCountsExists
                      ? {
                          display: 'inline-block',
                          ...(shouldDrawBorderBottom && {
                            borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
                            paddingBottom: '10px',
                          }),
                        }
                      : {
                          ...(shouldDrawBorderBottom && {
                            borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
                            paddingBottom: '10px',
                          }),
                        }
                  }
                >
                  {_getCalloutContent(yValue, index, yValueHoverSubCountsExists, isLast)}
                </div>
              );
            })}
          {!!props.descriptionMessage && <div className={classes.descriptionMessage}>{props.descriptionMessage}</div>}
        </div>
      </div>
    );
  }

  function _yValueHoverSubCountsExists(yValueHover?: YValueHover[]): boolean | undefined {
    return (
      yValueHover &&
      yValueHover.some(
        (yValue: {
          legend?: string;
          y?: number;
          color?: string;
          yAxisCalloutData?: string | { [id: string]: number };
        }) => yValue.yAxisCalloutData && typeof yValue.yAxisCalloutData !== 'string',
      )
    );
  }

  function _getCalloutContent(
    xValue: YValueHover,
    index: number,
    yValueHoverSubCountsExists: boolean,
    isLast: boolean,
  ): React.ReactNode {
    const marginStyle: React.CSSProperties = isLast ? {} : { marginRight: '16px' };
    const toDrawShape = xValue.index !== undefined && xValue.index !== -1;
    const { culture } = props;
    const yValue = convertToLocaleString(xValue.y, culture);
    if (!xValue.yAxisCalloutData || typeof xValue.yAxisCalloutData === 'string') {
      return (
        <div style={yValueHoverSubCountsExists ? marginStyle : {}}>
          {yValueHoverSubCountsExists && (
            <div className="ms-fontWeight-semibold" style={{ fontSize: '12pt' }}>
              {xValue.legend!} ({yValue})
            </div>
          )}
          <div
            id={`${index}_${xValue.y}`}
            className={classes.calloutBlockContainer}
            style={{
              marginTop: props.XValue ? '13px' : 'unset',
              ...(!toDrawShape
                ? {
                    borderLeft: `4px solid ${xValue.color}`,
                  }
                : {}),
            }}
          >
            {toDrawShape && (
              <Shape
                svgProps={{
                  className: classes.shapeStyles,
                }}
                pathProps={{ fill: xValue.color }}
                shape={Points[xValue.index! % Object.keys(pointTypes).length] as LegendShape}
              />
            )}
            <div
              className={mergeClasses(
                classes.calloutBlockContainer,
                toDrawShape
                  ? classes.calloutBlockContainertoDrawShapetrue
                  : classes.calloutBlockContainertoDrawShapefalse,
              )}
            >
              <div className={classes.calloutlegendText}> {xValue.legend}</div>
              <div className={classes.calloutContentY}>
                {convertToLocaleString(
                  xValue.yAxisCalloutData ? xValue.yAxisCalloutData : xValue.y ?? xValue.data,
                  culture,
                )}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      const subcounts: { [id: string]: number } = xValue.yAxisCalloutData as { [id: string]: number };
      return (
        <div style={marginStyle}>
          <div className="ms-fontWeight-semibold" style={{ fontSize: '12pt' }}>
            {xValue.legend!} ({yValue})
          </div>
          {Object.keys(subcounts).map((subcountName: string) => {
            return (
              <div key={subcountName} className={classes.calloutBlockContainer}>
                <div className={classes.calloutlegendText}> {convertToLocaleString(subcountName, culture)}</div>
                <div
                  className={classes.calloutContentY}
                  style={{ color: props.color ? props.color : tokens.colorNeutralForeground1 }}
                >
                  {convertToLocaleString(subcounts[subcountName], culture)}
                </div>
              </div>
            );
          })}
        </div>
      );
    }
  }
});
ChartPopover.displayName = 'ChartPopover';
