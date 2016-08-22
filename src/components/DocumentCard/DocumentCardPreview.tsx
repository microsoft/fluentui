import * as React from 'react';
import { IDocumentCardPreviewProps } from './DocumentCard.Props';
import { Image } from '../../Image';
import { Async } from '../../utilities/Async/Async';
import './DocumentCardPreview.scss';

const INTERVAL_DELAY: number = 3000;

export class DocumentCardPreview extends React.Component<IDocumentCardPreviewProps, any> {

  private _async: Async;
  private _interval: number;

  constructor(props: IDocumentCardPreviewProps) {
    super(props);
    this._showNextPreview = this._showNextPreview.bind(this);
    this._async = new Async(this);

    // Show the first preview by default
    this.state = {
      visiblePreviewIndex: 0
    };

    // If more than one preview has been provided, set an interval to start flipping through them
    if (this.props.previewImages.length > 1) {
      this._interval = this._async.setInterval(() => { this._showNextPreview(); }, INTERVAL_DELAY);
    }
  }

  public componentWillUnmount() {
    this._async.dispose();
  }

  public render() {
    let { previewImages } = this.props;
    let { visiblePreviewIndex } = this.state;
    let previewImage = previewImages[visiblePreviewIndex];
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
      </div>
    );
  }

  private _showNextPreview() {
    let maximumIndex = this.props.previewImages.length - 1;
    let currentIndex = this.state.visiblePreviewIndex;

    let newIndex;
    if (currentIndex < maximumIndex) {
      newIndex = currentIndex + 1;
    } else {
      newIndex = 0;
    }

    this.setState({
      visiblePreviewIndex: newIndex
    });
  }
}
