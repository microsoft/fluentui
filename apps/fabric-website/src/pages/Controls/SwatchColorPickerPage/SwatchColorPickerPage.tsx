import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { SwatchColorPickerPageProps } from './SwatchColorPickerPage.doc';

export class SwatchColorPickerPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...SwatchColorPickerPageProps[this.props.platform]} />;
  }
}
