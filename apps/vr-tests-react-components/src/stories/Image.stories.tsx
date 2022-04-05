import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Screener from 'screener-storybook/src/screener';
import { Image } from '@fluentui/react-image';

const imageUrl = 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AmandaBrady.jpg';

storiesOf('Image Converged', module)
  .addDecorator((story: () => React.ReactNode) => (
    <Screener steps={new Screener.Steps().snapshot('normal', { cropTo: '.testWrapper' }).end()}>{story()}</Screener>
  ))
  .addStory('Default', () => (
    <Image src="https://fabricweb.azureedge.net/fabric-website/placeholders/300x300.png" alt="Placeholder image" />
  ))
  .addStory('Image Shape', () => (
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
  ))
  .addStory('Image Variations Border', () => (
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
  ))
  .addStory('Image Variations Fallback', () => (
    <Image src="non-existent.jpg" alt="Non-existent image fallback" height={150} width={150} />
  ))
  .addStory('Image Layout Fit', () => (
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
  ))
  .addStory('Image Fluid', () => (
    <>
      <div>
        <Image src="https://fabricweb.azureedge.net/fabric-website/placeholders/900x50.png" block />
      </div>
      <div>
        <Image src="https://fabricweb.azureedge.net/fabric-website/placeholders/100x100.png" block />
      </div>
    </>
  ))
  .addStory('Image Shadow', () => (
    <Image src="https://fabricweb.azureedge.net/fabric-website/placeholders/900x50.png" shadow />
  ));
