import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { FocusZonePageProps } from './FocusZonePage.doc';

export class FocusZonePage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...FocusZonePageProps[this.props.platform]} />;
  }
}
