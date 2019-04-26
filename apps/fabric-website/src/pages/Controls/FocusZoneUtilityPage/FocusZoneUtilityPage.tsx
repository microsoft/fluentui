import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { FocusZoneUtilityPageProps } from './FocusZoneUtilityPage.doc';

export class FocusZoneUtilityPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...FocusZoneUtilityPageProps[this.props.platform]} />;
  }
}
