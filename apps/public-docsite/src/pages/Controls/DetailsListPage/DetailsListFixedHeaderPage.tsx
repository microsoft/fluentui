import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { DetailsListFixedHeaderPageProps } from './DetailsListFixedHeaderPage.doc';

export const DetailsListFixedHeaderPage: React.FunctionComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...DetailsListFixedHeaderPageProps[props.platform!]} />;
};
