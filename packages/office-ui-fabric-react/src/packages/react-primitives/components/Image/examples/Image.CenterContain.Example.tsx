import { IImageProps, Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { Label } from 'office-ui-fabric-react/lib/Label';
import * as React from 'react';

export class ImageCenterContainExample extends React.Component<any, any> {
  public render(): JSX.Element {
    const imageProps: Partial<IImageProps> = {
      imageFit: ImageFit.centerContain,
      width: 200,
      height: 200
    };

    return (
      <div>
        <p>
          Setting the imageFit property to "centerContain" will cause the image to scale up or down proportionally. Images smaller than
          their frame will be rendered as "ImageFit.center", while images larger than both either frame's height or width will render as
          "ImageFit.contain".
        </p>
        <Label>The image is smaller than the frame, so it's centered and rendered at its natural size.</Label>
        <Image
          {...imageProps}
          src="http://placehold.it/100x150"
          alt="Example implementation of the property image fit using the centerContain value on an image smaller than the frame."
        />
        <br />
        <Label>The image has a wider width than the frame so it's contained.</Label>
        <Image
          {...imageProps}
          src="http://placehold.it/300x100"
          alt="Example implementation of the property image fit using the centerContain value on an image wider than the frame."
        />
        <br />
        <Label>The image is taller than the frame so it's contained.</Label>
        <Image
          {...imageProps}
          src="http://placehold.it/100x300"
          alt="Example implementation of the property image fit using the centerContain value on an image taller than the frame."
        />
        <br />
        <Label>These images are taller and wider than the frame and so they are contained.</Label>
        <Image
          {...imageProps}
          src="http://placehold.it/400x500"
          alt="Example implementation of the property image fit using the centerContain value on an image taller and wider than the frame."
        />
        <br />
        <Image
          {...imageProps}
          src="http://placehold.it/500x400"
          alt="Example implementation of the property image fit using the centerContain value on an image taller and wider than the frame."
        />
      </div>
    );
  }
}
