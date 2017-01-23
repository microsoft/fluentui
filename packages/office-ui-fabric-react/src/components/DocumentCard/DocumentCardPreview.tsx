import * as React from 'react';
import { IDocumentCardPreviewProps, IDocumentCardPreviewImage } from './DocumentCard.Props';
import { Image } from '../../Image';
import {
  autobind,
  css
} from '../../Utilities';
import './DocumentCardPreview.scss';

const LIST_ITEM_COUNT = 3;

export class DocumentCardPreview extends React.Component<IDocumentCardPreviewProps, any> {
  public render() {
    let { previewImages } = this.props;
    let style, preview;
    let isFileList = false;

    if (previewImages.length > 1) {
      // Render a list of files
      preview = this._renderPreviewList(previewImages);
      isFileList = true;
    } else if (previewImages.length === 1) {
      // Render a single preview
      preview = this._renderPreviewImage(previewImages[0]);

      // Override the border color if an accent color was provided
      if (previewImages[0].accentColor) {
        style = {
          borderBottomColor: previewImages[0].accentColor
        };
      }
    }

    return (
      <div className={ css('ms-DocumentCardPreview', isFileList && 'is-fileList') } style={ style }>
        { preview }
      </div>
    );
  }

  private _renderPreviewImage(previewImage: IDocumentCardPreviewImage): React.ReactElement<React.HTMLProps<HTMLDivElement>> {
    let { width, height, imageFit } = previewImage;

    let image = (
      <Image
        width={ width }
        height={ height }
        imageFit={ imageFit }
        src={ previewImage.previewImageSrc }
        errorSrc={ previewImage.errorImageSrc }
        role='presentation' alt='' />
    );

    let icon;
    if (previewImage.iconSrc) {
      icon = <Image className='ms-DocumentCardPreview-icon' src={ previewImage.iconSrc } role='presentation' alt='' />;
    }

    return (
      <div>
        { image }
        { icon }
      </div>
    );
  }

  @autobind
  private _renderPreviewList(previewImages: IDocumentCardPreviewImage[]): React.ReactElement<React.HTMLProps<HTMLDivElement>> {
    let { getOverflowDocumentCountText } = this.props;

    // Determine how many documents we won't be showing
    let overflowDocumentCount = previewImages.length - LIST_ITEM_COUNT;

    // Determine the overflow text that will be rendered after the preview list.
    let overflowText = overflowDocumentCount ?
      (getOverflowDocumentCountText ?
        getOverflowDocumentCountText(overflowDocumentCount) :
        '+' + overflowDocumentCount) : null;

    // Create list items for the documents to be shown
    let fileListItems = previewImages.slice(0, LIST_ITEM_COUNT).map((file, fileIndex) => (
      <li key={ fileIndex }>
        <Image
          className='ms-DocumentCardPreview-fileListIcon'
          src={ file.iconSrc }
          role='presentation'
          alt=''
          width='16px'
          height='16px' />
        <a href={ file.url }>{ file.name }</a>
      </li>
    ));

    return (
      <div>
        <ul className='ms-DocumentCardPreview-fileList'>
          { fileListItems }
        </ul>
        { overflowText &&
          <span className='ms-DocumentCardPreview-fileListMore'>{ overflowText }</span>
        }
      </div>
    );
  }

}
