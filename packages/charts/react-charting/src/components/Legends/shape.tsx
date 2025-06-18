import * as React from 'react';
import { DataPointShape } from './Legends.types';
import { CustomPoints, getShapePath, isOpenShape, pointPaths } from '../../utilities/shape-utilities';
import { getSecureProps } from '../../utilities/utilities';

export interface IShapeProps {
  svgProps: React.SVGAttributes<SVGElement>;
  pathProps: React.SVGAttributes<SVGPathElement>;
  shape: DataPointShape;
  classNameForNonSvg?: string;
  isOpenShape?: boolean;
}

// Legacy point paths for backward compatibility
const customPointPaths: { [key: string]: string } = {
  [`${CustomPoints[CustomPoints.dottedLine]}`]: 'M0 6 H3 M5 6 H8 M10 6 H13',
};

const pointPath = { ...pointPaths, ...customPointPaths };

const getViewBoxForShape = (shapeName: string): string => {
  if (shapeName === 'dottedLine' || shapeName === 'pyramid') {
    return '-1 -1 14 14';
  }
  // For plotly-based shapes, use centered viewBox
  return '-7 -7 14 14';
};

export const Shape: React.FC<IShapeProps> = ({ svgProps, pathProps, shape, classNameForNonSvg }) => {
  if (Object.keys(pointPath).indexOf(String(shape)) === -1) {
    return <div className={classNameForNonSvg} />;
  }

  return (
    <svg width={14} height={14} viewBox={getViewBoxForShape(String(shape))} {...getSecureProps(svgProps)}>
      <path
        d={getShapePath(shape)}
        {...getSecureProps(pathProps)}
        fill={isOpenShape(shape) ? 'none' : pathProps.fill || 'currentColor'}
      />
    </svg>
  );
};
