import * as React from 'react';
import {
  Image,
  IImageProps,
  ImageFit,
  Label
} from '../../../../index';

export class ImageScaleExample extends React.Component<any, any> {
  public render() {
    let imageProps: IImageProps = {
      src: 'http://placehold.it/500x500',
      imageFit: ImageFit.scale,
      width: 350,
      height: 150
    };

    return (
      <div>
        <Label>The image is scaled to match the frame, resulting in a squashed image.</Label>
        <Image { ...imageProps as any } />
      </div>
    );
  }
}
