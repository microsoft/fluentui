/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecoratorTall } from '../utilities';
import { Breadcrumb } from 'office-ui-fabric-react';

const testWrapperClass = '.testWrapper';
const overflowButtonClass = '.ms-Crumb:nth-child(1)';
const longButtonClass = '.ms-Crumb:nth-child(2)';
const shortButtonClass = '.ms-Crumb:nth-child(3)';

storiesOf('Breadcrumb', module)
  .addDecorator(FabricDecoratorTall)
  .addDecorator(story => (
    <Screener
      steps={ new Screener.Steps()
        .snapshot('default', { cropTo: testWrapperClass })
        .hover(overflowButtonClass)
        .snapshot('hover', { cropTo: testWrapperClass })
        .click(overflowButtonClass) // opening the dropdown
        .hover(overflowButtonClass) // moving the mouse a bit to let dropdown open.
        .snapshot('click', { cropTo: testWrapperClass })
        .click(overflowButtonClass) // closing the dropdown
        .hover(longButtonClass)
        .snapshot('longTitleHover', { cropTo: testWrapperClass })
        .hover(shortButtonClass)
        .snapshot('shortTitleHover', { cropTo: testWrapperClass })
        .end()
      }
    >
      { story() }
    </Screener>
  ))
  .add('Root', () => (
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
  ));