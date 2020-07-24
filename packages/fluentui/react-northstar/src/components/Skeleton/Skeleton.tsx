import { compose, ComponentWithAs } from '@fluentui/react-bindings';

import { commonPropTypes } from '../../utils';
import { Box, BoxProps, BoxStylesProps } from '../Box/Box';
import { SkeletonLine } from './SkeletonLine';
import { SkeletonShape } from './SkeletonShape';

export interface SkeletonOwnProps {
  animation?: 'pulse' | 'wave';
}
export interface SkeletonProps extends SkeletonOwnProps, BoxProps {}

export type SkeletonStylesProps = Required<Pick<SkeletonProps, 'animation'>>;
export const skeletonClassName = 'ui-skeleton';

/**
 * An Skeleton
 */
export const Skeleton = compose<'div', SkeletonOwnProps, SkeletonStylesProps, BoxProps, BoxStylesProps>(Box, {
  className: skeletonClassName,
  displayName: 'Skeleton',
  overrideStyles: true,
  shorthandConfig: {},
  mapPropsToStylesProps: ({ animation }) => ({
    animation,
  }),
}) as ComponentWithAs<'div', SkeletonProps> & {
  Line: typeof SkeletonLine;
  Shape: typeof SkeletonShape;
};

Skeleton.Line = SkeletonLine;
Skeleton.Shape = SkeletonShape;

Skeleton.propTypes = commonPropTypes.createCommon();
