import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { FocusTrapZoneUtilityPageProps } from './FocusTrapZoneUtilityPage.doc';

export class FocusTrapZoneUtilityPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...FocusTrapZoneUtilityPageProps[this.props.platform]} />;
  }
}
