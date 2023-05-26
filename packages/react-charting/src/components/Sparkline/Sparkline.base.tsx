import * as React from 'react';
import { scaleLinear as d3ScaleLinear } from 'd3-scale';
import { area as d3Area, line as d3Line, curveLinear as d3curveLinear } from 'd3-shape';
import { max as d3Max, extent as d3Extent } from 'd3-array';
import { FocusZone, FocusZoneDirection } from '@fluentui/react-focus';
import { ILineChartDataPoint } from '../../types/IDataPoint';
import { classNamesFunction } from '@fluentui/react/lib/Utilities';
import { ISparklineProps, ISparklineStyleProps, ISparklineStyles } from '../../index';
import { useClasses } from './Sparkline.styles';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
const getClassNames = classNamesFunction<ISparklineStyleProps, ISparklineStyles>();

export const SparklineBase = (props: ISparklineProps) => {
  const myClass = useClasses();
  const margin = React.useRef({
    top: 2,
    right: 0,
    bottom: 0,
    left: 0,
  });
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const x = React.useRef<any>();
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const y = React.useRef<any>();
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const area = React.useRef<any>();
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const line = React.useRef<any>();
  const [_points, setPoints] = React.useState<ILineChartDataPoint[] | null>(null);
  const [_width] = React.useState<number>(props.width! || 80);
  const [_height] = React.useState<number>(props.height! || 20);
  const [_valueTextWidth] = React.useState<number>(props.valueTextWidth! || 80);
  React.useEffect(() => {
    area.current = d3Area()
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      .x((d: any) => x.current(d.x))
      .y0(_height)
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      .y1((d: any) => y.current(d.y))
      .curve(d3curveLinear);
    line.current = d3Line()
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      .x((d: any) => x.current(d.x))
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      .y((d: any) => y.current(d.y))
      .curve(d3curveLinear);
    const points = props.data!.lineChartData![0].data;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    const [xMin, xMax] = d3Extent(points, (d: any) => d.x);
    x.current = d3ScaleLinear()
      .domain([xMin, xMax])
      .range([margin.current.left!, _width - margin.current.right!]);
    y.current = d3ScaleLinear()
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      .domain([0, d3Max(points, (d: any) => d.y)])
      .range([_height - margin.current.bottom!, margin.current.top!]);
    setPoints(points);
  }, [_height, _width, props.data]);
  const drawSparkline = React.useCallback(() => {
    return (
      <>
        <path
          className={myClass.line}
          style={{ stroke: props.data!.lineChartData![0].color! }}
          d={line.current(_points)}
        />
        <path
          className={myClass.area}
          style={{ fill: props.data!.lineChartData![0].color! }}
          d={area.current(_points)}
          aria-label={`Sparkline with label ${props.data!.lineChartData![0].legend!}`}
        />
      </>
    );
  }, [_points, props.data, myClass.area, myClass.line]);
  const classNames = getClassNames(props.styles!, {
    theme: props.theme!,
  });
  return (
    <FluentProvider theme={webLightTheme}>
      <FocusZone
        direction={FocusZoneDirection.horizontal}
        isCircularNavigation={true}
        className={classNames.inlineBlock}
      >
        <div className={myClass.inlineBlock}>
          {_width >= 50 && _height >= 16 ? (
            <svg width={_width} height={_height} data-is-focusable={true}>
              {_points ? drawSparkline() : null}
            </svg>
          ) : (
            <></>
          )}
          {props.showLegend && props.data!.lineChartData![0].legend ? (
            <svg width={_valueTextWidth} height={_height} data-is-focusable={true}>
              <text x="0%" dx={8} y="100%" dy={-5} className={myClass.valueText}>
                {props.data!.lineChartData![0].legend!}
              </text>
            </svg>
          ) : (
            <></>
          )}
        </div>
      </FocusZone>
    </FluentProvider>
  );
};
