import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecorator } from '../utilities/index';
import { List } from '@fluentui/react';

/* eslint-disable @fluentui/max-len */
const items = [
  {
    thumbnail: '//fabricweb.azureedge.net/fabric-website/placeholders/233x233.png',
    key: 'item-0 sit Lorem culpa cillum',
    name: 'reprehenderit dolore nulla laborum officia',
    description:
      'et laborum Excepteur et sit esse culpa elit, ad elit, dolore tempor non incididunt incididunt Ut laboris adipiscing voluptate Ut laboris in dolore velit sunt tempor ex pariatur. irure laborum consectetur laborum',
    color: 'green',
    shape: 'triangle',
    location: 'Los Angeles',
    width: 233,
    height: 233,
  },
  {
    thumbnail: '//fabricweb.azureedge.net/fabric-website/placeholders/210x210.png',
    key: 'item-1 dolor elit, sit mollit',
    name: 'consectetur ipsum tempor nostrud commodo',
    description:
      'minim occaecat nisi enim quis deserunt consectetur nostrud ut pariatur. ut nisi velit dolor pariatur. tempor officia aliqua. labore minim est cillum velit ut fugiat',
    color: 'yellow',
    shape: 'triangle',
    location: 'Los Angeles',
    width: 210,
    height: 210,
  },
  {
    thumbnail: '//fabricweb.azureedge.net/fabric-website/placeholders/231x231.png',
    key: 'item-2 dolor reprehenderit id sint',
    name: 'velit nisi aliquip do minim',
    description:
      'velit dolor aliquip eiusmod voluptate esse occaecat in mollit ut ex ad cillum in quis ad fugiat ullamco in cillum in non culpa in cupidatat non do dolore Ut',
    color: 'blue',
    shape: 'circle',
    location: 'Chicago',
    width: 231,
    height: 231,
  },
  {
    thumbnail: '//fabricweb.azureedge.net/fabric-website/placeholders/158x158.png',
    key: 'item-3 magna Ut nisi dolor',
    name: 'nostrud in reprehenderit eu anim',
    description:
      'nisi eu et in exercitation ut consectetur veniam, ut sunt ut commodo ad laboris sit culpa aliquip',
    color: 'green',
    shape: 'circle',
    location: 'Seattle',
    width: 158,
    height: 158,
  },
  {
    thumbnail: '//fabricweb.azureedge.net/fabric-website/placeholders/165x165.png',
    key: 'item-4 nisi proident, in dolore',
    name: 'nostrud Duis aliquip Lorem sunt',
    description:
      'ullamco qui sunt labore proident, occaecat Lorem pariatur. occaecat Ut incididunt officia mollit aliqua. tempor nostrud sed adipiscing enim qui do sit aliquip voluptate cupidatat non occaecat ullamco laborum',
    color: 'red',
    shape: 'triangle',
    location: 'Portland',
    width: 165,
    height: 165,
  },
  {
    thumbnail: '//fabricweb.azureedge.net/fabric-website/placeholders/226x226.png',
    key: 'item-5 mollit elit, ex elit,',
    name: 'nulla ipsum esse Lorem sed',
    description:
      'dolor deserunt in labore in adipiscing ex consequat. aliquip in do qui in minim cillum aute in ex officia aute ipsum non minim labore nisi elit, magna dolor sint irure nisi aliquip consectetur quis esse mollit ut voluptate officia et adipiscing irure aute irure non Excepteur ut ex ut voluptate nostrud laboris aliquip pariatur. dolore laboris sint Duis',
    color: 'green',
    shape: 'triangle',
    location: 'New York',
    width: 226,
    height: 226,
  },
  {
    thumbnail: '//fabricweb.azureedge.net/fabric-website/placeholders/182x182.png',
    key: 'item-6 ut irure dolor et',
    name: 'nulla consectetur eiusmod velit sed',
    description:
      'dolor in nulla laboris in tempor ut ea cupidatat laboris qui dolor labore ut consectetur labore tempor fugiat irure tempor consectetur nisi culpa officia non',
    color: 'green',
    shape: 'circle',
    location: 'Los Angeles',
    width: 182,
    height: 182,
  },
  {
    thumbnail: '//fabricweb.azureedge.net/fabric-website/placeholders/206x206.png',
    key: 'item-7 non ad consequat. mollit',
    name: 'sint quis in Excepteur enim',
    description:
      'et Ut ad dolor exercitation occaecat fugiat nulla mollit cillum voluptate consectetur irure ipsum ut ea dolore eiusmod occaecat in culpa sint aute voluptate minim aliqua. incididunt voluptate magna officia Excepteur anim laboris et aliquip ut irure nostrud enim in mollit voluptate sint ipsum sit commodo commodo sint nulla',
    color: 'green',
    shape: 'square',
    location: 'Seattle',
    width: 206,
    height: 206,
  },
  {
    thumbnail: '//fabricweb.azureedge.net/fabric-website/placeholders/240x240.png',
    key: 'item-8 enim et aliqua. enim',
    name: 'in commodo dolore ea Duis',
    description:
      'elit, deserunt in ut adipiscing aliquip in laboris nostrud enim aliquip exercitation aute tempor velit fugiat dolor mollit aliqua. sint et Excepteur non voluptate laborum exercitation incididunt enim dolor labore labore aliqua. anim est nulla esse occaecat aliqua. Ut',
    color: 'yellow',
    shape: 'square',
    location: 'Chicago',
    width: 240,
    height: 240,
  },
  {
    thumbnail: '//fabricweb.azureedge.net/fabric-website/placeholders/158x158.png',
    key: 'item-9 reprehenderit minim cillum do',
    name: 'dolore et sed dolore sed',
    description:
      'fugiat adipiscing sed consectetur sunt cupidatat laborum ex ea dolore et dolor nostrud minim anim do sint esse officia ea aliquip Excepteur et Ut aliquip elit, pariatur. consectetur elit, aliquip occaecat consequat. qui deserunt commodo occaecat cupidatat Ut Ut culpa veniam, quis voluptate reprehenderit in qui sit',
    color: 'yellow',
    shape: 'circle',
    location: 'New York',
    width: 158,
    height: 158,
  },
];

const onRenderCell = (item: any) => <div>{item.name}</div>;

storiesOf('List', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story =>
    // prettier-ignore
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </StoryWright>,
  )
  .addStory('Root', () => <List items={items} onRenderCell={onRenderCell} />, { includeRtl: true });
