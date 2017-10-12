/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { ResizeGroup, OverflowSet, DefaultButton } from 'office-ui-fabric-react';

// tslint:disable-next-line:max-line-length
let list = { 'primary': [{ 'key': 'item0', 'name': 'Item 0', 'icon': 'Add', 'checked': false }, { 'key': 'item1', 'name': 'Item 1', 'icon': 'Share', 'checked': false }, { 'key': 'item2', 'name': 'Item 2', 'icon': 'Upload', 'checked': false }, { 'key': 'item3', 'name': 'Item 3', 'icon': 'Add', 'checked': false }, { 'key': 'item4', 'name': 'Item 4', 'icon': 'Share', 'checked': false }, { 'key': 'item5', 'name': 'Item 5', 'icon': 'Upload', 'checked': false }], 'overflow': [{ 'key': 'item6', 'name': 'Item 6', 'icon': 'Add', 'checked': false }, { 'key': 'item7', 'name': 'Item 7', 'icon': 'Share', 'checked': false }, { 'key': 'item8', 'name': 'Item 8', 'icon': 'Upload', 'checked': false }, { 'key': 'item9', 'name': 'Item 9', 'icon': 'Add', 'checked': false }, { 'key': 'item10', 'name': 'Item 10', 'icon': 'Share', 'checked': false }] };

let noop = () => null;

storiesOf('ResizeGroup', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={ new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .click('.OverflowButton')
        .hover('.OverflowButton')
        .snapshot('click overflow')
        .end()
      }
    >
      { story() }
    </Screener>
  )).add('Root', () => (
    <ResizeGroup
      data={ list }
      onReduceData={ noop }
      // tslint:disable-next-line:jsx-no-lambda
      onRenderData={ (data) => {
        return (
          <OverflowSet
            items={ data.primary }
            overflowItems={ data.overflow.length ? data.overflow : null }
            onRenderItem={ (item) => {
              return (
                <DefaultButton
                  text={ item.name }
                  iconProps={ { iconName: item.icon } }
                  onClick={ item.onClick }
                  checked={ item.checked }
                />
              );
            } }
            onRenderOverflowButton={ (overflowItems) => {
              return (
                <DefaultButton
                  className='OverflowButton'
                  menuProps={ { items: overflowItems! } }
                />
              );
            } }
          />
        );
      } }
    />
  ));