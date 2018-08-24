import * as React from 'react';
import * as shape from 'd3-shape';
import { IArcProps, IArcStyles } from './Arc.types';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { getStyles } from './Arc.styles';
import { Callout } from 'office-ui-fabric-react/lib/Callout';

export class Arc extends React.Component<IArcProps, { isCalloutVisible: boolean }> {
  public static defaultProps: Partial<IArcProps> = {
    arc: shape.arc()
  };
  private _hoverCard: SVGPathElement | null;
  constructor(props: IArcProps) {
    super(props);
    this.state = {
      isCalloutVisible: false
    };
    this._hoverOn = this._hoverOn.bind(this);
    this._hoverOff = this._hoverOff.bind(this);
  }

  public updateChart(newProps: IArcProps): void {
    newProps.arc.innerRadius(newProps.innerRadius);
    newProps.arc.outerRadius(newProps.outerRadius);
  }

  public componentWillMount(): void {
    this.updateChart(this.props);
  }

  public componentWillReceiveProps(newProps: IArcProps): void {
    this.updateChart(newProps);
  }

  public render(): JSX.Element {
    const { color, arc } = this.props;
    const getClassNames = classNamesFunction<IArcProps, IArcStyles>();
    const classNames = getClassNames(getStyles, { color });

    return (
      <g>
        <path
          d={arc(this.props.data)}
          className={classNames.root}
          onMouseOver={this._hoverOn}
          onMouseLeave={this._hoverOff}
          ref={(hoverCard: SVGPathElement | null) => (this._hoverCard = hoverCard)}
        />
        {this.state.isCalloutVisible ? (
          <Callout
            target={this._hoverCard}
            className="ms-CalloutExample-callout"
            coverTarget={true}
            isBeakVisible={false}
            gapSpace={0}
          >
            <div className={classNames.hover}>
              <p className="ms-CalloutExample-title">{this.props.data!.data.data}</p>
            </div>
            <div className="ms-CalloutExample-inner">
              <div className="ms-CalloutExample-content" />
            </div>
          </Callout>
        ) : null}
      </g>
    );
  }
  private _hoverOn(): void {
    this.setState({ isCalloutVisible: true });
  }
  private _hoverOff(): void {
    this.setState({ isCalloutVisible: false });
  }
}
