import * as React from 'react';
import {
  Image,
  IImageProps,
  ImageFit,
  Label
} from '../../../../index';

export class ImageCenterExample extends React.Component<any, any> {
  public render() {
    let imageProps: IImageProps = {
      src: 'http://placehold.it/800x300',
      imageFit: ImageFit.center,
      width: 350,
      height: 150,
      onLoad: (ev) => console.log('image loaded', ev)
    };

    return (
      <div>
        <Label>The image is larger than the frame and its size is maintained, so all sides are cropped to center the image.</Label>
        <Image  { ...imageProps as any } src='http://placehold.it/800x300' />
        <br />
        <Label>The image is smaller than the frame and its size is maintained, so there is empty space within the frame. The image is centered in the empty space.</Label>
        <Image  { ...imageProps as any } src='http://placehold.it/100x100' />
      </div>
    );
  }
}
