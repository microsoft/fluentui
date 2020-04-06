import * as React from 'react';
import { Image, Layout } from '@fluentui/react-northstar';

const ImageExampleFluent = () => (
  <div>
    <Layout
      styles={{ maxWidth: '70px' }}
      debug
      renderMainArea={() => <Image fluid src="public/images/wireframe/square-image.png" />}
    />
    <Layout
      styles={{ maxWidth: '100px' }}
      debug
      renderMainArea={() => <Image fluid src="public/images/wireframe/square-image.png" />}
    />
    <Layout
      styles={{ maxWidth: '150px' }}
      debug
      renderMainArea={() => <Image fluid src="public/images/wireframe/square-image.png" />}
    />
  </div>
);

export default ImageExampleFluent;
