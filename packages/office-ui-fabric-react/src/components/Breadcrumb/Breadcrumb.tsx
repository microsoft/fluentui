import { styled } from '../../Utilities';
import { BreadcrumbBase } from './Breadcrumb.base';
import { getStyles } from './Breadcrumb.styles';
import { IBreadcrumbProps } from './Breadcrumb.types';

export const Breadcrumb: (props: IBreadcrumbProps) => JSX.Element = styled(
  BreadcrumbBase,
  getStyles
);
