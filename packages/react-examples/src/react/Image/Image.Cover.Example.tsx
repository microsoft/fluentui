import * as React from 'react';
import { Image, IImageProps, ImageFit } from '@fluentui/react/lib/Image';

// These props are defined up here so they can easily be applied to multiple Images.
// Normally specifying them inline would be fine.
const imageProps: IImageProps = {
  imageFit: ImageFit.cover,
  src: 'https://fabricweb.azureedge.net/fabric-website/placeholders/500x500.png',
  // Show a border around the image (just for demonstration purposes)
  styles: props => ({ root: { border: '1px solid ' + props.theme.palette.neutralSecondary } }),
};

export const ImageCoverExample = () => {
  return (
    <div>
      <p>
        Setting the <code>imageFit</code> property to <code>ImageFit.cover</code> will cause the image to scale up or
        down proportionally, while cropping from either the top and bottom or sides to completely fill the frame.
      </p>
      <p>
        This image has a wider aspect ratio (more landscape) than the frame, so it's scaled to fit the height and the
        sides are cropped evenly.
      </p>
      <Image
        {...imageProps}
        alt='Example of the image fit value "cover" on an image wider than the frame.'
        width={150}
        height={250}
      />
      <p>
        This image has a taller aspect ratio (more portrait) than the frame, so it's scaled to fit the width and the top
        and bottom are cropped evenly.
      </p>
      <Image
        {...imageProps}
        alt='Example of the image fit value "cover" on an image taller than the frame.'
        width={250}
        height={150}
      />
    </div>
  );
};
