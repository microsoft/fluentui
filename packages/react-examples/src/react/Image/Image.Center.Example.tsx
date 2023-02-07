import * as React from 'react';
import { Image, IImageProps, ImageFit } from '@fluentui/react/lib/Image';

// These props are defined up here so they can easily be applied to multiple Images.
// Normally specifying them inline would be fine.
const imageProps: IImageProps = {
  imageFit: ImageFit.center,
  width: 350,
  height: 150,
  // Show a border around the image (just for demonstration purposes)
  styles: props => ({ root: { border: '1px solid ' + props.theme.palette.neutralSecondary } }),
};

export const ImageCenterExample = () => {
  return (
    <div>
      <p>
        Setting the <code>imageFit</code> property to <code>ImageFit.center</code> behaves the same as{' '}
        <code>ImageFit.none</code>, while centering the image within the frame.
      </p>
      <p>This image is larger than the frame, so all sides are cropped to center the image.</p>
      <Image
        {...imageProps}
        src="https://fabricweb.azureedge.net/fabric-website/placeholders/800x300.png"
        alt='Example of the image fit value "center" on an image larger than the frame.'
      />
      <p>
        This image is smaller than the frame, so there is empty space within the frame. The image is centered in the
        available space.
      </p>
      <Image
        {...imageProps}
        src="https://fabricweb.azureedge.net/fabric-website/placeholders/100x100.png"
        alt='Example of the image fit value "center" on an image smaller than the frame.'
      />
    </div>
  );
};
