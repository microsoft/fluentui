import * as React from 'react';
import { IImageProps, Image, ImageFit } from '@fluentui/react/lib/Image';

// These props are defined up here so they can easily be applied to multiple Images.
// Normally specifying them inline would be fine.
const imageProps: Partial<IImageProps> = {
  imageFit: ImageFit.centerContain,
  width: 200,
  height: 200,
  // Show a border around the image (just for demonstration purposes)
  styles: props => ({ root: { border: '1px solid ' + props.theme.palette.neutralSecondary } }),
};

export const ImageCenterContainExample = () => {
  return (
    <div>
      <p>
        Setting the <code>imageFit</code> property to <code>ImageFit.centerContain</code> will cause the image to scale
        up or down proportionally. Images smaller than their frame will be rendered as <code>ImageFit.center</code>,
        while images larger than either frame's height or width will render as <code>ImageFit.contain</code>.
      </p>
      <p>This image is smaller than the frame, so it's centered and rendered at its natural size.</p>
      <Image
        {...imageProps}
        src="https://fabricweb.azureedge.net/fabric-website/placeholders/100x150.png"
        alt='Example of the image fit value "centerContain" on an image smaller than the frame.'
      />
      <p>This image is wider than the frame, so it's contained.</p>
      <Image
        {...imageProps}
        src="https://fabricweb.azureedge.net/fabric-website/placeholders/300x100.png"
        alt='Example of the image fit value "centerContain" on an image wider than the frame.'
      />
      <p>This image is taller than the frame, so it's contained.</p>
      <Image
        {...imageProps}
        src="https://fabricweb.azureedge.net/fabric-website/placeholders/100x300.png"
        alt='Example of the image fit value "centerContain" on an image taller than the frame.'
      />
      <p>These images are taller and wider than the frame, so they are contained.</p>
      <Image
        {...imageProps}
        src="https://fabricweb.azureedge.net/fabric-website/placeholders/400x500.png"
        alt='Example of the image fit value "centerContain" on an image taller and wider than the frame.'
      />
      <br />
      <br />
      <Image
        {...imageProps}
        src="https://fabricweb.azureedge.net/fabric-website/placeholders/500x400.png"
        alt='Example of the image fit value "centerContain" on an image taller and wider than the frame.'
      />
    </div>
  );
};
