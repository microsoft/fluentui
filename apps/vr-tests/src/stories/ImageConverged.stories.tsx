import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Screener from 'screener-storybook/src/screener';
import { FluentProviderDecorator } from '../utilities/index';
import { Image } from '@fluentui/react-image';

const ScreenerWrapper = (story: () => React.ReactNode) => (
  <Screener steps={new Screener.Steps().snapshot('normal', { cropTo: '.testWrapper' }).end()}>
    {story()}
  </Screener>
);

const imageUrl =
  'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AmandaBrady.jpg';

storiesOf('react-image Image', module)
  .addDecorator(ScreenerWrapper)
  .addDecorator(FluentProviderDecorator)
  .addStory('Default', () => (
    <Image src="https://via.placeholder.com/300x300" alt="Placeholder image" />
  ))
  .addStory('Image Appearance Shape', () => (
    <>
      <div>
        <Image src={imageUrl} alt="Amanda's avatar default" height={200} width={200} />
      </div>
      <div>
        <Image src={imageUrl} alt="Amanda's avatar rounded" height={200} width={200} rounded />
      </div>
      <div>
        <Image src={imageUrl} alt="Amanda's avatar circular" height={200} width={200} circular />
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
          alt="Amanda's avatar boredered and rounded"
          height={150}
          width={150}
          bordered
          rounded
        />
      </div>
      <div>
        <Image
          src={imageUrl}
          alt="Amanda's avatar boredered and circular"
          height={150}
          width={150}
          bordered
          circular
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
          src="https://via.placeholder.com/600x200"
          alt="Placeholder for fit none"
          fit="none"
        />
      </div>
      <div style={{ height: 300, width: 400 }}>
        <Image
          src="https://via.placeholder.com/600x200"
          alt="Placeholder for fit center"
          fit="center"
        />
      </div>
      <div style={{ height: 300, width: 400 }}>
        <Image
          src="https://via.placeholder.com/600x200"
          alt="Placeholder for fit contain"
          fit="contain"
        />
      </div>
      <div style={{ height: 300, width: 400 }}>
        <Image
          src="https://via.placeholder.com/600x200"
          alt="Placeholder for fit cover"
          fit="cover"
        />
      </div>
    </>
  ))
  .addStory('Image Fluid', () => (
    <>
      <div>
        <Image src="https://via.placeholder.com/900x50" fluid />
      </div>
      <div>
        <Image src="https://via.placeholder.com/100x100" fluid />
      </div>
    </>
  ));
