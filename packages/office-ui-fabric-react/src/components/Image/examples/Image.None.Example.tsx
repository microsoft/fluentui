import * as React from 'react';
import { Image, IImageProps, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { Label } from 'office-ui-fabric-react/lib/Label';

export class ImageNoneExample extends React.Component<any, any> {
  public render(): JSX.Element {
    const imageProps: IImageProps = {
      src: 'http://placehold.it/500x250',
      imageFit: ImageFit.none,
      width: 350,
      height: 150
    };

    return (
      <div>
        <p>
          By setting the imageFit property to "none", the image will remain at its natural size, even if the frame is made larger or smaller
          by setting the width and height props.
        </p>
        <Label>The image is larger than the frame, so it is cropped to fit. The image is positioned at the upper left of the frame.</Label>
        <Image
          {...imageProps as any}
          alt="Example implementation of the property image fit using the none value on an image larger than the frame."
        />
        <br />
        <Label>
          The image is smaller than the frame, so there is empty space within the frame. The image is positioned at the upper left of the
          frame.
        </Label>
        <Image
          {...imageProps as any}
          src="http://placehold.it/100x100"
          alt="Example implementation of the property image fit using the none value on an image smaller than the frame."
        />
      </div>
    );
  }
}
