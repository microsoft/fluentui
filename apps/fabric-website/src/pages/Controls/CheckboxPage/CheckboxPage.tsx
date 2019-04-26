import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { CheckboxPageProps } from './CheckboxPage.doc';

export class CheckboxPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...CheckboxPageProps[this.props.platform]} />;
  }
}
