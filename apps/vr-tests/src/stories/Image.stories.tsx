/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { Image, ImageFit, Label, Layer } from 'office-ui-fabric-react';

import './Image.css';

const img350x150 = 'http://placehold.it/350x150';

let imagePropsFitNone = {
  src: 'http://placehold.it/500x250',
  imageFit: ImageFit.none,
  width: 350,
  height: 150
};

let imagePropsFitCenter = {
  src: 'http://placehold.it/800x300',
  imageFit: ImageFit.center,
  width: 350,
  height: 150
};

let imagePropsFitContain = {
  src: 'http://placehold.it/700x300',
  imageFit: ImageFit.contain
};

let imagePropsFitCover = {
  src: 'http://placehold.it/500x500',
  imageFit: ImageFit.cover
};

let imagePropsMaximizeFrame = {
  src: 'http://placehold.it/500x500',
  imageFit: ImageFit.cover,
  maximizeFrame: true
};

// tslint:disable:jsx-ban-props

storiesOf('Image', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={ new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .end()
      }
    >
      { story() }
    </Screener>
  ))
  .add('No fit, no w/h', () => (
    <div>
      <Label>Without a width or height specified, the frame remains at its natural size and the image will not be scaled.</Label>
      <Image src={ img350x150 } />
    </div>
  ))
  .add('No fit, only width', () => (
    <div>
      <Label>If only a width is provided, the frame will be set to that width.
      The image will scale proportionally to fill the available width.</Label>
      <Image src={ img350x150 } width={ 600 } />
    </div>
  ))
  .add('No fit, only heght', () => (
    <div>
      <Label>If only a height is provided, the frame will be set to that height.
        The image will scale proportionally to fill the available height.</Label>
      <Image src={ img350x150 } width={ 100 } />
    </div>
  ))
  .add('Fit: none, image larger', () => (
    <div>
      <Label>The image is larger than the frame, so it is cropped to fit. The image is positioned at the upper left of the frame.</Label>
      <Image  { ...imagePropsFitNone } />
    </div>
  ))
  .add('Fit: none, image smaller', () => (
    <div>
      <Label>The image is smaller than the frame, so there is empty space within the frame.
        The image is positioned at the upper left of the frame.</Label>
      <Image  { ...imagePropsFitNone } src='http://placehold.it/100x100' />
    </div>
  ))
  .add('Fit: center, image larger', () => (
    <div>
      <Label>The image is larger than the frame, so all sides are cropped to center the image.</Label>
      <Image  { ...imagePropsFitCenter } src='http://placehold.it/800x300' />
    </div>
  ))
  .add('Fit: center, image smaller', () => (
    <div>
      <Label>The image is smaller than the frame, so there is empty space within the frame.
            The image is centered in the available space.</Label>
      <Image  { ...imagePropsFitCenter } src='http://placehold.it/100x100' />
    </div>
  ))
  .add('Fit: contain, image wider', () => (
    <div>
      <Label>The image has a wider aspect ratio (more landscape) than the frame,
              so the image is scaled to fit the width and centered in the available vertical space.</Label>
      <Image { ...imagePropsFitContain } width={ 200 } height={ 200 } />
    </div>
  ))
  .add('Fit: contain, image taller', () => (
    <div>
      <Label>The image has a taller aspect ratio (more portrait) than the frame,
                so the image is scaled to fit the height and centered in the available horizontal space.</Label>
      <Image { ...imagePropsFitContain } width={ 300 } height={ 50 } />
    </div>
  ))
  .add('Fit: cover, image wider', () => (
    <div>
      <Label>The image has a wider aspect ratio (more landscape) than the frame,
          so the image is scaled to fit the height and the sides are cropped evenly.</Label>
      <Image { ...imagePropsFitCover } width={ 150 } height={ 250 } />
    </div>
  ))
  .add('Fit: cover, image taller', () => (
    <div>
      <Label>The image has a taller aspect ratio (more portrait) than the frame,
            so the image is scaled to fit the width and the top and bottom are cropped evenly.</Label>
      <Image { ...imagePropsFitCover } width={ 250 } height={ 150 } />
    </div>
  ))
  .add('Maximize frame, landscape container', () => (
    <div>
      <Label>The image is placed within a landscape container.</Label>
      <div style={ { width: '200px', height: '100px' } }>
        <Image { ...imagePropsMaximizeFrame } />
      </div>
    </div>
  ))
  .add('Maximize frame, portrait container', () => (
    <Layer>sdfsfdsf</Layer>
  ))
  ;