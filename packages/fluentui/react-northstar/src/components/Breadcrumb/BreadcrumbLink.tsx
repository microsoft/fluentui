import { compose } from '@fluentui/react-bindings';
import { Box, BoxProps, BoxStylesProps } from '../Box/Box';

export interface BreadcrumbLinkOwnProps {}
export interface BreadcrumbLinkProps extends BreadcrumbLinkOwnProps, BoxProps {}

export type BreadcrumbLinkStylesProps = never;
export const breadcrumbLinkClassName = 'ui-breadcrumb__link';

/**
 * An BreadcrumbLink represents a anchor to be used inside the Breadcrumb
 */
export const BreadcrumbLink = compose<'a', BreadcrumbLinkOwnProps, BreadcrumbLinkStylesProps, BoxProps, BoxStylesProps>(
  Box,
  {
    className: breadcrumbLinkClassName,
    displayName: 'BreadcrumbLink',
    overrideStyles: true,
    shorthandConfig: {},
  },
);

BreadcrumbLink.defaultProps = {
  as: 'a',
};
