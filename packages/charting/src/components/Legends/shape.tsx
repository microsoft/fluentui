import * as React from 'react';
import { LegendShape } from './Legends.types';
import { Points } from '../../utilities/utilities';

export interface IShapeProps {
  svgProps: React.SVGAttributes<SVGElement>;
  pathProps: React.SVGAttributes<SVGPathElement>;
  shape: LegendShape;
  classNameForNonSvg?: string;
}

type PointPathType = {
  [key: string]: string;
};

/* eslint-disable @fluentui/max-len */
const pointPath: PointPathType = {
  [`${Points[Points.circle]}`]: 'M1 6 A5 5 0 1 0  12 6 M1 6 A5 5 0 0 1  12 6',
  [`${Points[Points.square]}`]: 'M1 1 L12 1 L12 12  L1 12 L1 1 Z',
  [`${
    Points[Points.triangle]
  }`]: 'M5.14251 1.42916C5.53091 0.781817 6.46909 0.781816 6.85749 1.42915L11.0913 8.4855C11.4912 9.15203 11.0111 10 10.2338 10L1.76619 10C0.988895 10 0.508782 9.15203 0.908697 8.4855L5.14251 1.42916Z',
  [`${
    Points[Points.pyramid]
  }`]: 'M5.14251 1.42916C5.53091 0.781817 6.46909 0.781816 6.85749 1.42915L11.0913 8.4855C11.4912 9.15203 11.0111 10 10.2338 10L1.76619 10C0.988895 10 0.508782 9.15203 0.908697 8.4855L5.14251 1.42916Z',
  [`${Points[Points.diamond]}`]: 'M2 2 L10 2 L10 10  L2 10 L2 2 Z',
  [`${
    Points[Points.hexagon]
  }`]: 'M9.2913 0.485505C9.11058 0.184299 8.78507 0 8.43381 0H3.56619C3.21493 0 2.88942 0.184299 2.7087 0.485504L0.308698 4.4855C0.118688 4.80219 0.118688 5.19781 0.308697 5.5145L2.7087 9.5145C2.88942 9.8157 3.21493 10 3.56619 10H8.43381C8.78507 10 9.11058 9.8157 9.2913 9.5145L11.6913 5.5145C11.8813 5.19781 11.8813 4.80219 11.6913 4.4855L9.2913 0.485505Z',
  [`${
    Points[Points.pentagon]
  }`]: 'M6.63334 0.406236C6.28965 0.162459 5.83003 0.160276 5.48404 0.400776L0.618076 3.78314C0.252075 4.03755 0.0986437 4.50348 0.241869 4.92558L2.07274 10.3213C2.21042 10.7271 2.59126 11 3.01971 11H8.98029C9.40874 11 9.78959 10.7271 9.92726 10.3213L11.7605 4.91855C11.9026 4.49979 11.7528 4.03742 11.3921 3.78157L6.63334 0.406236Z',
  [`${
    Points[Points.octagon]
  }`]: 'M8.08456 0.292894C7.89702 0.105357 7.64267 0 7.37745 0H3.62255C3.35733 0 3.10298 0.105357 2.91544 0.292893L0.292894 2.91544C0.105357 3.10298 0 3.35733 0 3.62255V7.37745C0 7.64267 0.105357 7.89702 0.292893 8.08456L2.91544 10.7071C3.10298 10.8946 3.35733 11 3.62255 11H7.37745C7.64267 11 7.89702 10.8946 8.08456 10.7071L10.7071 8.08456C10.8946 7.89702 11 7.64267 11 7.37745V3.62255C11 3.35733 10.8946 3.10298 10.7071 2.91544L8.08456 0.292894Z',
};

export const Shape: React.FC<IShapeProps> = ({ svgProps, pathProps, shape, classNameForNonSvg }) => {
  if (Object.keys(Points).indexOf(shape) === -1) {
    return <div className={classNameForNonSvg}></div>;
  }
  return (
    <svg
      width={14}
      height={14}
      viewBox={'-1 -1 14 14'}
      {...svgProps}
      transform={`rotate(${shape === Points[Points.diamond] ? 45 : shape === Points[Points.triangle] ? 180 : 0}, 0, 0)`}
    >
      <path d={pointPath[shape]} {...pathProps}></path>
    </svg>
  );
};
