import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { SearchBoxPageProps } from './SearchBoxPage.doc';

export const SearchBoxPage: React.StatelessComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...SearchBoxPageProps[props.platform]} />;
};
