import * as React from 'react';
import {
  Image,
  IImageProps,
  ImageFit
} from 'office-ui-fabric-react/lib/Image';
import { Label } from 'office-ui-fabric-react/lib/Label';

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
        <p>Setting the imageFit property to "center" behaves the same as "none", while centering the image within the frame.</p>
        <Label>The image is larger than the frame, so all sides are cropped to center the image.</Label>
        <Image  { ...imageProps as any } src='http://placehold.it/800x300' />
        <br />
        <Label>The image is smaller than the frame, so there is empty space within the frame. The image is centered in the available space.</Label>
        <Image  { ...imageProps as any } src='http://placehold.it/100x100' />
      </div>
    );
  }
}
