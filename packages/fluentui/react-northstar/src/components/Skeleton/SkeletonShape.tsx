import { compose } from '@fluentui/react-bindings';

import { commonPropTypes } from '../../utils';
import { Box, BoxProps, BoxStylesProps } from '../Box/Box';

export interface SkeletonShapeOwnProps {
  width?: string;
  height?: string;
}
export interface SkeletonShapeProps extends SkeletonShapeOwnProps, BoxProps {}

export type SkeletonShapeStylesProps = Required<Pick<SkeletonShapeOwnProps, 'width' | 'height'>>;
export const skeletonShapeClassName = 'ui-skeleton__shape';

/**
 * An SkeletonShape
 */
export const SkeletonShape = compose<'span', SkeletonShapeOwnProps, SkeletonShapeStylesProps, BoxProps, BoxStylesProps>(
  Box,
  {
    className: skeletonShapeClassName,
    displayName: 'SkeletonShape',
    overrideStyles: true,
    shorthandConfig: {},
    mapPropsToStylesProps: ({ width, height }) => ({ width, height }),
  },
);

SkeletonShape.propTypes = commonPropTypes.createCommon();

SkeletonShape.defaultProps = {
  as: 'span',
  width: '100px',
  height: '100px',
};
