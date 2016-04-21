import * as React from 'react';
import { IDocumentCardPreviewProps } from './DocumentCard.Props';
import './DocumentCardPreview.scss';

export default class DocumentCardTitle extends React.Component<IDocumentCardPreviewProps, any> {
  public render() {
    let { previewImagePath, iconPath, accentColor } = this.props;

    let icon;
    if (iconPath) {
      icon = <img className='ms-DocumentCard-preview-icon' src={ iconPath }/>;
    }

    let style;
    if (accentColor) {
      style = {
        borderBottomColor: accentColor
      };
    }

    return (
      <div className='ms-DocumentCard-preview' style={ style }>
        <img className='ms-DocumentCard-preview-image' src={ previewImagePath }/>
        { icon }
      </div>
    );
  }
}
