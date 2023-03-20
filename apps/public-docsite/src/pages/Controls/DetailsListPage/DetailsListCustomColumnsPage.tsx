import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { DetailsListCustomColumnsPageProps } from './DetailsListCustomColumnsPage.doc';

export const DetailsListCustomColumnsPage: React.FunctionComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...DetailsListCustomColumnsPageProps[props.platform!]} />;
};
