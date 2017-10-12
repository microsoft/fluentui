/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { Slider } from 'office-ui-fabric-react';

storiesOf('Slider', module)
  .addDecorator(story => (
    // tslint:disable:jsx-ban-props
    <div style={ { width: '300px', height: '200px', display: 'flex' } }>
      { story() }
    </div>
  ))
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={ new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-Slider-line')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .end()
      }
    >
      { story() }
    </Screener>
  )).add('Root', () => (
    <Slider
      label='Basic example:'
      min={ 1 }
      max={ 3 }
      step={ 1 }
      defaultValue={ 2 }
      showValue={ true }
    />
  ))
  .add('Disabled', () => (
    <Slider
      label='Basic example:'
      min={ 1 }
      max={ 3 }
      step={ 1 }
      defaultValue={ 2 }
      showValue={ true }
      disabled
    />
  )).add('Vertical', () => (
    <Slider
      label='Basic example:'
      min={ 1 }
      max={ 3 }
      step={ 1 }
      defaultValue={ 2 }
      showValue={ true }
      vertical={ true }
    />
  ));