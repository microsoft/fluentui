import * as React from 'react';
import { ISpinnerProps, SpinnerType } from './Spinner.Props';
import { getRTL } from '../../utilities/rtl';
import { css } from '../../utilities/css';
import './Spinner.scss';

const CIRCLE_COUNT = 8;
const PARENT_SIZE_LARGE = 28;
const PARENT_SIZE_NORMAL = 20;
const OFFSET_SIZE_LARGE = 0.179;
const OFFSET_SIZE_NORMAL = 0.2;

export class Spinner extends React.Component<ISpinnerProps, any> {
  public static defaultProps: ISpinnerProps = {
    type: SpinnerType.normal
  };

  public render() {
    let { type, label, className } = this.props;
    let isRTL = getRTL();
    let parentSize: number = type === SpinnerType.large ? PARENT_SIZE_LARGE : PARENT_SIZE_NORMAL;
    let offsetSize: number = type === SpinnerType.large ? OFFSET_SIZE_LARGE : OFFSET_SIZE_NORMAL;
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
      let style = { left: !isRTL ? x : 'auto', right: !isRTL ? 'auto' : x, top: y, width: size, height: size };

      angle += step;
      circleObjects.push(<div className='ms-Spinner-circle' key={ i } style={ style } /> );
    }

    return (
      <div className={ css('ms-Spinner', className, {
        'ms-Spinner--large': type === SpinnerType.large
      }) }>

        { label && (
          <div className='ms-Spinner-label' role='alert'>{ label }</div>
        ) }

        { circleObjects }
      </div>
    );
  }
}
