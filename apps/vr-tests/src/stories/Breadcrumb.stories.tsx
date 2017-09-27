/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from './index';
import { Breadcrumb } from 'office-ui-fabric-react';

storiesOf('Breadcrumb', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={
        new Screener.Steps()
          .hover('.ms-Breadcrumb-overflowButton')
          .snapshot('hover')
          .click('.ms-Breadcrumb-overflowButton') // opening the dropdown
          .hover('.ms-Breadcrumb-overflowButton') // moving the mouse a bit to let dropdown open.
          .snapshot('click')
          .click('.ms-Breadcrumb-overflowButton') // closing the dropdown
          .hover('.ms-Breadcrumb-list li:nth-child(2)')
          .snapshot('longTitleHover')
          .hover('.ms-Breadcrumb-list li:nth-child(3)')
          .snapshot('shortTitleHover')
          .end()
      }
    >
      { story() }
    </Screener>
  ))
  .add('default', () => (
    <Breadcrumb
      items={ [
        { text: 'Files', 'key': 'Files', href: '#/examples/breadcrumb' },
        { text: 'This is link 1', 'key': 'l1', href: '#/examples/breadcrumb' },
        { text: 'This is link 2', 'key': 'l2', href: '#/examples/breadcrumb' },
        { text: 'This is link 3 with a long name', 'key': 'l3', href: '#/examples/breadcrumb' },
        { text: 'This is link 4', 'key': 'l4', href: '#/examples/breadcrumb' },
        { text: 'This is link 5', 'key': 'l5', href: '#/examples/breadcrumb', isCurrentItem: true },
      ] }
      maxDisplayedItems={ 3 }
      ariaLabel={ 'Website breadcrumb' }
    />
  ))