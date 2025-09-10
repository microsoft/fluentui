import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Image } from '@fluentui/react-components';

export const Block = (): JSXElement => (
  <>
    <Image block src="https://fabricweb.azureedge.net/fabric-website/placeholders/900x50.png" alt="Image placeholder" />
    <Image
      block
      src="https://fabricweb.azureedge.net/fabric-website/placeholders/100x100.png"
      alt="Image placeholder"
    />
  </>
);
Block.parameters = {
  docs: {
    description: {
      story: 'An Image can be maximized in order to fill its parent container.',
    },
  },
};
