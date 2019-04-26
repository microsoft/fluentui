import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { TooltipPageProps } from './TooltipPage.doc';

export class TooltipPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...TooltipPageProps[this.props.platform]} />;
  }
}
