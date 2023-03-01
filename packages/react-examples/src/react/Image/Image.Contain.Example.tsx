import * as React from 'react';
import { Image, IImageProps, ImageFit } from '@fluentui/react/lib/Image';

// These props are defined up here so they can easily be applied to multiple Images.
// Normally specifying them inline would be fine.
const imageProps: IImageProps = {
  imageFit: ImageFit.contain,
  src: 'https://fabricweb.azureedge.net/fabric-website/placeholders/700x300.png',
  // Show a border around the image (just for demonstration purposes)
  styles: props => ({ root: { border: '1px solid ' + props.theme.palette.neutralSecondary } }),
};

export const ImageContainExample = () => {
  return (
    <div>
      <p>
        Setting the <code>imageFit</code> property to <code>ImageFit.contain</code> will scale the image up or down to
        fit the frame, while maintaining its natural aspect ratio and without cropping the image.
      </p>
      <p>
        This image has a wider aspect ratio (more landscape) than the frame, so it's scaled to fit the width and
        centered in the available vertical space.
      </p>
      <Image
        {...imageProps}
        alt='Example of the image fit value "contain" on an image wider than the frame.'
        width={200}
        height={200}
      />
      <p>
        This image has a taller aspect ratio (more portrait) than the frame, so it's scaled to fit the height and
        centered in the available horizontal space.
      </p>
      <Image
        {...imageProps}
        alt='Example of the image fit value "contain" on an image taller than the frame.'
        width={300}
        height={50}
      />
    </div>
  );
};
