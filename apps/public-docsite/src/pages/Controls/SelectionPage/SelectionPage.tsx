import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { SelectionPageProps } from './SelectionPage.doc';

export const SelectionPage: React.FunctionComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...SelectionPageProps[props.platform!]} />;
};
