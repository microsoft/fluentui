import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { SpinButtonPageProps } from './SpinButtonPage.doc';

export const SpinButtonPage: React.FunctionComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...SpinButtonPageProps[props.platform!]} />;
};
