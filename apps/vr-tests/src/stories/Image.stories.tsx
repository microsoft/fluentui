import { storiesOf } from '@storybook/react';
import { Image, ImageFit, Label, Layer, IImageProps } from '@fluentui/react';
import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { TestWrapperDecorator } from '../utilities/index';

const img350x150 = 'http://fabricweb.azureedge.net/fabric-website/placeholders/350x150.png';

const imagePropsFitNone: IImageProps = {
  src: 'http://fabricweb.azureedge.net/fabric-website/placeholders/500x250.png',
  imageFit: ImageFit.none,
  width: 350,
  height: 150,
};

const imagePropsFitCenter: IImageProps = {
  src: 'http://fabricweb.azureedge.net/fabric-website/placeholders/800x300.png',
  imageFit: ImageFit.center,
  width: 350,
  height: 150,
};

const imagePropsFitContain: IImageProps = {
  src: 'http://fabricweb.azureedge.net/fabric-website/placeholders/700x300.png',
  imageFit: ImageFit.contain,
};

const imagePropsFitCover: IImageProps = {
  src: 'http://fabricweb.azureedge.net/fabric-website/placeholders/500x500.png',
  imageFit: ImageFit.cover,
};

const imagePropsFitCenterContain: IImageProps = {
  src: 'http://fabricweb.azureedge.net/fabric-website/placeholders/400x400.png',
  imageFit: ImageFit.centerContain,
};

const imagePropsFitCenterCover: IImageProps = {
  src: 'http://fabricweb.azureedge.net/fabric-website/placeholders/400x400.png',
  imageFit: ImageFit.centerCover,
};

const imagePropsMaximizeFrame: IImageProps = {
  src: 'http://fabricweb.azureedge.net/fabric-website/placeholders/500x500.png',
  imageFit: ImageFit.cover,
  maximizeFrame: true,
};

const border = 'solid 1px black';

storiesOf('Image', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story =>
    // prettier-ignore
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>,
  )
  .addStory('No fit, no w/h', () => (
    <div>
      <Label>
        Without a width or height specified, the frame remains at its natural size and the image
        will not be scaled.
      </Label>
      <Image src={img350x150} />
    </div>
  ))
  .addStory('No fit, only width', () => (
    <div>
      <Label>
        If only a width is provided, the frame will be set to that width. The image will scale
        proportionally to fill the available width.
      </Label>
      <Image src={img350x150} width={600} />
    </div>
  ))
  .addStory('No fit, only height', () => (
    <div>
      <Label>
        If only a height is provided, the frame will be set to that height. The image will scale
        proportionally to fill the available height.
      </Label>
      <Image src={img350x150} width={100} />
    </div>
  ))
  .addStory('Fit: none, image larger', () => (
    <div>
      <Label>
        The image is larger than the frame, so it is cropped to fit. The image is positioned at the
        upper left of the frame.
      </Label>
      <Image {...imagePropsFitNone} />
    </div>
  ))
  .addStory('Fit: none, image smaller', () => (
    <div>
      <Label>
        The image is smaller than the frame, so there is empty space within the frame. The image is
        positioned at the upper left of the frame.
      </Label>
      <Image
        {...imagePropsFitNone}
        src="http://fabricweb.azureedge.net/fabric-website/placeholders/100x100.png"
      />
    </div>
  ))
  .addStory('Fit: center, image larger', () => (
    <div>
      <Label>
        The image is larger than the frame, so all sides are cropped to center the image.
      </Label>
      <Image
        {...imagePropsFitCenter}
        src="http://fabricweb.azureedge.net/fabric-website/placeholders/800x300.png"
      />
    </div>
  ))
  .addStory('Fit: center, image smaller', () => (
    <div>
      <Label>
        The image is smaller than the frame, so there is empty space within the frame. The image is
        centered in the available space.
      </Label>
      <Image
        {...imagePropsFitCenter}
        src="http://fabricweb.azureedge.net/fabric-website/placeholders/100x100.png"
      />
    </div>
  ))
  .addStory('Fit: contain, image wider', () => (
    <div>
      <Label>
        The image has a wider aspect ratio (more landscape) than the frame, so the image is scaled
        to fit the width and centered in the available vertical space.
      </Label>
      <Image {...imagePropsFitContain} width={200} height={200} />
    </div>
  ))
  .addStory('Fit: contain, image taller', () => (
    <div>
      <Label>
        The image has a taller aspect ratio (more portrait) than the frame, so the image is scaled
        to fit the height and centered in the available horizontal space.
      </Label>
      <Image {...imagePropsFitContain} width={300} height={50} />
    </div>
  ))
  .addStory('Fit: cover, image wider', () => (
    <div>
      <Label>
        The image has a wider aspect ratio (more landscape) than the frame, so the image is scaled
        to fit the height and the sides are cropped evenly.
      </Label>
      <Image {...imagePropsFitCover} width={150} height={250} />
    </div>
  ))
  .addStory('Fit: cover, image taller', () => (
    <div>
      <Label>
        The image has a taller aspect ratio (more portrait) than the frame, so the image is scaled
        to fit the width and the top and bottom are cropped evenly.
      </Label>
      <Image {...imagePropsFitCover} width={250} height={150} />
    </div>
  ))
  .addStory('Fit: CenterContain, image smaller', () => (
    <div>
      <Label>
        The image is smaller than the frame, so the image is centered with empty space within the
        frame.
      </Label>
      <div style={{ width: 500, height: 500, border }}>
        <Image {...imagePropsFitCenterContain} width={500} height={500} />
      </div>
    </div>
  ))
  .addStory('Fit: CenterContain, image larger', () => (
    <div>
      <Label>The image is larger than the frame, so the image behaves as "contain".</Label>
      <div style={{ width: 350, height: 250, border }}>
        <Image {...imagePropsFitCenterContain} width={350} height={250} />
      </div>
    </div>
  ))
  .addStory('Fit: CenterContain, image wider', () => (
    <div>
      <Label>
        The image has a wider aspect ratio (more landscape) than the frame, so the image is
        contained.
      </Label>
      <div style={{ width: 300, height: 500, border }}>
        <Image {...imagePropsFitCenterContain} width={300} height={500} />
      </div>
    </div>
  ))
  .addStory('Fit: CenterContain, image taller', () => (
    <div>
      <Label>
        The image has a taller aspect ratio (more portrait) than the frame, so the image is
        contained.
      </Label>
      <div style={{ width: 500, height: 300, border }}>
        <Image {...imagePropsFitCenterContain} width={500} height={300} />
      </div>
    </div>
  ))
  .addStory('Fit: centerCover, image smaller', () => (
    <div>
      <Label>
        The image is smaller than the frame, so the image is centered with empty space within the
        frame.
      </Label>
      <div style={{ width: 500, height: 500, border }}>
        <Image {...imagePropsFitCenterCover} width={500} height={500} />
      </div>
    </div>
  ))
  .addStory('Fit: centerCover, image larger', () => (
    <div>
      <Label>The image is larger than the frame, so the image behaves as "cover".</Label>
      <div style={{ width: 350, height: 250, border }}>
        <Image {...imagePropsFitCenterCover} width={350} height={250} />
      </div>
    </div>
  ))
  .addStory('Fit: centerCover, image wider', () => (
    <div>
      <Label>
        The image has a wider aspect ratio (more landscape) than the frame, so the sides are cropped
        evenly.
      </Label>
      <div style={{ width: 300, height: 500, border }}>
        <Image {...imagePropsFitCenterCover} width={300} height={500} />
      </div>
    </div>
  ))
  .addStory('Fit: centerCover, image taller', () => (
    <div>
      <Label>
        The image has a taller aspect ratio (more portrait) than the frame, so the top and bottom
        are cropped evenly.
      </Label>
      <div style={{ width: 500, height: 300, border }}>
        <Image {...imagePropsFitCenterCover} width={500} height={300} />
      </div>
    </div>
  ))
  .addStory('Maximize frame, landscape container', () => (
    <div>
      <Label>The image is placed within a landscape container.</Label>
      <div style={{ width: '200px', height: '100px' }}>
        <Image {...imagePropsMaximizeFrame} />
      </div>
    </div>
  ))
  .addStory('Maximize frame, portrait container', () => <Layer>sdfsfdsf</Layer>);
