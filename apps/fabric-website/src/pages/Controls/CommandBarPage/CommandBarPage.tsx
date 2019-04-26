import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { CommandBarPageProps } from './CommandBarPage.doc';

export class CommandBarPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...CommandBarPageProps[this.props.platform]} />;
  }
}
