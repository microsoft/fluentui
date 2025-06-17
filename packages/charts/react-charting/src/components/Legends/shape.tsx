import * as React from 'react';
import { LegendShape } from './Legends.types';
import { CustomPoints, getSecureProps, getShapePath, isOpenShape, scatterPointPaths } from '../../utilities/utilities';

export interface IShapeProps {
  svgProps: React.SVGAttributes<SVGElement>;
  pathProps: React.SVGAttributes<SVGPathElement>;
  shape: LegendShape;
  classNameForNonSvg?: string;
  isOpenShape?: boolean;
}

// Legacy point paths for backward compatibility
const legacyPointPaths: { [key: string]: string } = {
  [`${CustomPoints[CustomPoints.dottedLine]}`]: 'M0 6 H3 M5 6 H8 M10 6 H13',
};

const pointPath = { ...scatterPointPaths, ...legacyPointPaths };

const getViewBoxForShape = (shapeName: string): string => {
  if (shapeName === 'dottedLine' || shapeName === 'pyramid') {
    return '-1 -1 14 14';
  }
  // For plotly-based shapes, use centered viewBox
  return '-7 -7 14 14';
};

export const Shape: React.FC<IShapeProps> = ({ svgProps, pathProps, shape, classNameForNonSvg }) => {
  if (Object.keys(pointPath).indexOf(shape) === -1) {
    return <div className={classNameForNonSvg} />;
  }

  return (
    <svg width={14} height={14} viewBox={getViewBoxForShape(shape)} {...getSecureProps(svgProps)}>
      <path
        d={getShapePath(shape)}
        {...getSecureProps(pathProps)}
        fill={isOpenShape(shape) ? 'none' : pathProps.fill || 'currentColor'}
      />
    </svg>
  );
};
