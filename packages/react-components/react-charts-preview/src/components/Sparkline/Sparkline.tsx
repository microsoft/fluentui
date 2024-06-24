import * as React from 'react';
import { useSparklineStyles_unstable } from './useSparklineStyles.styles';
import { scaleLinear as d3ScaleLinear } from 'd3-scale';
import { area as d3Area, line as d3Line, curveLinear as d3curveLinear } from 'd3-shape';
import { max as d3Max, extent as d3Extent } from 'd3-array';
import { useFocusableGroup } from '@fluentui/react-tabster';
import { ILineChartDataPoint } from '../../types/IDataPoint';
import { isRtl } from '../../utilities/index';
import { ISparklineProps } from '../../index';

/**
 * Sparkline is the context wrapper and container for all Sparkline content/controls,
 * It has no direct style or slot opinions.
 *
 * Sparkline also provides API interfaces for callbacks that will occur on navigation events.
 */
export const Sparkline: React.FunctionComponent<ISparklineProps> = React.forwardRef<HTMLDivElement, ISparklineProps>(
  (props, forwardedRef) => {
    let margin = {
      top: 2,
      right: 0,
      bottom: 0,
      left: 0,
    };
    let x: any;
    let y: any;
    // let area: any = null;
    //let line: any = null;
    let _emptyChartId: string;
    let _isRTL: boolean = isRtl();
    const [points, setPoints] = React.useState<ILineChartDataPoint[] | null>(null);
    const [width, setWidth] = React.useState<number>(80);
    const [height, setHight] = React.useState<number>(20);
    const [valueTextWidth, setValueTextWidth] = React.useState<number>(80);

    const line = React.useMemo(() => {
      return (
        d3Line()
          /* eslint-disable @typescript-eslint/no-explicit-any */
          .x((d: any) => x(d.x))
          /* eslint-disable @typescript-eslint/no-explicit-any */
          .y((d: any) => y(d.y))
          .curve(d3curveLinear)
      );
    }, [x, y]);

    const area = React.useMemo(() => {
      return (
        d3Area()
          /* eslint-disable @typescript-eslint/no-explicit-any */
          .x((d: any) => x(d.x))
          .y0(height)
          /* eslint-disable @typescript-eslint/no-explicit-any */
          .y1((d: any) => y(d.y))
          .curve(d3curveLinear)
      );
    }, [height, x, y]);

    React.useEffect(() => {
      if (!_isChartEmpty()) {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const _points = props.data!.lineChartData![0].data;

        /* eslint-disable @typescript-eslint/no-explicit-any */
        const [xMin, xMax] = d3Extent(_points, (d: any) => d.x);

        // eslint-disable-next-line react-hooks/exhaustive-deps
        x = d3ScaleLinear()
          .domain([xMin, xMax])
          .range([margin.left!, width - margin.right!]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        y = d3ScaleLinear()
          /* eslint-disable @typescript-eslint/no-explicit-any */
          .domain([0, d3Max(_points, (d: any) => d.y)])
          .range([height - margin.bottom!, margin.top!]);

        setPoints(_points);
      }
    }, []);

    const { data } = props;
    function _isChartEmpty(): boolean {
      return !(
        data &&
        data.lineChartData &&
        data.lineChartData.length > 0 &&
        data.lineChartData.filter(item => item.data.length === 0).length === 0
      );
    }
    function drawSparkline() {
      if (!line || !area) {
        return null;
      }
      return (
        <>
          <path
            className="line"
            d={line(points)}
            fill={'transparent'}
            opacity={1}
            strokeWidth={2}
            stroke={data!.lineChartData![0].color!}
          />
          <path
            className="area"
            d={area(points)}
            opacity={1}
            fillOpacity={0.2}
            fill={data!.lineChartData![0].color!}
            role="img"
            aria-hidden
          />
        </>
      );
    }

    const classes = useSparklineStyles_unstable(props);
    const focusAttributes = useFocusableGroup();
    return !_isChartEmpty() ? (
      <div className={classes.inlineBlock} {...focusAttributes}>
        {width >= 50 && height >= 16 ? (
          <svg
            width={width}
            height={height}
            data-is-focusable={true}
            aria-label={`Sparkline with label ${data!.lineChartData![0].legend!}`}
          >
            {points ? drawSparkline() : null}
          </svg>
        ) : (
          <></>
        )}
        {props.showLegend && props.data!.lineChartData![0].legend ? (
          <svg width={valueTextWidth} height={height} data-is-focusable={true}>
            <text x="0%" textAnchor={_isRTL ? 'end' : 'start'} dx={8} y="100%" dy={-5} className={classes.valueText}>
              {props.data!.lineChartData![0].legend!}
            </text>
          </svg>
        ) : (
          <></>
        )}
      </div>
    ) : (
      <div id={_emptyChartId} role={'alert'} style={{ opacity: '0' }} aria-label={'Graph has no data to display'} />
    );
  },
);
Sparkline.displayName = 'Sparkline';
