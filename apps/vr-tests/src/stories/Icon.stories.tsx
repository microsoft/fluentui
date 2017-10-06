/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { Icon, IconType } from 'office-ui-fabric-react';
import { TestImages } from '../common/TestImages';

storiesOf('Icon', module)
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
  )).add('Root', () => (
    <Icon iconName='CompassNW' />
  )).add('Color', () => (
    // tslint:disable-next-line:jsx-ban-props
    <Icon iconName={ 'CompassNW' } style={ { color: 'red' } } />
  )).add('Image', () => (
    <Icon
      iconName={ 'None' }
      iconType={ IconType.image }
      imageProps={ {
        src: TestImages.iconOne
      } }
    />
  ));