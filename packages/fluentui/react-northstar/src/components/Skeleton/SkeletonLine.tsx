import { compose } from '@fluentui/react-bindings';
import * as PropTypes from 'prop-types';
import { commonPropTypes } from '../../utils';
import { Box, BoxProps, BoxStylesProps } from '../Box/Box';

export interface SkeletonLineOwnProps {
  width?: string;
  height?: string;
}
export interface SkeletonLineProps extends SkeletonLineOwnProps, BoxProps {}

export type SkeletonLineStylesProps = Required<Pick<SkeletonLineOwnProps, 'width' | 'height'>>;
export const skeletonLineClassName = 'ui-skeleton__line';

/**
 * A SkeletonLine represents a text line that will be loaded
 */
export const SkeletonLine = compose<'span', SkeletonLineOwnProps, SkeletonLineStylesProps, BoxProps, BoxStylesProps>(
  Box,
  {
    className: skeletonLineClassName,
    displayName: 'SkeletonLine',
    overrideStyles: true,
    shorthandConfig: {},
    handledProps: ['width', 'height'],
    mapPropsToStylesProps: ({ width, height }) => ({ width, height }),
  },
);

SkeletonLine.propTypes = {
  ...commonPropTypes.createCommon(),
  width: PropTypes.string,
  height: PropTypes.string,
};

SkeletonLine.defaultProps = {
  as: 'span',
  width: '100%',
  height: '1rem',
};
