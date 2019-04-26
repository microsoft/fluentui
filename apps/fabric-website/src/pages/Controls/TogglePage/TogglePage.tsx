import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { TogglePageProps } from './TogglePage.doc';

export class TogglePage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...TogglePageProps[this.props.platform]} />;
  }
}
