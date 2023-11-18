import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { GroupedListPageProps } from './GroupedListPage.doc';

export const GroupedListPage: React.FunctionComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...GroupedListPageProps[props.platform!]} />;
};
