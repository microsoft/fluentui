import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { LayerPageProps } from './LayerPage.doc';

export const LayerPage: React.FunctionComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...LayerPageProps[props.platform!]} />;
};
