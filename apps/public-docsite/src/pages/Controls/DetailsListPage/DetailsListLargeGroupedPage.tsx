import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { DetailsListLargeGroupedPageProps } from './DetailsListLargeGroupedPage.doc';

export const DetailsListLargeGroupedPage: React.FunctionComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...DetailsListLargeGroupedPageProps[props.platform!]} />;
};
