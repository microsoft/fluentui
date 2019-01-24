/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { Link } from 'office-ui-fabric-react';

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
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory(
    'Root',
    () => (
      <div className=".ms-Fabric--isFocusVisible">
        <Link href="#" styles={{ root: { fontSize: '14px' } }}>
          I'm a link
        </Link>
      </div>
    ),
    { rtl: true }
  )
  .addStory('Disabled', () => (
    <div className=".ms-Fabric--isFocusVisible">
      <Link href="#" disabled styles={{ root: { fontSize: '14px' } }}>
        I'm a disabled link
      </Link>
    </div>
  ))
  .addStory('No Href', () => (
    <div className=".ms-Fabric--isFocusVisible">
      <Link styles={{ root: { fontSize: '14px' } }}>
        I'm rendered as a button because I have no href
      </Link>
    </div>
  ))
  .addStory('No Href Disabled', () => (
    <div className=".ms-Fabric--isFocusVisible">
      <Link disabled styles={{ root: { fontSize: '14px' } }}>
        I'm rendered as a button because I have no href and am disabled
      </Link>
    </div>
  ));
