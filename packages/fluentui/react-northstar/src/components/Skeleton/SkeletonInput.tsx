import * as PropTypes from 'prop-types';
import { compose } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import { SkeletonShapeProps, SkeletonShapeStylesProps, SkeletonShape } from './SkeletonShape';

export interface SkeletonInputOwnProps {
  /** A skeleton input can fill the width of its container. */
  fluid?: boolean;
}
export interface SkeletonInputProps extends SkeletonInputOwnProps, SkeletonShapeProps {}

export type SkeletonInputStylesProps = Required<Pick<SkeletonInputOwnProps, 'fluid'>>;
export const skeletonInputClassName = 'ui-skeleton__input';

/**
 * An SkeletonInput represents a input component that will be loaded
 */
export const SkeletonInput = compose<
  'span',
  SkeletonInputOwnProps,
  SkeletonInputStylesProps,
  SkeletonShapeProps,
  SkeletonShapeStylesProps
>(SkeletonShape, {
  className: skeletonInputClassName,
  displayName: 'SkeletonInput',
  overrideStyles: true,
  shorthandConfig: {},
  handledProps: ['fluid'],
  mapPropsToStylesProps: ({ fluid }) => ({
    fluid,
  }),
});

SkeletonInput.propTypes = {
  ...commonPropTypes.createCommon(),
  fluid: PropTypes.bool,
};

SkeletonInput.defaultProps = {
  as: 'span',
};
