import * as React from 'react';

import {
  IBreadcrumbProps,
  IBreadcrumbStyles,
  IBreadcrumbStyleProps
} from './Breadcrumb.props';
import { BreadcrumbBase } from './Breadcrumb.base';
import { styled } from '../../Styling';
import { ICrumbProps, ICrumbStyleProps, ICrumbStyles } from './Crumb.props';
import { getStyles } from './Breadcrumb.styles';
import { getStyles as getCrumbStyles } from './Crumb.styles';

// Create a Breadcrumb variant which uses these default styles and this styled subcomponent.
export const Breadcrumb = styled(
  BreadcrumbBase,
  getStyles,
  {
    'Crumb': { getStyles: getCrumbStyles }
  }
);
