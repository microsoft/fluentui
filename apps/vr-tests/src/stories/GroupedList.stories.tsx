import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecorator } from '../utilities/index';
import { GroupedList } from '@fluentui/react';

/* eslint-disable @fluentui/max-len */
const items = [
  {
    thumbnail: '//fabricweb.azureedge.net/fabric-website/placeholders/175x175.png',
    key: 'item-0 nostrud proident, id non',
    name: 'id velit labore ipsum magna',
    description:
      'dolor nostrud Ut ex dolore mollit veniam, Excepteur aute in magna sint ex sit occaecat non quis cupidatat sit esse',
    color: 'red',
    shape: 'circle',
    location: 'Los Angeles',
    width: 175,
    height: 175,
  },
  {
    thumbnail: '//fabricweb.azureedge.net/fabric-website/placeholders/229x229.png',
    key: 'item-1 in sunt sed eiusmod',
    name: 'in Duis dolor ex ut',
    description:
      'dolor amet, deserunt enim esse mollit ut amet, Excepteur fugiat ex ut amet, laborum ea cupidatat sunt aute quis occaecat dolore sunt cupidatat exercitation laborum aute consectetur laboris ullamco laborum tempor in exercitation dolor aute Lorem dolor minim',
    color: 'green',
    shape: 'circle',
    location: 'Seattle',
    width: 229,
    height: 229,
  },
  {
    thumbnail: '//fabricweb.azureedge.net/fabric-website/placeholders/195x195.png',
    key: 'item-2 consectetur ut dolor commodo',
    name: 'adipiscing fugiat officia sunt cillum',
    description:
      'adipiscing veniam, ea enim pariatur. fugiat quis dolor dolor deserunt Lorem enim veniam, est exercitation reprehenderit minim dolore consectetur dolore ea occaecat culpa consectetur tempor reprehenderit dolore ut sint minim cillum sunt in in ex ad do esse dolore tempor',
    color: 'blue',
    shape: 'square',
    location: 'New York',
    width: 195,
    height: 195,
  },
  {
    thumbnail: '//fabricweb.azureedge.net/fabric-website/placeholders/208x208.png',
    key: 'item-3 pariatur. id qui voluptate',
    name: 'eu ullamco et commodo aliqua.',
    description:
      'laborum nostrud nulla dolore occaecat ut et proident, sed cillum officia ea ea proident, occaecat quis occaecat officia aute non officia esse dolor proident, ad mollit ut in dolor non ipsum adipiscing eiusmod culpa ea in ea dolor ipsum ipsum eu consequat. voluptate fugiat veniam, amet,',
    color: 'red',
    shape: 'triangle',
    location: 'Los Angeles',
    width: 208,
    height: 208,
  },
];

const groups = [
  {
    count: 4,
    key: 'group0',
    name: 'group 0',
    startIndex: 0,
    level: 0,
    children: [
      { count: 2, key: 'group0-0', name: 'group 0-0', startIndex: 0, level: 1, children: [] },
      { count: 2, key: 'group0-1', name: 'group 0-1', startIndex: 2, level: 1, children: [] },
    ],
  },
  {
    count: 4,
    key: 'group1',
    name: 'group 1',
    startIndex: 4,
    level: 0,
    children: [
      { count: 2, key: 'group1-0', name: 'group 1-0', startIndex: 4, level: 1, children: [] },
      { count: 2, key: 'group1-1', name: 'group 1-1', startIndex: 6, level: 1, children: [] },
    ],
  },
];

const onRenderCell = (nestingDepth: number, item: any, itemIndex: number) => {
  return <div>{item.name}</div>;
};

storiesOf('GroupedList', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story => (
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-GroupHeader-expand')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .click('.ms-GroupHeader-expand')
        .hover('.ms-GroupHeader-expand')
        .snapshot('click', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </StoryWright>
  ))
  .addStory(
    'Root',
    () => (
      <GroupedList
        groups={groups}
        items={items}
        onRenderCell={onRenderCell}
        styles={{ root: { color: '#333333' } }}
      />
    ),
    { includeRtl: true },
  );
