import * as React from 'react';
import { Image, IImageProps, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { Label } from 'office-ui-fabric-react/lib/Label';

export class ImageCoverExample extends React.Component<any, any> {
  public render(): JSX.Element {
    const imageProps: IImageProps = {
      src: 'http://placehold.it/500x500',
      imageFit: ImageFit.cover
    };

    return (
      <div>
        <p>
          Setting the imageFit property to "cover" will cause the image to scale up or down proportionally, while cropping from either the
          top and bottom or sides to completely fill the frame.
        </p>
        <Label>
          The image has a wider aspect ratio (more landscape) than the frame, so the image is scaled to fit the height and the sides are
          cropped evenly.
        </Label>
        <Image
          {...imageProps as any}
          alt="Example implementation of the property image fit using the cover value on an image wider than the frame."
          width={150}
          height={250}
        />
        <br />
        <Label>
          The image has a taller aspect ratio (more portrait) than the frame, so the image is scaled to fit the width and the top and bottom
          are cropped evenly.
        </Label>
        <Image
          {...imageProps as any}
          alt="Example implementation of the property image fit using the cover value on an image taller than the frame."
          width={250}
          height={150}
        />
      </div>
    );
  }
}
