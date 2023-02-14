import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { DetailsListAdvancedPageProps } from './DetailsListAdvancedPage.doc';

export const DetailsListAdvancedPage: React.FunctionComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...DetailsListAdvancedPageProps[props.platform!]} />;
};
