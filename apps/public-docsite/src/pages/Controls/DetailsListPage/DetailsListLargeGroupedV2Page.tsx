import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { DetailsListLargeGroupedV2PageProps } from './DetailsListLargeGroupedV2Page.doc';

export const DetailsListLargeGroupedV2Page: React.FunctionComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...DetailsListLargeGroupedV2PageProps[props.platform!]} />;
};
