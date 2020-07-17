import * as React from 'react';
import * as shape from 'd3-shape';
import { IPieProps } from './Pie.types';
import { Arc } from '../Arc/Arc';
import { IArcData } from '../Arc/Arc.types';
import { IChartDataPoint } from '../index';

export class Pie extends React.Component<IPieProps, {}> {
  public static defaultProps: Partial<IPieProps> = {
    pie: shape
      .pie()
      .sort(null)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .value((d: any) => d.data)
      .padAngle(0.02),
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _pieForFocusRing: any;
  constructor(props: IPieProps) {
    super(props);
    this._hoverCallback = this._hoverCallback.bind(this);
    this._pieForFocusRing = shape
      .pie()
      .sort(null)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .value((d: any) => d.data)
      .padAngle(0);
  }

  public arcGenerator = (d: IArcData, i: number, focusData: IArcData, href?: string): JSX.Element => {
    const color = d && d.data && d.data.color;
    return (
      <Arc
        key={i}
        data={d}
        focusData={focusData}
        innerRadius={this.props.innerRadius}
        outerRadius={this.props.outerRadius}
        color={color!}
        onFocusCallback={this._focusCallback}
        hoverOnCallback={this._hoverCallback}
        onBlurCallback={this.props.onBlurCallback}
        hoverLeaveCallback={this.props.hoverLeaveCallback}
        uniqText={this.props.uniqText}
        activeArc={this.props.activeArc}
        href={href}
        calloutId={this.props.calloutId}
        valueInsideDonut={this.props.valueInsideDonut}
        theme={this.props.theme!}
        focusedArcId={this.props.focusedArcId}
      />
    );
  };

  public render(): JSX.Element {
    const { pie, data, width, height, href } = this.props;
    const focusData = this._pieForFocusRing(data);
    const piechart = pie(data);
    const translate = `translate(${width / 2}, ${height / 2})`;
    return (
      <g transform={translate}>
        {piechart.map((d: IArcData, i: number) => this.arcGenerator(d, i, focusData[i], href))}
      </g>
    );
  }

  private _focusCallback = (data: IChartDataPoint, id: string, e: SVGPathElement): void => {
    this.props.onFocusCallback!(data, id, e);
  };

  private _hoverCallback(data: IChartDataPoint, e: React.MouseEvent<SVGPathElement>): void {
    this.props.hoverOnCallback!(data, e);
  }
}
