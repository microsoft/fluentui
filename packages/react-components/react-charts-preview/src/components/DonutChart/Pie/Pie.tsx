/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { PieArcDatum, pie as d3Pie } from 'd3-shape';
import { IPieProps } from './index';
import { Arc, IArcData } from '../Arc/index';
import { IChartDataPoint } from '../index';
import { usePieStyles_unstable } from './Pie.styles';
import { wrapTextInsideDonut } from '../../../utilities/index';
const TEXT_PADDING: number = 5;

// Create a Pie within Donut Chart variant which uses these default styles and this styled subcomponent.
/**
 * Pie component within Donut Chart.
 * {@docCategory PieDonutChart}
 */
export const Pie: React.FunctionComponent<IPieProps> = React.forwardRef<HTMLDivElement, IPieProps>(
  (props, forwardedRef) => {
    React.useEffect(() => {
      wrapTextInsideDonut(classes.insideDonutString, props.innerRadius! * 2 - TEXT_PADDING);
    }, []);

    let _totalValue: number;
    const classes = usePieStyles_unstable(props);
    const pieForFocusRing = d3Pie()
      .sort(null)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .value((d: any) => d.data)
      .padAngle(0);

    function _focusCallback(data: IChartDataPoint, id: string, e: SVGPathElement): void {
      props.onFocusCallback!(data, id, e);
    }

    function _hoverCallback(data: IChartDataPoint, e: React.MouseEvent<SVGPathElement>): void {
      props.hoverOnCallback!(data, e);
    }

    function _computeTotalValue() {
      let totalValue = 0;
      props.data.forEach((arc: IChartDataPoint) => {
        totalValue += arc.data!;
      });
      return totalValue;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function arcGenerator(d: any, i: number, focusData: any, href?: string): JSX.Element {
      const color = d && d.data && d.data.color;
      return (
        <Arc
          key={i}
          data={d}
          focusData={focusData}
          innerRadius={props.innerRadius}
          outerRadius={props.outerRadius}
          color={color!}
          onFocusCallback={_focusCallback}
          hoverOnCallback={_hoverCallback}
          onBlurCallback={props.onBlurCallback}
          hoverLeaveCallback={props.hoverLeaveCallback}
          uniqText={props.uniqText}
          activeArc={props.activeArc}
          href={href}
          calloutId={props.calloutId}
          valueInsideDonut={props.valueInsideDonut}
          focusedArcId={props.focusedArcId}
          showLabelsInPercent={props.showLabelsInPercent}
          totalValue={_totalValue}
          hideLabels={true}
        />
      );
    }

    const { data } = props;
    const focusData = pieForFocusRing(data.map(d => d.data));

    // const piechart = d3Pie<DataItem>().value(d => d.value)(data1);
    const piechart = d3Pie<IChartDataPoint>()
      .sort(null)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .value((d: any) => d.data)
      .padAngle(0.02)(data);
    const translate = `translate(${props.width / 2}, ${props.height / 2})`;

    _totalValue = _computeTotalValue();

    return (
      <g transform={translate}>
        {piechart.map((d: any, i: number) => arcGenerator(d, i, focusData[i], props.href))}
        {props.valueInsideDonut && (
          <text y={5} textAnchor="middle" dominantBaseline="middle" className={classes.insideDonutString}>
            {props.valueInsideDonut}
          </text>
        )}
      </g>
    );
  },
);
Pie.displayName = 'Pie';
