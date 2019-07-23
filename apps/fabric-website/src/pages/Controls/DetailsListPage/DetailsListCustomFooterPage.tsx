import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { DetailsListCustomFooterPageProps } from './DetailsListCustomFooterPage.doc';

export const DetailsListCustomFooterPage: React.StatelessComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...DetailsListCustomFooterPageProps[props.platform]} />;
};
