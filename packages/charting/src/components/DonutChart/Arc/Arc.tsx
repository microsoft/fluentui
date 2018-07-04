import * as React from 'react';
import * as d3 from 'd3-shape';
import { IArcProps, IArcStyles } from './Arc.types';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { getStyles } from './Arc.styles';

export class Arc extends React.Component<IArcProps, {}> {
  // tslint:disable:no-any
  public arc: any;

  constructor(props: IArcProps) {
    super(props);
    this.arc = d3.arc();
  }
  public updateD3 = (newProps: IArcProps) => {
    this.arc.innerRadius(newProps.innerRadius);
    this.arc.outerRadius(newProps.outerRadius);
  };
  public componentWillMount(): void {
    this.updateD3(this.props);
  }

  public componentWillReceiveProps(newProps: IArcProps): void {
    this.updateD3(newProps);
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
