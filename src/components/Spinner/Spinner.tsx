import * as React from 'react';
import './Spinner.scss';

export interface ISpinnerProps {
  type?: SpinnerType;
  label?: string;
}

export enum SpinnerType {
  normal,
  large
}

const CIRCLE_OFFSET_SIZE = 0.179;
const CIRCLE_COUNT = 8;

export default class Spinner extends React.Component<ISpinnerProps, any> {
  public static defaultProps: ISpinnerProps = {
    type: SpinnerType.normal
  };

  public render() {
    let { type, label } = this.props;

    let parentSize: number = type === SpinnerType.large ? 28 : 20;

    let offset = parentSize * CIRCLE_OFFSET_SIZE;
    let step = (2 * Math.PI) / CIRCLE_COUNT;
    let angle = 0;
    let i = CIRCLE_COUNT;
    let radius = (parentSize - offset) * 0.5;
    let clientWidth = 0;
    let clientHeight = 0;
    let circleObjects = [];

    while (i--) {
      let x = Math.round(parentSize * 0.5 + radius * Math.cos(angle) - clientWidth * 0.5) - offset * 0.5;
      let y = Math.round(parentSize * 0.5 + radius * Math.sin(angle) - clientHeight * 0.5) - offset * 0.5;
      let size = parentSize * CIRCLE_OFFSET_SIZE + 'px';

      angle += step;
      circleObjects.push(<div className='ms-Spinner-circle' key={ i } style={ { left: x, top: y, width: size, height: size } } /> );
    }

    let spinnerClass = type === SpinnerType.large ? 'ms-Spinner ms-Spinner--large' : 'ms-Spinner';
    let labelElement;

    if (label) {
      labelElement = <div className='ms-Spinner-label'>Loading...</div>;
    }

    return (
      <div className={ spinnerClass }>
        { labelElement }
        { circleObjects }
      </div>
    );
  }
}

