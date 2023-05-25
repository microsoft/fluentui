import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { DetailsListCompactPageProps } from './DetailsListCompactPage.doc';

export const DetailsListCompactPage: React.FunctionComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...DetailsListCompactPageProps[props.platform!]} />;
};
