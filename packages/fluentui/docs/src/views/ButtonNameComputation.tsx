import * as React from 'react';
import { Header, Table, AcceptIcon, CloseIcon } from '@fluentui/react-northstar';
import DocPage from '../components/DocPage';

const headerVisual = {
  items: ['Attributes', 'Sceen reader narrration'],
};

const acceptIconLabelled = <AcceptIcon alt="applied attribute" title="applied" />;
const closeIconLabelled = <CloseIcon alt="not applied attribute" title="not applied" />;

const header = {
  items: [
    'content',
    'title',
    'aria-label(AL)',
    'aria-labelledby (ALBY)',
    'aria-describedby (ADBY)',
    'NVDA',
    'JAWS',
    'VoiceOver',
  ],
};
const rows = [
  {
    key: 1,
    items: [
      acceptIconLabelled,
      closeIconLabelled,
      closeIconLabelled,
      closeIconLabelled,
      closeIconLabelled,
      '[content] button',
      '[content] button',
      '[content] button ',
    ],
  },
  {
    key: 2,
    items: [
      acceptIconLabelled,
      acceptIconLabelled,
      closeIconLabelled,
      closeIconLabelled,
      closeIconLabelled,
      '[content] button [title]',
      '[content] button [title]',
      '[content] button',
    ],
  },
  {
    key: 3,
    items: [
      acceptIconLabelled,
      acceptIconLabelled,
      acceptIconLabelled,
      closeIconLabelled,
      closeIconLabelled,
      '[AL] button [title]',
      '[AL] button [title]',
      '[AL] button [title]',
    ],
  },
  {
    key: 4,
    items: [
      acceptIconLabelled,
      acceptIconLabelled,
      acceptIconLabelled,
      acceptIconLabelled,
      closeIconLabelled,
      '[ALBY] button [title]',
      '[ALBY] button [title]',
      '[ALBY] button [title]',
    ],
  },
  {
    key: 5,
    items: [
      acceptIconLabelled,
      acceptIconLabelled,
      acceptIconLabelled,
      acceptIconLabelled,
      acceptIconLabelled,
      '[ALBY]  button [ADBY]',
      '[ALBY]  button [ADBY]',
      '[ALBY]  button [ADBY]',
    ],
  },
  {
    key: 6,
    items: [
      acceptIconLabelled,
      closeIconLabelled,
      acceptIconLabelled,
      closeIconLabelled,
      closeIconLabelled,
      '[AL] button',
      '[AL] button',
      '[AL] button',
    ],
  },
  {
    key: 7,
    items: [
      acceptIconLabelled,
      closeIconLabelled,
      acceptIconLabelled,
      acceptIconLabelled,
      closeIconLabelled,
      '[ALBY] button',
      '[ALBY] button',
      '[ALBY] button',
    ],
  },
  {
    key: 8,
    items: [
      acceptIconLabelled,
      closeIconLabelled,
      acceptIconLabelled,
      acceptIconLabelled,
      acceptIconLabelled,
      '[ALBY]  button [ADBY]',
      '[ALBY]  button [ADBY]',
      '[ALBY]  button [ADBY]',
    ],
  },
  {
    key: 9,
    items: [
      acceptIconLabelled,
      closeIconLabelled,
      closeIconLabelled,
      acceptIconLabelled,
      closeIconLabelled,
      '[ALBY] button',
      '[ALBY] button',
      '[ALBY] button',
    ],
  },
  {
    key: 10,
    items: [
      acceptIconLabelled,
      closeIconLabelled,
      closeIconLabelled,
      closeIconLabelled,
      acceptIconLabelled,
      '[content] button [ADBY]',
      '[content] button [ADBY]',
      '[content] button [ADBY]',
    ],
  },
  {
    key: 11,
    items: [
      closeIconLabelled,
      acceptIconLabelled,
      closeIconLabelled,
      closeIconLabelled,
      closeIconLabelled,
      '[title] button',
      '[title] button',
      '[title] button',
    ],
  },
];

const TableExampleStaticShorthand = () => (
  <DocPage title="Accessbility name computation">
    <Header as="h2">Button</Header>
    <Table header={headerVisual} aria-hidden="true" />
    <Table header={header} rows={rows} aria-label="Button accessibility name computation" />
  </DocPage>
);

export default TableExampleStaticShorthand;
