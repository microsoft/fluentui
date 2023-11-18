import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { DetailsListGroupedPageProps } from './DetailsListGroupedPage.doc';

export const DetailsListGroupedPage: React.FunctionComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...DetailsListGroupedPageProps[props.platform!]} />;
};
