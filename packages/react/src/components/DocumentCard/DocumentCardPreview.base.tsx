import * as React from 'react';
import { Icon } from '../../Icon';
import { Image } from '../../Image';
import { Link } from '../../Link';
import { classNamesFunction, css, initializeComponentRef } from '../../Utilities';
import type { IProcessedStyleSet } from '../../Styling';
import type {
  IDocumentCardPreviewImage,
  IDocumentCardPreviewProps,
  IDocumentCardPreviewStyleProps,
  IDocumentCardPreviewStyles,
} from './DocumentCardPreview.types';

const DEFAULT_DISPLAY_COUNT = 3;
const getClassNames = classNamesFunction<IDocumentCardPreviewStyleProps, IDocumentCardPreviewStyles>();

/**
 * {@docCategory DocumentCard}
 */
export class DocumentCardPreviewBase extends React.Component<IDocumentCardPreviewProps, any> {
  private _classNames: IProcessedStyleSet<IDocumentCardPreviewStyles>;

  constructor(props: IDocumentCardPreviewProps) {
    super(props);

    initializeComponentRef(this);
  }

  public render(): JSX.Element {
    const { previewImages, styles, theme, className } = this.props;
    let style: React.CSSProperties | undefined;
    let preview: React.ReactNode;
    const isFileList = previewImages.length > 1;

    this._classNames = getClassNames(styles!, {
      theme: theme!,
      className,
      isFileList,
    });

    if (previewImages.length > 1) {
      // Render a list of files
      preview = this._renderPreviewList(previewImages);
    } else if (previewImages.length === 1) {
      // Render a single preview
      preview = this._renderPreviewImage(previewImages[0]);

      // Override the border color if an accent color was provided
      /* eslint-disable deprecation/deprecation */
      if (previewImages[0].accentColor) {
        style = {
          borderBottomColor: previewImages[0].accentColor,
        };
      }
      /* eslint-enable deprecation/deprecation */
    }

    return (
      <div className={this._classNames.root} style={style}>
        {preview}
      </div>
    );
  }

  private _renderPreviewImage(
    previewImage: IDocumentCardPreviewImage,
  ): React.ReactElement<React.HTMLAttributes<HTMLDivElement>> {
    const { width, height, imageFit, previewIconProps, previewIconContainerClass } = previewImage;

    if (previewIconProps) {
      return (
        <div className={css(this._classNames.previewIcon, previewIconContainerClass)} style={{ width, height }}>
          <Icon {...previewIconProps} />
        </div>
      );
    }

    const image = (
      <Image
        width={width}
        height={height}
        imageFit={imageFit}
        src={previewImage.previewImageSrc}
        role="presentation"
        alt=""
      />
    );

    let icon;
    if (previewImage.iconSrc) {
      icon = <Image className={this._classNames.icon} src={previewImage.iconSrc} role="presentation" alt="" />;
    }

    return (
      <div>
        {image}
        {icon}
      </div>
    );
  }

  private _renderPreviewList = (
    previewImages: IDocumentCardPreviewImage[],
  ): React.ReactElement<React.HTMLAttributes<HTMLDivElement>> => {
    const { getOverflowDocumentCountText, maxDisplayCount = DEFAULT_DISPLAY_COUNT } = this.props;

    // Determine how many documents we won't be showing
    const overflowDocumentCount = previewImages.length - maxDisplayCount;

    // Determine the overflow text that will be rendered after the preview list.
    const overflowText = overflowDocumentCount
      ? getOverflowDocumentCountText
        ? getOverflowDocumentCountText(overflowDocumentCount)
        : '+' + overflowDocumentCount
      : null;

    // Create list items for the documents to be shown
    const fileListItems = previewImages.slice(0, maxDisplayCount).map((file, fileIndex) => (
      <li key={fileIndex}>
        <Image
          className={this._classNames.fileListIcon}
          src={file.iconSrc}
          role="presentation"
          alt=""
          width="16px"
          height="16px"
        />
        <Link
          className={this._classNames.fileListLink}
          // eslint-disable-next-line deprecation/deprecation
          href={file.url}
          {...file.linkProps}
        >
          {file.name}
        </Link>
      </li>
    ));

    return (
      <div>
        <ul className={this._classNames.fileList}>{fileListItems}</ul>
        {overflowText && <span className={this._classNames.fileListOverflowText}>{overflowText}</span>}
      </div>
    );
  };
}
