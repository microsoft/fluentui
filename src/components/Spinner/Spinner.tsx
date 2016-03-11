import * as React from 'react';
import './Spinner.scss';

export enum SpinnerType {
  normal,
  large
}

export interface ISpinnerProps {
  type?:SpinnerType;
  label?:string;
}

export default class Spinner extends React.Component<ISpinnerProps, any> {

  public static defaultProps: ISpinnerProps = {
    type: SpinnerType.normal
  };

  private static offsetSize:number = 0.179;
  private static numCircles:number = 8;
  private static fadeIncrement: number = 1 / Spinner.numCircles;

  render() {
    let { type, label } = this.props;

    let parentSize:number = type === SpinnerType.large ? 28 : 20;

    let offset = parentSize * Spinner.offsetSize;
    let step = (2 * Math.PI) / Spinner.numCircles;
    let angle = 0;
    let i = Spinner.numCircles;
    let j = 1;
    let radius = (parentSize - offset) * 0.5;
    let clientWidth = 0;
    let clientHeight = 0;

    var circleObjects = [];
    while(i--) {
      let x = Math.round(parentSize * 0.5 + radius * Math.cos(angle) - clientWidth * 0.5) - offset * 0.5;
      let y = Math.round(parentSize * 0.5 + radius * Math.sin(angle) - clientHeight * 0.5) - offset * 0.5;
      let size = parentSize * Spinner.offsetSize + "px";
      angle += step;
      circleObjects.push(<div className="ms-Spinner-circle" key={i} style={ { left: x+"px", top: y+"px", width: size, height: size } } /> );
    }

    let spinnerClass = type === SpinnerType.large ? "ms-Spinner ms-Spinner--large" : "ms-Spinner";
    var labelElement;
    if(label) {
      labelElement = <div className="ms-Spinner-label">Loading...</div>;
    }

    return (
      <div className={spinnerClass}>
        {labelElement}
        {circleObjects}
      </div>
    );
  }
}

