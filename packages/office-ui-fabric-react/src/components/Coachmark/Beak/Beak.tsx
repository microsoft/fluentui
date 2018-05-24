import * as React from 'react';
import {
  BaseComponent,
  css,
  classNamesFunction
} from '../../../Utilities';
import { BeakDirection, IBeakProps } from './Beak.types';
import { getStyles, IBeakStyles } from './Beak.styles';
import { IBeakStylesProps } from './Beak.types';

export const BEAK_HEIGHT = 10;
export const BEAK_WIDTH = 18;

export class Beak extends BaseComponent<IBeakProps, {}> {
  constructor(props: IBeakProps) {
    super(props);
  }

  public render(): JSX.Element {
    const {
      left,
      top,
      bottom,
      right,
      direction = BeakDirection.Top
    } = this.props;

    let svgHeight: number;
    let svgWidth: number;

    if (direction === BeakDirection.Top || direction === BeakDirection.Bottom) {
      svgHeight = BEAK_HEIGHT;
      svgWidth = BEAK_WIDTH;
    } else {
      svgHeight = BEAK_WIDTH;
      svgWidth = BEAK_HEIGHT;
    }

    let pointOne: string;
    let pointTwo: string;
    let pointThree: string;
    let transform: string;

    switch (direction) {
      case BeakDirection.Top:
      default:
        pointOne = `${BEAK_WIDTH / 2}, 0`;
        pointTwo = `${BEAK_WIDTH}, ${BEAK_HEIGHT}`;
        pointThree = `0, ${BEAK_HEIGHT}`;
        transform = 'translateY(-100%)';
        break;
      case BeakDirection.Right:
        pointOne = `0, 0`;
        pointTwo = `${BEAK_HEIGHT}, ${BEAK_HEIGHT}`;
        pointThree = `0, ${BEAK_WIDTH}`;
        transform = 'translateX(100%)';
        break;
      case BeakDirection.Bottom:
        pointOne = `0, 0`;
        pointTwo = `${BEAK_WIDTH}, 0`;
        pointThree = `${BEAK_HEIGHT}, ${BEAK_HEIGHT}`;
        transform = 'translateY(100%)';
        break;
      case BeakDirection.Left:
        pointOne = `${BEAK_HEIGHT}, 0`;
        pointTwo = `0, ${BEAK_HEIGHT}`;
        pointThree = `${BEAK_HEIGHT}, ${BEAK_WIDTH}`;
        transform = 'translateX(-100%)';
        break;
    }

    const getClassNames = classNamesFunction<IBeakStylesProps, IBeakStyles>();
    const classNames = getClassNames(getStyles, {
      left,
      top,
      bottom,
      right,
      height: `${svgHeight}px`,
      width: `${svgWidth}px`,
      transform: transform
    });

    return (
      <div
        className={ css('ms-Beak', classNames.root) }
      >
        <svg
          height={ svgHeight }
          width={ svgWidth }
          className={ classNames.beak }
        >
          <polygon points={ pointOne + ' ' + pointTwo + ' ' + pointThree } />
        </svg>
      </div>
    );
  }
}