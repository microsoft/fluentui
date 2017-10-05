/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { Nav } from 'office-ui-fabric-react';

// tslint:disable:max-line-length
storiesOf('Nav', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={ new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-Nav-compositeLink')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .click('.ms-Nav-chevronButton')
        .hover('.ms-Nav-compositeLink')
        .snapshot('click', { cropTo: '.testWrapper' })
        .end()
      }
    >
      { story() }
    </Screener>
  ))
  .add('Root', () => (
    // tslint:disable-next-line:jsx-ban-props
    <div style={ { width: '208px' } }>
      <Nav
        groups={
          [
            {
              links:
              [
                {
                  name: 'Home',
                  url: 'http://example.com',
                  links: [{
                    name: 'Activity',
                    url: 'http://msn.com',
                    key: 'key1'
                  },
                  {
                    name: 'News',
                    url: 'http://msn.com',
                    key: 'key2'
                  }],
                  isExpanded: true
                },
                { name: 'Documents', url: 'http://example.com', key: 'key3' },
                { name: 'Pages', url: 'http://msn.com', key: 'key4' },
                { name: 'Notebook', url: 'http://msn.com', key: 'key5' },
                { name: 'Long Name Test for elipse', url: 'http://msn.com', key: 'key6' },
                {
                  name: 'Edit',
                  url: 'http://cnn.com',
                  icon: 'Edit',
                  key: 'key8'
                }
              ]
            }
          ]
        }
        expandedStateText={ 'expanded' }
        collapsedStateText={ 'collapsed' }
        selectedKey={ 'key3' }
      />
    </div>
  ));