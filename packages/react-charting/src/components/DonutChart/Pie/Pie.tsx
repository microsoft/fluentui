import * as React from 'react';
import * as shape from 'd3-shape';
import { IPieProps, IPieStyleProps, IPieStyles } from './index';
import { Arc, IArcData } from '../Arc/index';
import { IChartDataPoint } from '../index';
import { classNamesFunction } from '@fluentui/react/lib/Utilities';
import { getStyles } from './Pie.styles';
import { wrapTextInsideDonut } from '../../../utilities/index';
import { formatPrefix as d3FormatPrefix } from 'd3-format';

const getClassNames = classNamesFunction<IPieStyleProps, IPieStyles>();
const TEXT_PADDING: number = 5;

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
  private _totalValue: number;

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
        showLabelsInPercent={this.props.showLabelsInPercent}
        totalValue={this._totalValue}
      />
    );
  };

  public render(): JSX.Element {
    const { pie, data } = this.props;
    const focusData = this._pieForFocusRing(data);
    const piechart = pie(data);
    const translate = `translate(${this.props.width / 2}, ${this.props.height / 2})`;

    this._getTotalValue();

    return (
      <g transform={translate}>
        {piechart.map((d: IArcData, i: number) => this.arcGenerator(d, i, focusData[i], this.props.href))}
        {this._renderValueInsideDonut()}
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

  private _renderValueInsideDonut = () => {
    const { valueInsideDonut } = this.props;

    if (!valueInsideDonut) {
      return null;
    }

    const classNames = getClassNames(getStyles, {
      theme: this.props.theme!,
    });

    let finalString = valueInsideDonut;
    /** Format the value if it is numeric */
    if (!isNaN(Number(valueInsideDonut))) {
      const value = Number(valueInsideDonut);
      finalString = d3FormatPrefix(value < 1000 ? '.2~' : '.1', value)(value);
    }

    return (
      <text
        y={5}
        textAnchor="middle"
        dominantBaseline="middle"
        className={classNames.insideDonutString}
        data-is-focusable={true}
        aria-label={valueInsideDonut.toString()}
        role="img"
      >
        {finalString}
      </text>
    );
  };

  private _getTotalValue = (): void => {
    this._totalValue = 0;
    this.props.data.forEach((arc: IChartDataPoint) => {
      this._totalValue += arc.data!;
    });
  };
}
