import * as React from 'react';
import {
  Image,
  IImageProps,
  ImageFit,
  Label
} from '../../../../index';

export class ImageCoverExample extends React.Component<any, any> {
  public render() {
    let imageProps: IImageProps = {
      src: 'http://placehold.it/700x300',
      imageFit: ImageFit.cover
    };

    return (
      <div>
        <Label>The image has a wider aspect ratio (landscape) than the frame, so the image is scaled to fit the height and the sides are cropped evenly.</Label>
        <Image { ...imageProps as any } width={ 200 } height={ 200 } />
        <br />
        <Label>The image has a taller aspect ratio (portrait) than the frame, so the image is scaled to fit the width and the top and bottom are cropped evenly.</Label>
        <Image { ...imageProps as any } width={ 300 } height={ 50 } />
      </div>
    );
  }
}
