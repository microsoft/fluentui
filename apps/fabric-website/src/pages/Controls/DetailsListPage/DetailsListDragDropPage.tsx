import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { DetailsListDragDropPageProps } from './DetailsListDragDropPage.doc';

export const DetailsListDragDropPage: React.StatelessComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...DetailsListDragDropPageProps[props.platform]} />;
};
