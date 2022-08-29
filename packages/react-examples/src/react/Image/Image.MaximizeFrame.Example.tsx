import * as React from 'react';
import { Image, IImageProps, ImageFit } from '@fluentui/react/lib/Image';

// These props are defined up here so they can easily be applied to multiple Images.
// Normally specifying them inline would be fine.
const imageProps: IImageProps = {
  maximizeFrame: true,
  imageFit: ImageFit.cover,
  src: 'https://fabricweb.azureedge.net/fabric-website/placeholders/500x500.png',
  // Show a border around the image (just for demonstration purposes)
  styles: props => ({ root: { border: '1px solid ' + props.theme.palette.neutralSecondary } }),
};

export const ImageMaximizeFrameExample = () => {
  return (
    <div>
      <p>
        Where the exact width or height of the image's frame is not known, such as when sizing an image as a percentage
        of its parent, you can use the <code>maximizeFrame</code> prop to expand the frame to fill the parent element.
      </p>
      <p>This image is placed within a landscape container.</p>
      <div style={{ width: '200px', height: '100px' }}>
        <Image {...imageProps} alt="Example of the maximizeFrame property with a landscape container." />
      </div>
      <p>This image is placed within a portrait container.</p>
      <div style={{ width: '100px', height: '200px' }}>
        <Image {...imageProps} alt="Example of the maximizeFrame property with a portrait container" />
      </div>
    </div>
  );
};
