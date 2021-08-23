import * as customPropTypes from '@fluentui/react-proptypes';
import { compose } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import { SkeletonLine } from './SkeletonLine';
import type { SizeValue } from '../../utils';
import type { SkeletonLineProps, SkeletonLineStylesProps } from './SkeletonLine';

export interface SkeletonTextOwnProps {
  /** A skeleton text can be sized. */
  size?: SizeValue;
}
export interface SkeletonTextProps extends SkeletonTextOwnProps, SkeletonLineProps {}

export type SkeletonTextStylesProps = Required<Pick<SkeletonTextOwnProps, 'size'>>;
export const skeletonTextClassName = 'ui-skeleton__text';

/**
 * An SkeletonText represents a text component that will be loaded
 */
export const SkeletonText = compose<
  'span',
  SkeletonTextOwnProps,
  SkeletonTextStylesProps,
  SkeletonLineProps,
  SkeletonLineStylesProps
>(SkeletonLine, {
  className: skeletonTextClassName,
  displayName: 'SkeletonText',
  overrideStyles: true,
  shorthandConfig: {},
  handledProps: ['size'],
  mapPropsToStylesProps: ({ size }) => ({
    size,
  }),
});

SkeletonText.propTypes = {
  ...commonPropTypes.createCommon(),
  size: customPropTypes.size,
};

SkeletonText.defaultProps = {
  as: 'span',
  size: 'medium',
};
