import * as React from 'react';
import * as shape from 'd3-shape';
import { IArcProps, IArcStyles } from './Arc.types';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { getStyles } from './Arc.styles';

export class Arc extends React.Component<IArcProps, {}> {
  public static defaultProps: Partial<IArcProps> = {
    arc: shape.arc(),
  };

  public state: {} = {};

  public static getDerivedStateFromProps(nextProps: Readonly<IArcProps>): null {
    _updateChart(nextProps);
    return null;
  }

  public updateChart = (newProps: IArcProps) => {
    _updateChart(newProps);
  };

  public render(): JSX.Element {
    const { color, arc } = this.props;
    const getClassNames = classNamesFunction<IArcProps, IArcStyles>();
    const classNames = getClassNames(getStyles, { color });
    return <path d={arc(this.props.data)} className={classNames.root} />;
  }
}

export class LabeledArc extends Arc {
  public render(): JSX.Element {
    const { data, arc } = this.props;
    const [labelX, labelY] = arc.centroid(data);
    const labelTranslate = `translate(${labelX}, ${labelY})`;

    return (
      <g className="arc">
        {super.render()}
        <text transform={labelTranslate} textAnchor="middle">
          {data!.data!.x}-{data!.data!.y}
        </text>
      </g>
    );
  }
}

function _updateChart(newProps: IArcProps): void {
  newProps.arc.innerRadius(newProps.innerRadius);
  newProps.arc.outerRadius(newProps.outerRadius);
}
