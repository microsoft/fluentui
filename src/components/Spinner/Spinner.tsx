import * as React from 'react';
import './Spinner.scss';
import { getRTL } from '../../utilities/rtl';

export interface ISpinnerProps {
  type?: SpinnerType;
  label?: string;
}

export enum SpinnerType {
  normal,
  large
}

const CIRCLE_COUNT = 8;

export default class Spinner extends React.Component<ISpinnerProps, any> {
  public static defaultProps: ISpinnerProps = {
    type: SpinnerType.normal
  };

  public render() {
    let { type, label } = this.props;
    let isRTL = getRTL();

    let parentSize: number = type === SpinnerType.large ? 28 : 20;

    let offsetSize: number = type === SpinnerType.large ? 0.179 : 0.2;
    let offset = parentSize * offsetSize;
    let step = (2 * Math.PI) / CIRCLE_COUNT;
    let angle = 0;
    let i = CIRCLE_COUNT;
    let radius = (parentSize - offset) * 0.5;
    let circleObjects = [];

    while (i--) {
      let x = Math.round(parentSize * 0.5 + radius * Math.cos(angle)) - offset * 0.5;
      let y = Math.round(parentSize * 0.5 + radius * Math.sin(angle)) - offset * 0.5;
      let size = offset + 'px';
      let style = { left: !isRTL ? x : 'auto', right: !isRTL ? 'auto' : x, top: y, width: size, height: size }

      angle += step;
      circleObjects.push(<div className='ms-Spinner-circle' key={ i } style={ style } /> );
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

