/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { Nav, INavLink } from 'office-ui-fabric-react/lib/Nav';
import { IconNames } from 'office-ui-fabric-react/lib/Icons';

const links: INavLink[] = [
  {
    name: 'Home',
    url: 'http://example.com',
    links: [
      {
        name: 'Activity',
        icon: IconNames.Upload,
        url: 'http://msn.com',
        key: 'key1'
      },
      {
        name: 'News',
        url: 'http://msn.com',
        key: 'key2'
      }
    ],
    isExpanded: true
  },
  {
    name: 'Documents',
    icon: IconNames.Accept,
    url: 'http://example.com',
    key: 'key3'
  },
  {
    name: 'Pages',
    url: 'http://msn.com',
    key: 'key4'
  },
  {
    name: 'Notebook',
    url: 'http://msn.com',
    key: 'key5'
  },
  {
    name: 'Long Name Test for elipse',
    url: 'http://msn.com',
    key: 'key6'
  },
  {
    name: 'Edit',
    url: 'http://cnn.com',
    icon: IconNames.Edit,
    key: 'key8'
  }
];

storiesOf('Nav', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-Nav-compositeLink')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .click('.ms-Nav-chevronButton')
        .hover('.ms-Nav-compositeLink')
        .snapshot('click', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory(
    'Root',
    () => (
      <div style={{ width: '208px' }}>
        <Nav
          groups={[{ links: links }]}
          expandedStateText={'expanded'}
          collapsedStateText={'collapsed'}
          selectedKey={'key3'}
        />
      </div>
    ),
    { rtl: true }
  );
