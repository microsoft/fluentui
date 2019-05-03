import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { OverflowSetPageProps } from './OverflowSetPage.doc';

export const OverflowSetPage: React.StatelessComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...OverflowSetPageProps[props.platform]} />;
};
