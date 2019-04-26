import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { ImagePageProps } from './ImagePage.doc';

export class ImagePage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...ImagePageProps[this.props.platform]} />;
  }
}
