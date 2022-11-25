import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { DetailsListGroupedV2PageProps } from './DetailsListGroupedV2Page.doc';

export const DetailsListGroupedV2Page: React.FunctionComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...DetailsListGroupedV2PageProps[props.platform!]} />;
};
