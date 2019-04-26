import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { SliderPageProps } from './SliderPage.doc';

export class SliderPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...SliderPageProps[this.props.platform]} />;
  }
}
