import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { FacepilePageProps } from './FacepilePage.doc';

export class FacepilePage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...FacepilePageProps[this.props.platform]} />;
  }
}
