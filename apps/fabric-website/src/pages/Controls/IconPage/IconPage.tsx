import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { IconPageProps } from './IconPage.doc';

export class IconPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...IconPageProps[this.props.platform]} />;
  }
}
