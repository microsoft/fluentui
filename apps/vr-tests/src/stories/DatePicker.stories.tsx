/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { DatePicker } from 'office-ui-fabric-react';

const date = new Date(2010, 1, 12);
storiesOf('DatePicker', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={ new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-DatePicker')
        .snapshot('hover datepicker', { cropTo: '.testWrapper' })
        .hover('.ms-DatePicker')
        .click('.ms-DatePicker')
        .snapshot('click', { cropTo: '.ms-Layer' })
        .hover('.ms-DatePicker-day')
        .snapshot('hover day', { cropTo: '.ms-Layer' })
        .hover('.ms-DatePicker-monthOption')
        .snapshot('hover month', { cropTo: '.ms-Layer' })
        .end()
      }
    >
      { story() }
    </Screener>
  ))
  .add('Root', () => (
    <DatePicker
      value={ date }
    />
  ))
  ;