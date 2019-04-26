import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { CoachmarkPageProps } from './CoachmarkPage.doc';

export class CoachmarkPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...CoachmarkPageProps[this.props.platform]} />;
  }
}
