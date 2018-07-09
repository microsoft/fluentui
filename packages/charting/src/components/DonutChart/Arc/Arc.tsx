import * as React from 'react';
import * as shape from 'd3-shape';
import { IArcProps, IArcStyles } from './Arc.types';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { getStyles } from './Arc.styles';

export class Arc extends React.Component<IArcProps, {}> {
  // tslint:disable:no-any
  public arc: any;

  constructor(props: IArcProps) {
    super(props);
    this.arc = shape.arc();
  }
  public updateChart = (newProps: IArcProps) => {
    this.arc.innerRadius(newProps.innerRadius);
    this.arc.outerRadius(newProps.outerRadius);
  };
  public componentWillMount(): void {
    this.updateChart(this.props);
  }

  public componentWillReceiveProps(newProps: IArcProps): void {
    this.updateChart(newProps);
  }

  public render(): JSX.Element {
    const { color } = this.props;
    const getClassNames = classNamesFunction<IArcProps, IArcStyles>();
    const classNames = getClassNames(getStyles, { color });
    return <path d={this.arc(this.props.data)} className={classNames.root} />;
  }
}

export class LabeledArc extends Arc {
  public render(): JSX.Element {
    const { data } = this.props;
    const [labelX, labelY] = this.arc.centroid(data),
      labelTranslate = `translate(${labelX}, ${labelY})`;

    return (
      <g className="arc">
        {super.render()}
        <text transform={labelTranslate} textAnchor="middle">
          {data!.data!.label}-{data!.data!.value}
        </text>
      </g>
    );
  }
}
