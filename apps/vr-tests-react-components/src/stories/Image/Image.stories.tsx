import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { Image } from '@fluentui/react-image';
import { ComponentMeta } from '@storybook/react';

const imageUrl = 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AmandaBrady.jpg';

export default {
  title: 'Image Converged',

  decorators: [
    (story: () => React.ReactNode) => (
      <StoryWright steps={new Steps().snapshot('normal', { cropTo: '.testWrapper' }).end()}>{story()}</StoryWright>
    ),
  ],
} as ComponentMeta<typeof Image>;

export const Default = () => (
  <Image src="https://fabricweb.azureedge.net/fabric-website/placeholders/300x300.png" alt="Placeholder image" />
);

export const ImageShape = () => (
  <>
    <div>
      <Image src={imageUrl} alt="Amanda's avatar default" height={200} width={200} />
    </div>
    <div>
      <Image src={imageUrl} alt="Amanda's avatar rounded" height={200} width={200} shape="rounded" />
    </div>
    <div>
      <Image src={imageUrl} alt="Amanda's avatar circular" height={200} width={200} shape="circular" />
    </div>
  </>
);

export const ImageVariationsBorder = () => (
  <>
    <div>
      <Image src={imageUrl} alt="Amanda's avatar bordered" height={200} width={200} bordered />
    </div>
    <div>
      <Image
        src={imageUrl}
        alt="Amanda's avatar bordered and rounded"
        height={200}
        width={200}
        bordered
        shape="rounded"
      />
    </div>
    <div>
      <Image
        src={imageUrl}
        alt="Amanda's avatar bordered and circular"
        height={200}
        width={200}
        bordered
        shape="circular"
      />
    </div>
  </>
);

export const ImageVariationsFallback = () => (
  <Image src="non-existent.jpg" alt="Non-existent image fallback" height={150} width={150} />
);

export const ImageLayoutFit = () => (
  <>
    <div style={{ height: 300, width: 400 }}>
      <Image
        src="https://fabricweb.azureedge.net/fabric-website/placeholders/600x200.png"
        alt="Placeholder for fit none"
        fit="none"
      />
    </div>
    <div style={{ height: 300, width: 400 }}>
      <Image
        src="https://fabricweb.azureedge.net/fabric-website/placeholders/600x200.png"
        alt="Placeholder for fit center"
        fit="center"
      />
    </div>
    <div style={{ height: 300, width: 400 }}>
      <Image
        src="https://fabricweb.azureedge.net/fabric-website/placeholders/600x200.png"
        alt="Placeholder for fit contain"
        fit="contain"
      />
    </div>
    <div style={{ height: 300, width: 400 }}>
      <Image
        src="https://fabricweb.azureedge.net/fabric-website/placeholders/600x200.png"
        alt="Placeholder for fit cover"
        fit="cover"
      />
    </div>
  </>
);

export const ImageFluid = () => (
  <>
    <div>
      <Image src="https://fabricweb.azureedge.net/fabric-website/placeholders/900x50.png" block />
    </div>
    <div>
      <Image src="https://fabricweb.azureedge.net/fabric-website/placeholders/100x100.png" block />
    </div>
  </>
);

export const ImageShadow = () => (
  <Image src="https://fabricweb.azureedge.net/fabric-website/placeholders/900x50.png" shadow />
);
