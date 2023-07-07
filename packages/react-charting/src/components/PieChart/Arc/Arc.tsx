import * as React from 'react';
import * as shape from 'd3-shape';
import { IArcProps, IArcState, IArcStyles } from './Arc.types';
import { classNamesFunction, getId } from '@fluentui/react/lib/Utilities';
import { getStyles } from './Arc.styles';
import { convertToLocaleString } from '../../../utilities/utilities';
import { SVGTooltipText } from '../../../utilities/SVGTooltipText';
import { select as d3Select } from 'd3-selection';

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
          className={`${this.state.isArcFocused ? classNames.pieRootFocused : classNames.pieRoot}`}
          onClick={this.props.data?.data.onClick}
        >
          {/* <desc>
            {this.props.data!.data!.x}-{convertToLocaleString(this.props.data!.data!.y, this.props.culture)}
          </desc> */}
        </path>
        {this.state.isArcFocused ? <path stroke={this.props.theme?.palette.black} /> : null}
      </>
    );
  }

  protected _onFocus = () => {
    this.setState({ isArcFocused: true });
    this.props.onPieFocused(this.state.id);
  };

  protected _onBlur = () => {
    this.setState({ isArcFocused: false });
    this.props.onPieFocused('');
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
    const [labelX, labelY] = shape.arc().centroid({
      endAngle: data?.endAngle || 0,
      startAngle: data?.startAngle || 0,
      padAngle: data?.padAngle,
      innerRadius: this.props.outerRadius,
      outerRadius: this.props.outerRadius + gap,
    });

    const getClassNames = classNamesFunction<IArcProps, IArcStyles>();
    const classNames = getClassNames(props => getStyles(props, this.props.theme));

    const angle = ((data?.startAngle || 0) + (data?.endAngle || 0)) / 2;

    return (
      <g
        onFocus={this._onFocus}
        onBlur={this._onBlur}
        className={classNames.pie}
        data-is-focusable={true}
        id={this.state.id}
      >
        {super.render()}
        <SVGTooltipText
          content={`${data?.data.x}-${convertToLocaleString(data?.data.y, culture)}`}
          textProps={{
            x: labelX,
            y: labelY,
            dominantBaseline: angle > Math.PI / 2 && angle < (3 * Math.PI) / 2 ? 'hanging' : 'auto',
            textAnchor: angle > Math.PI ? 'end' : 'start',
            role: 'img',
            'aria-label': `${data?.data.x}-${convertToLocaleString(data?.data.y, culture)}`,
            className: classNames.pieText,
          }}
          maxWidth={40}
          wrapContent={this._wrapContent}
        />
      </g>
    );
  }

  private _wrapContent = (content: string, id: string, maxWidth: number) => {
    const textElement = d3Select<SVGTextElement, {}>(`#${id}`);
    textElement.text(content);
    if (!textElement.node()) {
      return false;
    }

    let isOverflowing = false;
    let textLength = textElement.node()!.getComputedTextLength();
    while (textLength > maxWidth && content.length > 0) {
      content = content.slice(0, -1);
      textElement.text(content + '...');
      isOverflowing = true;
      textLength = textElement.node()!.getComputedTextLength();
    }
    return isOverflowing;
  };
}

function _updateChart(newProps: IArcProps): void {
  newProps.arc.innerRadius(newProps.innerRadius);
  newProps.arc.outerRadius(newProps.outerRadius);
}
