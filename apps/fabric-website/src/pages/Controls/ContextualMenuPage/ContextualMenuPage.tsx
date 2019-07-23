import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { ContextualMenuPageProps } from './ContextualMenuPage.doc';

export const ContextualMenuPage: React.StatelessComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...ContextualMenuPageProps[props.platform]} />;
};
