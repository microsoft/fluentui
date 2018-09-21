/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { Link, ILinkProps } from 'office-ui-fabric-react';

storiesOf('Link', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-Link')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .click('.ms-Link')
        .hover('.ms-Link')
        .snapshot('click', { cropTo: '.testWrapper' })
        .end()
      }
    >
      {story()}
    </Screener>
  ))
  .addStory('Root', () => (<Link href='#'>I'm a link</Link>), { rtl: true })
  .addStory('Disabled', () => (<Link href='#' disabled>I'm a disabled link</Link>))
  .addStory('No Href', () => (<Link>I'm rendered as a button because I have no href</Link>))
  .addStory('No Href Disabled', () => (<Link disabled>I'm rendered as a button because I have no href and am disabled</Link>));