import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { FocusTrapZonePageProps } from './FocusTrapZonePage.doc';

export class FocusTrapZonePage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...FocusTrapZonePageProps[this.props.platform]} />;
  }
}
