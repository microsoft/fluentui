import * as customPropTypes from '@fluentui/react-proptypes';
import * as PropTypes from 'prop-types';
import { compose } from '@fluentui/react-bindings';
import { commonPropTypes, SizeValue } from '../../utils';
import { SkeletonShapeProps, SkeletonShapeStylesProps, SkeletonShape } from './SkeletonShape';

export interface SkeletonButtonOwnProps {
  /** A button can be sized. */
  size?: SizeValue;
  /** A button can have an icon. */
  icon?: boolean;
  /** A button can fill the width of its container. */
  fluid?: boolean;
  /** A button can appear circular. */
  circular?: boolean;
  /** A button can contain only an icon. */
  iconOnly?: boolean;
}
export interface SkeletonButtonProps extends SkeletonButtonOwnProps, SkeletonShapeProps {}

export type SkeletonButtonStylesProps = Required<
  Pick<SkeletonButtonOwnProps, 'size' | 'icon' | 'fluid' | 'circular' | 'iconOnly'>
>;
export const skeletonButtonClassName = 'ui-skeleton__button';

/**
 * An SkeletonButton represents a shape (Image/Button/etc...) that will be loaded
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
  handledProps: ['size', 'circular'],
  mapPropsToStylesProps: ({ size, icon, fluid, iconOnly, circular }) => ({
    size,
    icon,
    fluid,
    iconOnly,
    circular,
  }),
});

SkeletonButton.propTypes = {
  ...commonPropTypes.createCommon(),
  size: customPropTypes.size,
  circular: PropTypes.bool,
};

SkeletonButton.defaultProps = {
  as: 'span',
  size: 'medium',
};
