import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { HoverCardPageProps } from './HoverCardPage.doc';

export class HoverCardPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...HoverCardPageProps[this.props.platform]} />;
  }
}
