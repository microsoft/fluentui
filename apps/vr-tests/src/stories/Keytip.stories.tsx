/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { Keytip } from 'office-ui-fabric-react';

storiesOf('Keytip', module)
  .addDecorator(story => (
    <div style={ { width: '50px', height: '50px' } }>
      <span data-ktp-target={ 'ktp-a' } />
      { story() }
    </div>
  ))
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
  .add('Root', () => (<Keytip content={ 'A' } keySequences={ ['a'] } visible={ true } />))
  .add('Disabled', () => (<Keytip content={ 'A' } keySequences={ ['a'] } visible={ true } disabled={ true } />));