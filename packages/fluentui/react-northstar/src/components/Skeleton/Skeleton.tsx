import { compose, ComponentWithAs } from '@fluentui/react-bindings';
import { Accessibility, SkeletonBehaviorProps, skeletonBehavior } from '@fluentui/accessibility';
import { commonPropTypes } from '../../utils';
import { Box, BoxProps, BoxStylesProps } from '../Box/Box';
import { SkeletonLine } from './SkeletonLine';
import { SkeletonShape } from './SkeletonShape';
import { SkeletonButton } from './SkeletonButton';
import * as PropTypes from 'prop-types';
import { SkeletonText } from './SkeletonText';

export interface SkeletonOwnProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<SkeletonBehaviorProps>;

  /**
   * Define if items inside should be animated and which kind of animation.
   */
  animation?: 'pulse' | 'wave';
}
export interface SkeletonProps extends SkeletonOwnProps, Omit<BoxProps, 'accessibility'> {}

export type SkeletonStylesProps = Required<Pick<SkeletonProps, 'animation'>>;
export const skeletonClassName = 'ui-skeleton';

/**
 * A Skeleton is a component to be placed while the content is loading.
 * This component is currently UNSTABLE!
 */
export const Skeleton = compose<'div', SkeletonOwnProps, SkeletonStylesProps, BoxProps, BoxStylesProps>(Box, {
  className: skeletonClassName,
  displayName: 'Skeleton',
  overrideStyles: true,
  shorthandConfig: {},
  handledProps: ['animation'],
  mapPropsToStylesProps: ({ animation }) => ({
    animation,
  }),
}) as ComponentWithAs<'div', SkeletonProps> & {
  Line: typeof SkeletonLine;
  Shape: typeof SkeletonShape;
  Button: typeof SkeletonButton;
  Text: typeof SkeletonText;
};

Skeleton.Line = SkeletonLine;
Skeleton.Shape = SkeletonShape;
Skeleton.Button = SkeletonButton;
Skeleton.Text = SkeletonText;
Skeleton.defaultProps = {
  accessibility: skeletonBehavior,
};
Skeleton.propTypes = {
  ...commonPropTypes.createCommon(),
  animation: PropTypes.oneOf(['wave', 'pulse']),
};
