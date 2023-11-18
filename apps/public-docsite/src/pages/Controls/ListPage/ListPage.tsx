import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { ListPageProps } from './ListPage.doc';

export const ListPage: React.FunctionComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...ListPageProps[props.platform!]} />;
};
