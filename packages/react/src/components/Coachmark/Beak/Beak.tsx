import * as React from 'react';
import { classNamesFunction } from '../../../Utilities';
import { getStyles } from './Beak.styles';
import { RectangleEdge } from '../../../Positioning';
import type { IBeakProps, IBeakStylesProps } from './Beak.types';
import type { IBeakStyles } from './Beak.styles';

export const BEAK_HEIGHT = 10;
export const BEAK_WIDTH = 18;

export const Beak: React.FunctionComponent<IBeakProps> = React.forwardRef<HTMLDivElement, IBeakProps>(
  (props, forwardedRef) => {
    const { left, top, bottom, right, color, direction = RectangleEdge.top } = props;

    let svgHeight: number;
    let svgWidth: number;

    if (direction === RectangleEdge.top || direction === RectangleEdge.bottom) {
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
      case RectangleEdge.top:
      default:
        pointOne = `${BEAK_WIDTH / 2}, 0`;
        pointTwo = `${BEAK_WIDTH}, ${BEAK_HEIGHT}`;
        pointThree = `0, ${BEAK_HEIGHT}`;
        transform = 'translateY(-100%)';
        break;
      case RectangleEdge.right:
        pointOne = `0, 0`;
        pointTwo = `${BEAK_HEIGHT}, ${BEAK_HEIGHT}`;
        pointThree = `0, ${BEAK_WIDTH}`;
        transform = 'translateX(100%)';
        break;
      case RectangleEdge.bottom:
        pointOne = `0, 0`;
        pointTwo = `${BEAK_WIDTH}, 0`;
        pointThree = `${BEAK_WIDTH / 2}, ${BEAK_HEIGHT}`;
        transform = 'translateY(100%)';
        break;
      case RectangleEdge.left:
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
      transform,
      color,
    });

    return (
      <div className={classNames.root} role="presentation" ref={forwardedRef}>
        <svg height={svgHeight} width={svgWidth} className={classNames.beak}>
          <polygon points={pointOne + ' ' + pointTwo + ' ' + pointThree} />
        </svg>
      </div>
    );
  },
);
Beak.displayName = 'Beak';
