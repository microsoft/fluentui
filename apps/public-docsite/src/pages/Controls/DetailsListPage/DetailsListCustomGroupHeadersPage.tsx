import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { DetailsListCustomGroupHeadersPageProps } from './DetailsListCustomGroupHeadersPage.doc';

export const DetailsListCustomGroupHeadersPage: React.FunctionComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...DetailsListCustomGroupHeadersPageProps[props.platform!]} />;
};
