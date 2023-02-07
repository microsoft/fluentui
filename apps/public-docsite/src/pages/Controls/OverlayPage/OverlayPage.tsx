import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { OverlayPageProps } from './OverlayPage.doc';

export const OverlayPage: React.FunctionComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...OverlayPageProps[props.platform!]} />;
};
