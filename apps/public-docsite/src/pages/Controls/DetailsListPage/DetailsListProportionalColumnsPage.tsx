import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { DetailsListProportionalColumnsPageProps } from './DetailsListProportionalColumnsPage.doc';

export const DetailsListProportionalColumnsPage: React.FunctionComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...DetailsListProportionalColumnsPageProps[props.platform!]} />;
};
