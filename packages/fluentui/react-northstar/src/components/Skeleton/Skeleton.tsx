import * as PropTypes from 'prop-types';
import { compose, ComponentWithAs } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import { Box, BoxProps, BoxStylesProps } from '../Box/Box';
import { SkeletonLine } from './SkeletonLine';
import { SkeletonShape } from './SkeletonShape';
import { SkeletonButton } from './SkeletonButton';
import { SkeletonText } from './SkeletonText';
import { SkeletonInput } from './SkeletonInput';
import { SkeletonAvatar } from './SkeletonAvatar';

export interface SkeletonOwnProps {
  /**
   * Define if items inside should be animated and which kind of animation.
   */
  animation?: 'pulse' | 'wave';
}
export interface SkeletonProps extends SkeletonOwnProps, BoxProps {}

export type SkeletonStylesProps = Required<Pick<SkeletonProps, 'animation'>>;
export const skeletonClassName = 'ui-skeleton';

/**
 * A Skeleton is a component to be placed while the content is loading.
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
  Input: typeof SkeletonInput;
  Avatar: typeof SkeletonAvatar;
};

Skeleton.Line = SkeletonLine;
Skeleton.Shape = SkeletonShape;
Skeleton.Button = SkeletonButton;
Skeleton.Text = SkeletonText;
Skeleton.Input = SkeletonInput;
Skeleton.Avatar = SkeletonAvatar;
Skeleton.propTypes = {
  ...commonPropTypes.createCommon({
    accessibility: false,
  }),
  animation: PropTypes.oneOf(['wave', 'pulse']),
};
