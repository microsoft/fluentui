import * as React from 'react';
import * as shape from 'd3-shape';
import { IArcProps, IArcState, IArcStyles } from './Arc.types';
import { classNamesFunction, getId } from '@fluentui/react/lib/Utilities';
import { getStyles } from './Arc.styles';
import { shouldWrapContent, convertToLocaleString } from '../../../utilities/utilities';
import { SVGTooltipText } from '../../../utilities/SVGTooltipText';

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
      isArcFocused: false,
      id: getId('pie_chart_arc'),
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
      <path
        d={arc(this.props.data)}
        className={`${this.state.isArcFocused ? classNames.pieRootFocused : classNames.pieRoot}`}
        onClick={this.props.data?.data.onClick}
      />
    );
  }

  protected _onFocus = () => {
    this.setState({ isArcFocused: true });
  };

  protected _onBlur = () => {
    this.setState({ isArcFocused: false });
  };
}

export class LabeledArc extends Arc {
  public constructor(props: IArcProps) {
    super(props);
    this.state = {
      id: getId(),
    };
  }

  public render(): JSX.Element {
    const { data, culture } = this.props;
    const gap = 4;
    // placing the labels on the outside arc
    const [labelX, labelY] = shape.arc().centroid({
      endAngle: data?.endAngle || 0,
      startAngle: data?.startAngle || 0,
      padAngle: data?.padAngle,
      innerRadius: this.props?.outerRadius || 0,
      outerRadius: this.props?.outerRadius || 0 + gap,
    });

    const getClassNames = classNamesFunction<IArcProps, IArcStyles>();
    const classNames = getClassNames(props => getStyles(props, this.props.theme));

    const angle = ((data?.startAngle || 0) + (data?.endAngle || 0)) / 2;

    const content = `${data?.data.x}-${convertToLocaleString(data?.data.y, culture)}`;

    return (
      <g
        className={classNames.pie}
        data-is-focusable={true}
        id={this.state.id}
        onFocus={this._onFocus}
        onBlur={this._onBlur}
        aria-label={content}
        role="img"
      >
        {super.render()}
        <SVGTooltipText
          content={content}
          textProps={{
            x: labelX,
            y: labelY,
            dominantBaseline: angle > Math.PI / 2 && angle < (3 * Math.PI) / 2 ? 'hanging' : 'auto',
            textAnchor: angle > Math.PI ? 'end' : 'start',
            'aria-label': `${data?.data.x}-${convertToLocaleString(data?.data.y, culture)}`,
            className: classNames.pieText,
          }}
          isTooltipVisibleProp={this.state.isArcFocused}
          shouldReceiveFocus={false}
          maxWidth={40}
          wrapContent={shouldWrapContent}
        />
      </g>
    );
  }
}

function _updateChart(newProps: IArcProps): void {
  newProps.arc.innerRadius(newProps.innerRadius);
  newProps.arc.outerRadius(newProps.outerRadius);
}
