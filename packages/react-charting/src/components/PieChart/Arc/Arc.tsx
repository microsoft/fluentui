import * as React from 'react';
import * as shape from 'd3-shape';
import { IArcProps, IArcState, IArcStyles } from './Arc.types';
import { classNamesFunction } from '@fluentui/react/lib/Utilities';
import { getStyles } from './Arc.styles';
import { convertToLocaleString } from '../../../utilities/utilities';

export class Arc extends React.Component<IArcProps, IArcState> {
  public static defaultProps: Partial<IArcProps> = {
    arc: shape.arc(),
  };

  public static getDerivedStateFromProps(nextProps: Readonly<IArcProps>): null {
    _updateChart(nextProps);
    return null;
  }

  public constructor(props: IArcProps) {
    super(props);
    this.state = {
      isArcFocussed: false,
    };
  }

  public updateChart = (newProps: IArcProps) => {
    _updateChart(newProps);
  };

  public render(): JSX.Element {
    const { arc } = this.props;
    const getClassNames = classNamesFunction<IArcProps, IArcStyles>();
    const classNames = getClassNames(props => getStyles(props, this.props.theme), { ...this.props });

    return (
      <>
        <path
          d={arc(this.props.data)}
          className={`${this.state.isArcFocussed ? classNames.pieRootFocussed : classNames.pieRoot}`}
          onClick={this.props.data?.data.onClick}
        >
          <desc>
            {this.props.data!.data!.x}-{convertToLocaleString(this.props.data!.data!.y, this.props.culture)}
          </desc>
        </path>
        {this.state.isArcFocussed ? <path stroke={this.props.theme?.palette.black} /> : null}
      </>
    );
  }

  protected _onFocus = () => {
    this.setState({ isArcFocussed: true });
    this.props.onPieFocussed(JSON.stringify(this.props.data));
  };

  protected _onBlur = () => {
    this.setState({ isArcFocussed: false });
    this.props.onPieFocussed(JSON.stringify(this.props.data));
  };
}

export class LabeledArc extends Arc {
  public constructor(props: IArcProps) {
    super(props);
  }

  public render(): JSX.Element {
    const { data, culture } = this.props;
    const gap = 10;
    const [labelX, labelY] = shape.arc().centroid({
      endAngle: data?.endAngle || 0,
      startAngle: data?.startAngle || 0,
      padAngle: data?.padAngle,
      innerRadius: this.props.outerRadius,
      outerRadius: this.props.outerRadius + gap,
    });
    const labelTranslate = `translate(${labelX}, ${labelY})`;

    const getClassNames = classNamesFunction<IArcProps, IArcStyles>();
    const classNames = getClassNames(props => getStyles(props, this.props.theme));

    const angle = ((data?.startAngle || 0) + (data?.endAngle || 0)) / 2;

    return (
      <g
        onFocus={this._onFocus}
        onBlur={this._onBlur}
        className={classNames.pie}
        data-is-focusable={true}
        id={JSON.stringify(this.props.data)}
        textAnchor={angle > Math.PI ? 'end' : 'start'}
        dominantBaseline={angle > Math.PI / 2 && angle < (3 * Math.PI) / 2 ? 'hanging' : 'auto'}
      >
        {super.render()}
        <text className={classNames.pieText} transform={labelTranslate}>
          {data!.data!.x}-{convertToLocaleString(data!.data!.y, culture)}
        </text>
      </g>
    );
  }
}

function _updateChart(newProps: IArcProps): void {
  newProps.arc.innerRadius(newProps.innerRadius);
  newProps.arc.outerRadius(newProps.outerRadius);
}
