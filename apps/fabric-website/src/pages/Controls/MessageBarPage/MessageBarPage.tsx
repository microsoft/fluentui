import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { MessageBarPageProps } from './MessageBarPage.doc';

export class MessageBarPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...MessageBarPageProps[this.props.platform]} />;
  }
}
