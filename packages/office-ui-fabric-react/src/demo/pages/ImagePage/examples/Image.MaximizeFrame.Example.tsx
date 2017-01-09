import * as React from 'react';
import {
  Image,
  IImageProps,
  ImageFit,
  Label
} from '../../../../index';

export class ImageMaximizeFrameExample extends React.Component<any, any> {
  public render() {
    let imageProps: IImageProps = {
      src: 'http://placehold.it/500x500',
      imageFit: ImageFit.cover,
      shouldMaximizeFrame: true
    };

    return (
      <div>
        <p>Where the exact width and height of the image's frame is not known, such as when sizing an image as a percentage of its parent, you can use the "shouldMaximizeFrame" prop to expand the frame to fill the parent element.</p>
        <Label>The image is placed within a landscape container.</Label>
        <div style={ { width: '200px', height: '100px' } }>
          <Image { ...imageProps as any } />
        </div>
        <br />
        <Label>The image is placed within a portrait container.</Label>
        <div style={ { width: '100px', height: '200px' } }>
          <Image { ...imageProps as any } />
        </div>
      </div>
    );
  }
}
