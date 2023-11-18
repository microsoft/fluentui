import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { BreadcrumbPageProps } from './BreadcrumbPage.doc';

export const BreadcrumbPage: React.FunctionComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...BreadcrumbPageProps[props.platform!]} />;
};
