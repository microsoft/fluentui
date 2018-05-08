import * as React from 'react';
import {
  BaseComponent,
  css,
  classNamesFunction
} from '../../../Utilities';
import { IBeakProps, BeakDirection } from './Beak.types';
import { getStyles, IBeakStyles } from './Beak.styles';
import { IBeakStylesProps } from './Beak.types';

export interface IBeakState {
  left: string | undefined;
  top: string | undefined;
}

const BEAK_HEIGHT = 8;
const BEAK_WIDTH = 16;

export class Beak extends BaseComponent<IBeakProps, IBeakState> {
  constructor(props: IBeakProps) {
    super(props);
  }

  public render(): JSX.Element {
    const {
      left,
      top,
      direction = BeakDirection.Top
    } = this.props;

    let svgHeight: number;
    let svgWidth: number;

    if (direction == BeakDirection.Top || direction == BeakDirection.Bottom) {
      svgHeight = BEAK_HEIGHT;
      svgWidth = BEAK_WIDTH;
    } else {
      svgHeight = BEAK_WIDTH;
      svgWidth = BEAK_HEIGHT;
    }

    const getClassNames = classNamesFunction<IBeakStylesProps, IBeakStyles>();
    const classNames = getClassNames(getStyles, {
      left,
      top,
      height: `${svgHeight}px`,
      width: `${svgWidth}px`
    });

    let pointOne: string;
    let pointTwo: string;
    let pointThree: string;

    switch (direction) {
      case BeakDirection.Top:
      default:
        pointOne = `${BEAK_HEIGHT}, 0`;
        pointTwo = `${BEAK_WIDTH}, ${BEAK_HEIGHT}`;
        pointThree = `0, ${BEAK_HEIGHT}`;
        break;
      case BeakDirection.Right:
        pointOne = `0, 0`;
        pointTwo = `${BEAK_HEIGHT}, ${BEAK_HEIGHT}`;
        pointThree = `0, ${BEAK_WIDTH}`;
        break;
      case BeakDirection.Bottom:
        pointOne = `0, 0`;
        pointTwo = `${BEAK_WIDTH}, 0`;
        pointThree = `${BEAK_HEIGHT}, ${BEAK_HEIGHT}`;
        break;
      case BeakDirection.Left:
        pointOne = `${BEAK_HEIGHT}, 0`;
        pointTwo = `0, ${BEAK_HEIGHT}`;
        pointThree = `${BEAK_HEIGHT}, ${BEAK_WIDTH}`;
        break;
    }

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