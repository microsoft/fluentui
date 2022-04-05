import * as customPropTypes from '@fluentui/react-proptypes';
import * as PropTypes from 'prop-types';
import { compose } from '@fluentui/react-bindings';
import { commonPropTypes, SizeValue } from '../../utils';
import { SkeletonShapeProps, SkeletonShapeStylesProps, SkeletonShape } from './SkeletonShape';

export interface SkeletonButtonOwnProps {
  /** A skeleton button can be sized. */
  size?: SizeValue;

  /** A skeleton button can fill the width of its container. */
  fluid?: boolean;

  /** A skeleton button can appear circular. */
  circular?: boolean;

  /** A skeleton button can contain only an icon. */
  iconOnly?: boolean;
}
export interface SkeletonButtonProps extends SkeletonButtonOwnProps, SkeletonShapeProps {}

export type SkeletonButtonStylesProps = Required<
  Pick<SkeletonButtonOwnProps, 'size' | 'fluid' | 'circular' | 'iconOnly'>
>;
export const skeletonButtonClassName = 'ui-skeleton__button';

/**
 * An SkeletonButton represents a buton component that will be loaded
 */
export const SkeletonButton = compose<
  'span',
  SkeletonButtonOwnProps,
  SkeletonButtonStylesProps,
  SkeletonShapeProps,
  SkeletonShapeStylesProps
>(SkeletonShape, {
  className: skeletonButtonClassName,
  displayName: 'SkeletonButton',
  overrideStyles: true,
  shorthandConfig: {},
  handledProps: ['size', 'circular', 'iconOnly', 'fluid'],
  mapPropsToStylesProps: ({ size, fluid, iconOnly, circular }) => ({
    size,
    fluid,
    iconOnly,
    circular,
  }),
});

SkeletonButton.propTypes = {
  ...commonPropTypes.createCommon(),
  size: customPropTypes.size,
  circular: PropTypes.bool,
  iconOnly: PropTypes.bool,
  fluid: PropTypes.bool,
};

SkeletonButton.defaultProps = {
  as: 'span',
  size: 'medium',
};
