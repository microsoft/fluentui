import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { ChoiceGroupPageProps } from './ChoiceGroupPage.doc';

export const ChoiceGroupPage: React.FunctionComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...ChoiceGroupPageProps[props.platform!]} />;
};
