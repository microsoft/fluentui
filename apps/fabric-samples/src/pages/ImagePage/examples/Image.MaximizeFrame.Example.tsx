import * as React from 'react';
import {
  Image,
  IImageProps,
  ImageFit
} from 'office-ui-fabric-react/lib/Image';
import { Label } from 'office-ui-fabric-react/lib/Label';

export class ImageMaximizeFrameExample extends React.Component<any, any> {
  public render() {
    let imageProps: IImageProps = {
      src: 'http://placehold.it/500x500',
      imageFit: ImageFit.cover,
      maximizeFrame: true
    };

    return (
      <div>
        <p>Where the exact width and height of the image's frame is not known, such as when sizing an image as a percentage of its parent, you can use the "maximizeFrame" prop to expand the frame to fill the parent element.</p>
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
