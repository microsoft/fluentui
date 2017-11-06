import * as React from 'react';

import {
  IBreadcrumbProps,
  IBreadcrumbStyles,
  IBreadcrumbStyleProps
} from './Breadcrumb.props';
import { BreadcrumbBase } from './Breadcrumb.base';
import { styled } from '../../Styling';
import { ICrumbStyleProps, ICrumbStyles } from './Crumb.props';
import { getStyles } from './Breadcrumb.styles';
import { getStyles as getCrumbStyles } from './Crumb.styles';

// Create a Breadcrumb variant which uses these default styles.
export const Breadcrumb = styled(
  BreadcrumbBase,
  {
    getStyles,
    getCrumbStyles
  }
);
