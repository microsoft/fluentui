/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import * as Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { DefaultButton } from 'office-ui-fabric-react';

storiesOf('Button', module)
  .addDecorator(story => (
    <Screener steps={ new Screener.Steps()
      .hover('button')
      .snapshot('hover')
      .click('button')
      .snapshot('active')
      .end()
    }>
      { story() }
    </Screener>
  ))
  .add('default', () => (<DefaultButton>Butjon</DefaultButton>))