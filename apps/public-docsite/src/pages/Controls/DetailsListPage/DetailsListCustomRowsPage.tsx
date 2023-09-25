import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { DetailsListCustomRowsPageProps } from './DetailsListCustomRowsPage.doc';

export const DetailsListCustomRowsPage: React.FunctionComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...DetailsListCustomRowsPageProps[props.platform!]} />;
};
