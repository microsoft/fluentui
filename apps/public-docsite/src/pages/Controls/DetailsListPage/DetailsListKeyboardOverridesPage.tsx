import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { DetailsListKeyboardOverridesProps } from './DetailsListKeyboardOverrides.doc';

export const DetailsListKeyboardOverridesPage: React.FunctionComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...DetailsListKeyboardOverridesProps[props.platform!]} />;
};
