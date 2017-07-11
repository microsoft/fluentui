import * as React from 'react';
import { IDocumentCardPreviewProps, IDocumentCardPreviewImage } from './DocumentCard.Props';
import { Image } from '../../Image';
import {
  BaseComponent,
  autobind,
  css
} from '../../Utilities';
import * as stylesImport from './DocumentCard.scss';
const styles: any = stylesImport;

const LIST_ITEM_COUNT = 3;

export class DocumentCardPreview extends BaseComponent<IDocumentCardPreviewProps, any> {
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
    }

    return (
      <div className={ css('ms-DocumentCardPreview', styles.preview, isFileList && ('is-fileList ' + styles.previewIsFileList)) } style={ style }>
        { preview }
      </div>
    );
  }

  private _renderPreviewImage(previewImage: IDocumentCardPreviewImage): React.ReactElement<React.HTMLAttributes<HTMLDivElement>> {
    let { width, height, imageFit } = previewImage;

    let image = (
      <Image
        width={ width }
        height={ height }
        imageFit={ imageFit }
        src={ previewImage.previewImageSrc }
        role='presentation' alt='' />
    );

    let icon;
    if (previewImage.iconSrc) {
      icon = <Image className={ css('ms-DocumentCardPreview-icon', styles.icon) } src={ previewImage.iconSrc } role='presentation' alt='' />;
    }

    return (
      <div>
        { image }
        { icon }
      </div>
    );
  }

  @autobind
  private _renderPreviewList(previewImages: IDocumentCardPreviewImage[]): React.ReactElement<React.HTMLAttributes<HTMLDivElement>> {
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
          className={ css('ms-DocumentCardPreview-fileListIcon', styles.fileListIcon) }
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
        <ul className={ css('ms-DocumentCardPreview-fileList', styles.fileList) }>
          { fileListItems }
        </ul>
        { overflowText &&
          <span className={ css('ms-DocumentCardPreview-fileListMore', styles.fileListMore) }>{ overflowText }</span>
        }
      </div>
    );
  }

}
