import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { ActivityItemPageProps } from './ActivityItemPage.doc';

export class ActivityItemPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...ActivityItemPageProps[this.props.platform]} />;
  }
}
