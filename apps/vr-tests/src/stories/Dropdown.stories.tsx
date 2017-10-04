/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { Dropdown, DropdownMenuItemType } from 'office-ui-fabric-react';

storiesOf('Dropdown', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={ new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-Dropdown')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .hover('.ms-Dropdown')
        .click('.ms-Dropdown')
        .snapshot('click', { cropTo: '.ms-Layer' })
        .end()
      }
    >
      { story() }
    </Screener>
  ))
  .add('Root', () => (
    <Dropdown
      placeHolder='Select an Option'
      label='Basic example:'
      ariaLabel='Basic dropdown example'
      options={
        [
          { key: 'Header', text: 'Actions', itemType: DropdownMenuItemType.Header },
          { key: 'A', text: 'Option a' },
          { key: 'B', text: 'Option b' },
          { key: 'divider_2', text: '-', itemType: DropdownMenuItemType.Divider },
          { key: 'Header2', text: 'People', itemType: DropdownMenuItemType.Header },
          { key: 'F', text: 'Option f' },
          { key: 'G', text: 'Option g' }
        ]
      }
    />
  ))
  .add('Disabled', () => (
    <Dropdown
      placeHolder='Select an Option'
      label='Basic example:'
      ariaLabel='Basic dropdown example'
      disabled
      options={
        [
          { key: 'Header', text: 'Actions', itemType: DropdownMenuItemType.Header },
          { key: 'A', text: 'Option a' },
          { key: 'B', text: 'Option b' },
          { key: 'divider_2', text: '-', itemType: DropdownMenuItemType.Divider },
          { key: 'Header2', text: 'People', itemType: DropdownMenuItemType.Header },
          { key: 'F', text: 'Option f' },
          { key: 'G', text: 'Option g' }
        ]
      }
    />
  ))
  .add('Multiselect', () => (
    <Dropdown
      placeHolder='Select options'
      label='Multi-Select example:'
      defaultSelectedKeys={ ['Orange'] }
      multiSelect
      options={
        [
          { key: 'Header2', text: 'Fruits', itemType: DropdownMenuItemType.Header },
          { key: 'Apple', text: 'apple' },
          { key: 'Banana', text: 'banana' },
          { key: 'Orange', text: 'orange' },
        ]
      }
    />
  ))
  ;