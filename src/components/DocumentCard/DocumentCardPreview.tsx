import * as React from 'react';
import { IDocumentCardPreviewProps } from './DocumentCard.Props';
import './DocumentCardPreview.scss';
import Image from '../Image/Image';

export default class DocumentCardTitle extends React.Component<IDocumentCardPreviewProps, any> {
  public render() {
    let { previewImageSrc, iconSrc, accentColor } = this.props;

    let icon;
    if (iconSrc) {
      icon = <Image className='ms-DocumentCardPreview-icon' src={ iconSrc }/>;
    }

    let style;
    if (accentColor) {
      style = {
        borderBottomColor: accentColor
      };
    }

    return (
      <div className='ms-DocumentCardPreview' style={ style }>
        <Image className='ms-DocumentCardPreview-image' src={ previewImageSrc }/>
        { icon }
      </div>
    );
  }
}
