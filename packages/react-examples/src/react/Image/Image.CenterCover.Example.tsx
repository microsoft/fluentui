import { IImageProps, Image, ImageFit } from '@fluentui/react/lib/Image';
import * as React from 'react';

// These props are defined up here so they can easily be applied to multiple Images.
// Normally specifying them inline would be fine.
const imageProps: Partial<IImageProps> = {
  imageFit: ImageFit.centerCover,
  width: 200,
  height: 200,
  // Show a border around the image (just for demonstration purposes)
  styles: props => ({ root: { border: '1px solid ' + props.theme.palette.neutralSecondary } }),
};

export const ImageCenterCoverExample = () => {
  return (
    <div>
      <p>
        Setting the <code>imageFit</code> property to <code>ImageFit.centerCover</code> will cause the image to scale up
        or down proportionally. Images smaller than their frame will be rendered as <code>ImageFit.center</code>, while
        images larger than either frame's height or width will render as <code>ImageFit.cover</code>.
      </p>
      <p>This image is smaller than the frame, so it's centered and rendered at its natural size.</p>
      <Image
        {...imageProps}
        src="https://fabricweb.azureedge.net/fabric-website/placeholders/100x150.png"
        alt='Example of the image fit value "centerCover" on an image smaller than the frame.'
      />
      <p>
        This image has a wider aspect ratio (more landscape) than the frame but is not as tall as the frame, so it's
        rendered at its natural size while cropping the sides.
      </p>
      <Image
        {...imageProps}
        src="https://fabricweb.azureedge.net/fabric-website/placeholders/300x100.png"
        alt='Example of the image fit value "centerCover" on an image wider than the frame.'
      />
      <p>
        This image has a taller aspect ratio (more portrait) than the frame but is not as wide as the frame, so it's
        rendered at its natural size while cropping the top and bottom.
      </p>
      <Image
        {...imageProps}
        src="https://fabricweb.azureedge.net/fabric-website/placeholders/100x300.png"
        alt='Example of the image fit value "centerCover" on an image taller than the frame.'
      />
      <p>These images are taller and wider than the frame, so they grow just enough to "cover" the frame area.</p>
      <Image
        {...imageProps}
        src="https://fabricweb.azureedge.net/fabric-website/placeholders/400x500.png"
        alt='Example of the image fit value "centerCover" on an image taller and wider than the frame.'
      />
      <br />
      <br />
      <Image
        {...imageProps}
        src="https://fabricweb.azureedge.net/fabric-website/placeholders/500x400.png"
        alt='Example of the image fit value "centerCover" on an image taller and wider than the frame.'
      />
    </div>
  );
};
