import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { DetailsListKeyboardDragDropPageProps } from './DetailsListKeyboardDragDropPage.doc';

export const DetailsListKeyboardDragDropPage: React.FunctionComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...DetailsListKeyboardDragDropPageProps[props.platform!]} />;
};
