import * as React from 'react';
import { IDocumentCardPreviewProps, IDocumentCardPreviewImage } from './DocumentCard.Props';
import { Image } from '../../Image';
import { Async } from '../../utilities/Async/Async';
import './DocumentCardPreview.scss';

export class DocumentCardPreview extends React.Component<IDocumentCardPreviewProps, any> {

  public render() {
    let { previewImages } = this.props;
    let style, preview;

    if (previewImages.length > 1) {
      // Render a list of files
      preview = this._renderPreviewList();
    } else {
      // Render a single preview
      preview = this._renderPreviewImage(previewImages[0]);

      // Override the border color if an accent color was provided
      if (previewImages[0].accentColor) {
        console.log(previewImages[0].accentColor);
        style = {
          borderBottomColor: previewImages[0].accentColor
        };
      }
    }

    return (
      <div className='ms-DocumentCardPreview' style={ style }>
        { preview }
      </div>
    );
  }

  private _renderPreviewImage(previewImage: IDocumentCardPreviewImage): React.ReactElement<React.HTMLProps<HTMLDivElement>> {
    let { accentColor, width, height, imageFit } = previewImage;

    let image = (
      <Image
        width={ width }
        height={ height }
        imageFit={ imageFit }
        src={ previewImage.previewImageSrc }
        errorSrc={ previewImage.errorImageSrc }
        role='presentation' alt=''/>
    );

    let icon;
    if (previewImage.iconSrc) {
      icon = <Image className='ms-DocumentCardPreview-icon' src={ previewImage.iconSrc } role='presentation' alt=''/>;
    }

    return (
      <div>
        { image }
        { icon }
      </div>
    );
  }

  private _renderPreviewList(): React.ReactElement<React.HTMLProps<HTMLDivElement>> {
    console.log('rendering a list of files with icons');
    return <p>List of files with icons</p>;
  }

}
