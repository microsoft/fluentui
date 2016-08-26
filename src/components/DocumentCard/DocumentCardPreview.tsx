import * as React from 'react';
import { IDocumentCardPreviewProps } from './DocumentCard.Props';
import { Image } from '../../Image';
import { Async } from '../../utilities/Async/Async';
import './DocumentCardPreview.scss';

export class DocumentCardPreview extends React.Component<IDocumentCardPreviewProps, any> {

  public render() {
    let { previewImages } = this.props;
    let previewImage = previewImages[0];
    let { accentColor, width, height, imageFit } = previewImage;

    let style;
    if (accentColor) {
      style = {
        borderBottomColor: accentColor
      };
    }

    let icon;
    if (previewImage.iconSrc) {
      icon = <Image className='ms-DocumentCardPreview-icon' src={ previewImage.iconSrc } role='presentation' alt=''/>;
    }

    let multiple;
    if (previewImages.length > 1) {
      multiple = <p>I have multiple documents</p>;
    }

    return (
      <div className='ms-DocumentCardPreview' style={ style }>
        <Image
          width={ width }
          height={ height }
          imageFit={ imageFit }
          src={ previewImage.previewImageSrc }
          errorSrc={ previewImage.errorImageSrc }
          role='presentation' alt=''/>
        { icon }
        { multiple }
      </div>
    );
  }
}
