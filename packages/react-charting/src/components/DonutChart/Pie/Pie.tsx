import * as React from 'react';
import * as shape from 'd3-shape';
import { IPieProps } from './index';
import { Arc, IArcData } from '../Arc/index';
import { IChartDataPoint } from '../index';
import { useStyles } from './Pie.styles';
import { wrapTextInsideDonut } from '../../../utilities/index';

// const getClassNames = classNamesFunction<IPieStyleProps, IPieStyles>();
const TEXT_PADDING: number = 5;

export const Pie = (props: IPieProps) => {
  const pie = React.useRef(
    shape
      .pie()
      .sort(null)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .value((d: any) => d.data)
      .padAngle(0.02),
  );

  const _pieForFocusRing = React.useRef(
    shape
      .pie()
      .sort(null)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .value((d: any) => d.data)
      .padAngle(0),
  );
  const pieStyle = useStyles();
  const _totalValue = React.useRef<number>(0);
  React.useEffect((): void => {
    wrapTextInsideDonut(pieStyle.insideDonutString, props.innerRadius! * 2 - TEXT_PADDING);
  }, [pieStyle.insideDonutString, props.innerRadius]);

  const _focusCallback = React.useCallback(
    (data: IChartDataPoint, id: string, e: SVGPathElement): void => {
      props.onFocusCallback!(data, id, e);
    },
    [props.onFocusCallback],
  );

  const _hoverCallback = React.useCallback(
    (data: IChartDataPoint, e: React.MouseEvent<SVGPathElement>): void => {
      props.hoverOnCallback!(data, e);
    },
    [props.hoverOnCallback],
  );

  const _computeTotalValue = React.useCallback(() => {
    let totalValue = 0;
    props.data.forEach((arc: IChartDataPoint) => {
      totalValue += arc.data!;
    });
    return totalValue;
  }, [props.data]);

  const arcGenerator = React.useCallback(
    (d: IArcData, i: number, focusData: IArcData, href?: string): JSX.Element => {
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
          theme={props.theme!}
          focusedArcId={props.focusedArcId}
          showLabelsInPercent={props.showLabelsInPercent}
          totalValue={_totalValue.current}
          hideLabels={props.hideLabels}
        />
      );
    },
    [_focusCallback, _hoverCallback, props],
  );

  const { data, valueInsideDonut } = props;
  const focusData = _pieForFocusRing.current(data as { valueOf(): number }[]);
  const piechart = pie.current(data as { valueOf(): number }[]);
  const translate = `translate(${props.width / 2}, ${props.height / 2})`;

  _totalValue.current = _computeTotalValue();

  return (
    <g transform={translate}>
      {piechart.map((d, i) => arcGenerator(d as IArcData, i, focusData[i] as IArcData, props.href))}
      {valueInsideDonut && (
        <text
          y={5}
          textAnchor="middle"
          dominantBaseline="middle"
          className={pieStyle.insideDonutString}
          data-is-focusable={true}
        >
          {valueInsideDonut}
        </text>
      )}
    </g>
  );
};
