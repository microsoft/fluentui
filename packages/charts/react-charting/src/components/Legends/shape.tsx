import * as React from 'react';
import { DataPointShape, LegendShape } from './Legends.types';
import { CustomPoints, getShapePath, isOpenShape, pointPaths, Points } from '../../utilities/shape-utilities';
import { getSecureProps } from '../../utilities/utilities';

export interface IShapeProps {
  svgProps: React.SVGAttributes<SVGElement>;
  pathProps: React.SVGAttributes<SVGPathElement>;
  shape: DataPointShape;
  classNameForNonSvg?: string;
}

// Legacy point paths for backward compatibility
const customPointPaths: { [key: string]: string } = {
  [`${CustomPoints[CustomPoints.dottedLine]}`]: 'M0 6 H3 M5 6 H8 M10 6 H13',
};

const pointPath = { ...pointPaths, ...customPointPaths };

export const Shape: React.FC<IShapeProps> = ({ svgProps, pathProps, shape, classNameForNonSvg }) => {
  const isOpenShapeValue = isOpenShape(shape);
  shape = (isOpenShapeValue ? String(shape).replace('-open', '') : String(shape).toLowerCase()) as DataPointShape;

  if (Object.keys(pointPath).indexOf(shape) === -1) {
    return <div className={classNameForNonSvg} />;
  }

  return (
    <svg
      width={14}
      height={14}
      viewBox={'-1 -1 14 14'}
      {...getSecureProps(svgProps)}
      transform={`rotate(${shape === Points[Points.diamond] ? 45 : shape === Points[Points.pyramid] ? 180 : 0}, 0, 0)`}
    >
      {' '}
      <path
        d={getShapePath(shape)}
        {...getSecureProps(pathProps)}
        fill={isOpenShapeValue ? 'none' : pathProps.fill || 'currentColor'}
      />
    </svg>
  );
};
