import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { CalendarPageProps } from './CalendarPage.doc';

export class CalendarPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...CalendarPageProps[this.props.platform]} />;
  }
}
