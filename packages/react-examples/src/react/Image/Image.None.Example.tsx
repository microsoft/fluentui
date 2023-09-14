import * as React from 'react';
import { Image, IImageProps, ImageFit } from '@fluentui/react/lib/Image';

// These props are defined up here so they can easily be applied to multiple Images.
// Normally specifying them inline would be fine.
const imageProps: IImageProps = {
  imageFit: ImageFit.none,
  width: 350,
  height: 150,
  // Show a border around the image (just for demonstration purposes)
  styles: props => ({ root: { border: '1px solid ' + props.theme.palette.neutralSecondary } }),
};

export const ImageNoneExample = () => {
  return (
    <div>
      <p>
        By setting the <code>imageFit</code> property to <code>ImageFit.none</code>, the image will remain at its
        natural size, even if the frame is made larger or smaller by setting the width or height props.
      </p>
      <p>This image is larger than the frame, so it's cropped to fit and positioned at the upper left.</p>
      <Image
        {...imageProps}
        src="https://fabricweb.azureedge.net/fabric-website/placeholders/500x250.png"
        alt='Example of the image fit value "none" on an image larger than the frame.'
      />
      <p>
        This image is smaller than the frame, so there's empty space within the frame and the image is positioned at the
        upper left.
      </p>
      <Image
        {...imageProps}
        src="https://fabricweb.azureedge.net/fabric-website/placeholders/100x100.png"
        alt='Example of the image fit value "none" on an image smaller than the frame.'
      />
    </div>
  );
};
