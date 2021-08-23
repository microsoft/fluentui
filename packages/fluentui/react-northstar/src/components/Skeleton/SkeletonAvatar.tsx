import * as customPropTypes from '@fluentui/react-proptypes';
import { compose } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import { SkeletonShape } from './SkeletonShape';
import type { SizeValue } from '../../utils';
import type { SkeletonShapeProps, SkeletonShapeStylesProps } from './SkeletonShape';

export interface SkeletonAvatarOwnProps {
  /** A skeleton avatar can be sized. */
  size?: SizeValue;
}
export interface SkeletonAvatarProps extends SkeletonAvatarOwnProps, SkeletonShapeProps {}

export type SkeletonAvatarStylesProps = Required<Pick<SkeletonAvatarOwnProps, 'size'>>;
export const skeletonAvatarClassName = 'ui-skeleton__avatar';

/**
 * An SkeletonAvatar represents an avatar component that will be loaded
 */
export const SkeletonAvatar = compose<
  'span',
  SkeletonAvatarOwnProps,
  SkeletonAvatarStylesProps,
  SkeletonShapeProps,
  SkeletonShapeStylesProps
>(SkeletonShape, {
  className: skeletonAvatarClassName,
  displayName: 'SkeletonAvatar',
  overrideStyles: true,
  shorthandConfig: {},
  handledProps: ['size'],
  mapPropsToStylesProps: ({ size }) => ({
    size,
  }),
});

SkeletonAvatar.propTypes = {
  ...commonPropTypes.createCommon(),
  size: customPropTypes.size,
};

SkeletonAvatar.defaultProps = {
  as: 'span',
  size: 'medium',
};
