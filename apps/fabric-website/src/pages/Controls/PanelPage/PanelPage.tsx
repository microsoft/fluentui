import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { PanelPageProps } from './PanelPage.doc';

export class PanelPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...PanelPageProps[this.props.platform]} />;
  }
}
