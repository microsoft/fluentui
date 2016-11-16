import * as React from 'react';
import {
  Image,
  IImageProps,
  ImageFit,
  Label
} from '../../../../index';

export class ImageNoneExample extends React.Component<any, any> {
  public render() {
    let imageProps: IImageProps = {
      src: 'http://placehold.it/500x250',
      imageFit: ImageFit.none,
      width: 350,
      height: 150
    };

    return (
      <div>
        <Label>The image is larger than the frame, so it is cropped to fit. The image is positioned at the upper left of the frame.</Label>
        <Image  { ...imageProps as any } />
        <br />
        <Label>The image is smaller than the frame, so there is empty space within the frame. The image is positioned at the upper left of the frame.</Label>
        <Image  { ...imageProps as any } src='http://placehold.it/100x100' />
      </div>
    );
  }
}
