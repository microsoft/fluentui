import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { DetailsListPageProps } from './DetailsListPage.doc';

export const DetailsListPage: React.FunctionComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...DetailsListPageProps[props.platform!]} />;
};
