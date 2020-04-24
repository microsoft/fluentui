import * as React from 'react';
import { Image, IImageProps, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { Label } from 'office-ui-fabric-react/lib/Label';

export const ImageCenterExample = () => {
  const imageProps: IImageProps = {
    src: 'http://placehold.it/800x300',
    imageFit: ImageFit.center,
    width: 350,
    height: 150,
    onLoad: ev => console.log('image loaded', ev),
  };
  return (
    <div>
      <p>
        Setting the imageFit property to "center" behaves the same as "none", while centering the image within the
        frame.
      </p>
      <Label>The image is larger than the frame, so all sides are cropped to center the image.</Label>
      <Image
        {...imageProps}
        src="http://placehold.it/800x300"
        alt='Example of the image fit value "center" on an image larger than the frame.'
      />
      <br />
      <Label>
        The image is smaller than the frame, so there is empty space within the frame. The image is centered in the
        available space.
      </Label>
      <Image
        {...imageProps}
        src="http://placehold.it/100x100"
        alt='Example of the image fit value "center" on an image smaller than the frame.'
      />
    </div>
  );
};
