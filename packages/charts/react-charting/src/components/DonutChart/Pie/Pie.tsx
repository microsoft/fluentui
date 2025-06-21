import * as React from 'react';
import { pie as d3Pie } from 'd3-shape';
import { IPieProps, IPieStyleProps, IPieStyles } from './index';
import { Arc, IArcData } from '../Arc/index';
import { IChartDataPoint } from '../index';
import { classNamesFunction } from '@fluentui/react/lib/Utilities';
import { getStyles } from './Pie.styles';
import { getNextGradient, wrapTextInsideDonut } from '../../../utilities/index';

const getClassNames = classNamesFunction<IPieStyleProps, IPieStyles>();
const TEXT_PADDING: number = 5;

export class Pie extends React.Component<IPieProps, {}> {
  public static defaultProps: Partial<IPieProps> = {
    pie: d3Pie()
      .sort(null)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .value((d: any) => d.data)
      .padAngle(0.02),
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _pieForFocusRing: any;
  private _totalValue: number;

  constructor(props: IPieProps) {
    super(props);
    this._hoverCallback = this._hoverCallback.bind(this);
    this._pieForFocusRing = d3Pie()
      .sort(null)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .value((d: any) => d.data)
      .padAngle(0);
  }

  // eslint-disable-next-line @typescript-eslint/no-deprecated
  public arcGenerator = (d: IArcData, i: number, focusData: IArcData, href?: string): JSX.Element => {
    let color = d && d.data && d.data.color;
    let nextColor = color;

    if (this.props.enableGradient) {
      color = this.props.data[i].gradient?.[0] ?? getNextGradient(i, 0, this.props.theme!.isInverted)[0];
      nextColor = this.props.data[i].gradient?.[1] ?? getNextGradient(i, 0, this.props.theme!.isInverted)[1];
    }

    return (
      <Arc
        key={i}
        data={d}
        focusData={focusData}
        innerRadius={this.props.innerRadius}
        outerRadius={this.props.outerRadius}
        color={color!}
        nextColor={nextColor}
        enableGradient={this.props.enableGradient}
        roundCorners={this.props.roundCorners}
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
        showLabelsInPercent={this.props.showLabelsInPercent}
        totalValue={this._totalValue}
        hideLabels={this.props.hideLabels}
      />
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-deprecated
  public render(): JSX.Element {
    const { pie, data } = this.props;
    const focusData = this._pieForFocusRing(data);
    const piechart = pie(data);
    const translate = `translate(${this.props.width / 2}, ${this.props.height / 2})`;
    const classNames = getClassNames(getStyles, {
      theme: this.props.theme!,
    });

    this._totalValue = this._computeTotalValue();

    return (
      <g transform={translate}>
        {piechart.map((d: IArcData, i: number) => this.arcGenerator(d, i, focusData[i], this.props.href))}
        {this.props.valueInsideDonut && (
          <text y={5} textAnchor="middle" dominantBaseline="middle" className={classNames.insideDonutString}>
            {this.props.valueInsideDonut}
          </text>
        )}
      </g>
    );
  }

  public componentDidUpdate(): void {
    const classNames = getClassNames(getStyles, {
      theme: this.props.theme!,
    });

    wrapTextInsideDonut(classNames.insideDonutString, this.props.innerRadius! * 2 - TEXT_PADDING);
  }

  private _focusCallback = (data: IChartDataPoint, id: string, e: SVGPathElement): void => {
    this.props.onFocusCallback!(data, id, e);
  };

  private _hoverCallback(data: IChartDataPoint, e: React.MouseEvent<SVGPathElement>): void {
    this.props.hoverOnCallback!(data, e);
  }

  private _computeTotalValue = () => {
    let totalValue = 0;
    this.props.data.forEach((arc: IChartDataPoint) => {
      totalValue += arc.data!;
    });
    return totalValue;
  };
}
