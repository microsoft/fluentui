import * as React from 'react';
import { LegendShape } from './Legends.types';
import { CustomPoints, Points } from '../../utilities/utilities';

export interface IShapeProps {
  svgProps: React.SVGAttributes<SVGElement>;
  pathProps: React.SVGAttributes<SVGPathElement>;
  shape: LegendShape;
  classNameForNonSvg?: string;
}

type PointPathType = {
  [key: string]: string;
};

const pointPath: PointPathType = {
  [`${Points[Points.circle]}`]: 'M1 6 A5 5 0 1 0  12 6 M1 6 A5 5 0 0 1  12 6',
  [`${Points[Points.square]}`]: 'M1 1 L12 1 L12 12  L1 12 L1 1 Z',
  [`${Points[Points.triangle]}`]: 'M6 10L8.74228e-07 -1.04907e-06L12 0L6 10Z',
  [`${Points[Points.pyramid]}`]: 'M6 10L8.74228e-07 -1.04907e-06L12 0L6 10Z',
  [`${Points[Points.diamond]}`]: 'M2 2 L10 2 L10 10  L2 10 L2 2 Z',
  [`${Points[Points.hexagon]}`]: 'M9 0H3L0 5L3 10H9L12 5L9 0Z',
  [`${Points[Points.pentagon]}`]: 'M6.06061 0L0 4.21277L2.30303 11H9.69697L12 4.21277L6.06061 0Z',
  [`${Points[Points.octagon]}`]:
    'M7.08333 0H2.91667L0 2.91667V7.08333L2.91667 10H7.08333L10 7.08333V2.91667L7.08333 0Z',
  [`${CustomPoints[CustomPoints.dottedLine]}`]: 'M0 6 H3 M5 6 H8 M10 6 H13',
};

export const Shape: React.FC<IShapeProps> = ({ svgProps, pathProps, shape, classNameForNonSvg }) => {
  if (Object.keys(pointPath).indexOf(shape) === -1) {
    return <div className={classNameForNonSvg} />;
  }
  return (
    <svg
      width={14}
      height={14}
      viewBox={'-1 -1 14 14'}
      {...svgProps}
      transform={`rotate(${shape === Points[Points.diamond] ? 45 : shape === Points[Points.pyramid] ? 180 : 0}, 0, 0)`}
    >
      <path d={pointPath[shape]} {...pathProps} />
    </svg>
  );
};
