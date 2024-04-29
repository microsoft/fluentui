import * as PropTypes from 'prop-types';
import { compose } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import { Box, BoxProps, BoxStylesProps } from '../Box/Box';

export interface SkeletonShapeOwnProps {
  width?: string;
  height?: string;
  round?: boolean;
}
export interface SkeletonShapeProps extends SkeletonShapeOwnProps, BoxProps {}

export type SkeletonShapeStylesProps = Required<Pick<SkeletonShapeOwnProps, 'width' | 'height' | 'round'>>;
export const skeletonShapeClassName = 'ui-skeleton__shape';

/**
 * A SkeletonShape represents a shape (Image/Button/etc...) that will be loaded
 */
export const SkeletonShape = compose<'span', SkeletonShapeOwnProps, SkeletonShapeStylesProps, BoxProps, BoxStylesProps>(
  Box,
  {
    className: skeletonShapeClassName,
    displayName: 'SkeletonShape',
    overrideStyles: true,
    shorthandConfig: {},
    handledProps: ['round', 'width', 'height'],
    mapPropsToStylesProps: ({ width, height, round }) => ({ width, height, round }),
  },
);

SkeletonShape.propTypes = {
  ...commonPropTypes.createCommon(),
  width: PropTypes.string,
  height: PropTypes.string,
  round: PropTypes.bool,
};

SkeletonShape.defaultProps = {
  as: 'span',
  width: '100px',
  height: '100px',
  round: false,
};
