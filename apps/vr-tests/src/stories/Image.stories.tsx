import { Image, ImageFit, Label, Layer, IImageProps } from '@fluentui/react';
import * as React from 'react';
import { Steps } from 'storywright';
import { StoryWrightDecorator, TestWrapperDecorator } from '../utilities';

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

export default {
  title: 'Image',

  decorators: [
    TestWrapperDecorator,
    StoryWrightDecorator(new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()),
  ],
};

export const NoFitNoWH = () => (
  <div>
    <Label>
      Without a width or height specified, the frame remains at its natural size and the image will
      not be scaled.
    </Label>
    <Image src={img350x150} />
  </div>
);

NoFitNoWH.storyName = 'No fit, no w/h';

export const NoFitOnlyWidth = () => (
  <div>
    <Label>
      If only a width is provided, the frame will be set to that width. The image will scale
      proportionally to fill the available width.
    </Label>
    <Image src={img350x150} width={600} />
  </div>
);

NoFitOnlyWidth.storyName = 'No fit, only width';

export const NoFitOnlyHeight = () => (
  <div>
    <Label>
      If only a height is provided, the frame will be set to that height. The image will scale
      proportionally to fill the available height.
    </Label>
    <Image src={img350x150} width={100} />
  </div>
);

NoFitOnlyHeight.storyName = 'No fit, only height';

export const FitNoneImageLarger = () => (
  <div>
    <Label>
      The image is larger than the frame, so it is cropped to fit. The image is positioned at the
      upper left of the frame.
    </Label>
    <Image {...imagePropsFitNone} />
  </div>
);

FitNoneImageLarger.storyName = 'Fit: none, image larger';

export const FitNoneImageSmaller = () => (
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
);

FitNoneImageSmaller.storyName = 'Fit: none, image smaller';

export const FitCenterImageLarger = () => (
  <div>
    <Label>The image is larger than the frame, so all sides are cropped to center the image.</Label>
    <Image
      {...imagePropsFitCenter}
      src="http://fabricweb.azureedge.net/fabric-website/placeholders/800x300.png"
    />
  </div>
);

FitCenterImageLarger.storyName = 'Fit: center, image larger';

export const FitCenterImageSmaller = () => (
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
);

FitCenterImageSmaller.storyName = 'Fit: center, image smaller';

export const FitContainImageWider = () => (
  <div>
    <Label>
      The image has a wider aspect ratio (more landscape) than the frame, so the image is scaled to
      fit the width and centered in the available vertical space.
    </Label>
    <Image {...imagePropsFitContain} width={200} height={200} />
  </div>
);

FitContainImageWider.storyName = 'Fit: contain, image wider';

export const FitContainImageTaller = () => (
  <div>
    <Label>
      The image has a taller aspect ratio (more portrait) than the frame, so the image is scaled to
      fit the height and centered in the available horizontal space.
    </Label>
    <Image {...imagePropsFitContain} width={300} height={50} />
  </div>
);

FitContainImageTaller.storyName = 'Fit: contain, image taller';

export const FitCoverImageWider = () => (
  <div>
    <Label>
      The image has a wider aspect ratio (more landscape) than the frame, so the image is scaled to
      fit the height and the sides are cropped evenly.
    </Label>
    <Image {...imagePropsFitCover} width={150} height={250} />
  </div>
);

FitCoverImageWider.storyName = 'Fit: cover, image wider';

export const FitCoverImageTaller = () => (
  <div>
    <Label>
      The image has a taller aspect ratio (more portrait) than the frame, so the image is scaled to
      fit the width and the top and bottom are cropped evenly.
    </Label>
    <Image {...imagePropsFitCover} width={250} height={150} />
  </div>
);

FitCoverImageTaller.storyName = 'Fit: cover, image taller';

export const FitCenterContainImageSmaller = () => (
  <div>
    <Label>
      The image is smaller than the frame, so the image is centered with empty space within the
      frame.
    </Label>
    <div style={{ width: 500, height: 500, border }}>
      <Image {...imagePropsFitCenterContain} width={500} height={500} />
    </div>
  </div>
);

FitCenterContainImageSmaller.storyName = 'Fit: CenterContain, image smaller';

export const FitCenterContainImageLarger = () => (
  <div>
    <Label>The image is larger than the frame, so the image behaves as "contain".</Label>
    <div style={{ width: 350, height: 250, border }}>
      <Image {...imagePropsFitCenterContain} width={350} height={250} />
    </div>
  </div>
);

FitCenterContainImageLarger.storyName = 'Fit: CenterContain, image larger';

export const FitCenterContainImageWider = () => (
  <div>
    <Label>
      The image has a wider aspect ratio (more landscape) than the frame, so the image is contained.
    </Label>
    <div style={{ width: 300, height: 500, border }}>
      <Image {...imagePropsFitCenterContain} width={300} height={500} />
    </div>
  </div>
);

FitCenterContainImageWider.storyName = 'Fit: CenterContain, image wider';

export const FitCenterContainImageTaller = () => (
  <div>
    <Label>
      The image has a taller aspect ratio (more portrait) than the frame, so the image is contained.
    </Label>
    <div style={{ width: 500, height: 300, border }}>
      <Image {...imagePropsFitCenterContain} width={500} height={300} />
    </div>
  </div>
);

FitCenterContainImageTaller.storyName = 'Fit: CenterContain, image taller';

export const FitCenterCoverImageSmaller = () => (
  <div>
    <Label>
      The image is smaller than the frame, so the image is centered with empty space within the
      frame.
    </Label>
    <div style={{ width: 500, height: 500, border }}>
      <Image {...imagePropsFitCenterCover} width={500} height={500} />
    </div>
  </div>
);

FitCenterCoverImageSmaller.storyName = 'Fit: centerCover, image smaller';

export const FitCenterCoverImageLarger = () => (
  <div>
    <Label>The image is larger than the frame, so the image behaves as "cover".</Label>
    <div style={{ width: 350, height: 250, border }}>
      <Image {...imagePropsFitCenterCover} width={350} height={250} />
    </div>
  </div>
);

FitCenterCoverImageLarger.storyName = 'Fit: centerCover, image larger';

export const FitCenterCoverImageWider = () => (
  <div>
    <Label>
      The image has a wider aspect ratio (more landscape) than the frame, so the sides are cropped
      evenly.
    </Label>
    <div style={{ width: 300, height: 500, border }}>
      <Image {...imagePropsFitCenterCover} width={300} height={500} />
    </div>
  </div>
);

FitCenterCoverImageWider.storyName = 'Fit: centerCover, image wider';

export const FitCenterCoverImageTaller = () => (
  <div>
    <Label>
      The image has a taller aspect ratio (more portrait) than the frame, so the top and bottom are
      cropped evenly.
    </Label>
    <div style={{ width: 500, height: 300, border }}>
      <Image {...imagePropsFitCenterCover} width={500} height={300} />
    </div>
  </div>
);

FitCenterCoverImageTaller.storyName = 'Fit: centerCover, image taller';

export const MaximizeFrameLandscapeContainer = () => (
  <div>
    <Label>The image is placed within a landscape container.</Label>
    <div style={{ width: '200px', height: '100px' }}>
      <Image {...imagePropsMaximizeFrame} />
    </div>
  </div>
);

MaximizeFrameLandscapeContainer.storyName = 'Maximize frame, landscape container';

export const MaximizeFramePortraitContainer = () => <Layer>sdfsfdsf</Layer>;

MaximizeFramePortraitContainer.storyName = 'Maximize frame, portrait container';
