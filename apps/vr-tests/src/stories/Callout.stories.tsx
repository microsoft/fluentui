/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecoratorTall } from '../utilities';
import { Callout, Link, DirectionalHint } from 'office-ui-fabric-react';

let targetElement = document.getElementById('button') as HTMLElement;

storiesOf('Callout', module)
  .addDecorator(FabricDecoratorTall)
  .addDecorator(story => (
    // tslint:disable-next-line:jsx-ban-props
    <div>
      <button id='button'>Hey</button>
      { story() }
    </div>
  ))
  .addDecorator(story => (
    <Screener
      steps={ new Screener.Steps()
        .snapshot('default', { cropTo: '.ms-Layer' })
      }
    >
      { story() }
    </Screener>
  ))
  .add('Root', () => (
    <Callout
      gapSpace={ 10 }
      targetElement={ targetElement }
    >
      <p className='ms-CalloutExample-subText' id={ 'callout-description-1' }>
        Message body is optional. If help documentation is available, consider adding a link to learn more at the bottom.
        </p>
      <Link className='ms-CalloutExample-link' href='http://microsoft.com'>Go to microsoft</Link>
    </Callout>));