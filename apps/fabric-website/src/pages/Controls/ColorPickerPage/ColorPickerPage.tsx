import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { ColorPickerPageProps } from './ColorPickerPage.doc';

export class ColorPickerPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...ColorPickerPageProps[this.props.platform]} />;
  }
}
