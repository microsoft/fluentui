import { IImageProps, Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { Label } from 'office-ui-fabric-react/lib/Label';
import * as React from 'react';

export const ImageCenterCoverExample = () => {
  const imageProps: Partial<IImageProps> = {
    imageFit: ImageFit.centerCover,
    width: 200,
    height: 200,
  };

  return (
    <div>
      <p>
        Setting the imageFit property to "centerCover" will cause the image to scale up or down proportionally. Images
        smaller than their frame will be rendered as "ImageFit.center", while images larger than both the frame's height
        and width will render as "ImageFit.cover".
      </p>
      <Label>The image is smaller than the frame, so it's centered and rendered at its natural size.</Label>
      <Image
        {...imageProps}
        src="http://placehold.it/100x150"
        alt='Example of the image fit value "centerCover" on an image smaller than the frame.'
      />
      <br />
      <Label>
        The image has a wider aspect ratio (more landscape) than the frame but is not as tall as the frame, so it's
        rendered at its natural size while cropping the sides.
      </Label>
      <Image
        {...imageProps}
        src="http://placehold.it/300x100"
        alt='Example of the image fit value "centerCover" on an image wider than the frame.'
      />
      <br />
      <Label>
        The image has a taller aspect ratio (more portrait) than the frame but is not as wide as the frame, so it's
        rendered at its natural size while cropping the top and bottom.
      </Label>
      <Image
        {...imageProps}
        src="http://placehold.it/100x300"
        alt='Example of the image fit value "centerCover" on an image taller than the frame.'
      />
      <br />
      <Label>
        These images are taller and wider than the frame, so they grow just enough to "cover" the frame area.
      </Label>
      <Image
        {...imageProps}
        src="http://placehold.it/400x500"
        alt='Example of the image fit value "centerCover" on an image taller and wider than the frame.'
      />
      <br />
      <Image
        {...imageProps}
        src="http://placehold.it/500x400"
        alt='Example of the image fit value "centerCover" on an image taller and wider than the frame.'
      />
    </div>
  );
};
