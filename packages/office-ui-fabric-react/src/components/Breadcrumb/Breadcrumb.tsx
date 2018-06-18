import * as React from 'react';
import { styled } from '../../Utilities';
import { BreadcrumbBase } from './Breadcrumb.base';
import { getStyles, IBreadcrumbStyleProps, IBreadcrumbStyles } from './Breadcrumb.styles';
import { IBreadcrumbProps } from './Breadcrumb.types';

export const Breadcrumb: React.StatelessComponent<IBreadcrumbProps> = styled<
  IBreadcrumbProps,
  IBreadcrumbStyleProps,
  IBreadcrumbStyles
>(BreadcrumbBase, getStyles);
