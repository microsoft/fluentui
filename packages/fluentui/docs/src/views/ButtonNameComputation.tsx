import * as React from 'react';
import { Header, Table, AcceptIcon, CloseIcon, ArrowRightIcon } from '@fluentui/react-northstar';
import DocPage from '../components/DocPage';

const acceptIconLabelled = <AcceptIcon alt="applied attribute" title="applied" />;
const closeIconLabelled = <CloseIcon alt="not applied attribute" title="not applied" />;
const styleForEmptyColumn = { display: 'contents' };
const emptyCell = { styles: styleForEmptyColumn, 'aria-hidden': 'true' };

const header = {
  items: [
    'content',
    'title',
    'aria-label(AL)',
    'aria-labelledby (ALBY)',
    'aria-describedby (ADBY)',
    { content: <ArrowRightIcon size="large" />, styles: styleForEmptyColumn, 'aria-hidden': 'true' },
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
      emptyCell,
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
      emptyCell,
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
      emptyCell,
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
      emptyCell,
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
      emptyCell,
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
      emptyCell,
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
      emptyCell,
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
      emptyCell,
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
      emptyCell,
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
      emptyCell,
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
      emptyCell,
      '[title] button',
      '[title] button',
      '[title] button',
    ],
  },
  {
    key: 12,
    items: [
      closeIconLabelled,
      acceptIconLabelled,
      acceptIconLabelled,
      closeIconLabelled,
      closeIconLabelled,
      emptyCell,
      '[AL] button [title]',
      '[AL] button [title]',
      '[AL] button [title]',
    ],
  },
  {
    key: 13,
    items: [
      closeIconLabelled,
      acceptIconLabelled,
      acceptIconLabelled,
      acceptIconLabelled,
      closeIconLabelled,
      emptyCell,
      '[ALBY] button [title]',
      '[ALBY] button [title]',
      '[ALBY] button [title]',
    ],
  },
  {
    key: 14,
    items: [
      closeIconLabelled,
      acceptIconLabelled,
      acceptIconLabelled,
      acceptIconLabelled,
      acceptIconLabelled,
      emptyCell,
      '[ALBY] button [ADBY]',
      '[ALBY] button [ADBY]',
      '[ALBY] button [ADBY]',
    ],
  },
  {
    key: 15,
    items: [
      closeIconLabelled,
      closeIconLabelled,
      acceptIconLabelled,
      acceptIconLabelled,
      closeIconLabelled,
      emptyCell,
      '[ALBY] button',
      '[ALBY] button',
      '[ALBY] button',
    ],
  },
  {
    key: 16,
    items: [
      closeIconLabelled,
      closeIconLabelled,
      acceptIconLabelled,
      acceptIconLabelled,
      acceptIconLabelled,
      emptyCell,
      '[ALBY] button [ADBY]',
      '[ALBY] button [ADBY]',
      '[ALBY] button [ADBY]',
    ],
  },
  {
    key: 17,
    items: [
      closeIconLabelled,
      acceptIconLabelled,
      closeIconLabelled,
      acceptIconLabelled,
      closeIconLabelled,
      emptyCell,
      '[ALBY] button [title]',
      '[ALBY] button [title]',
      '[ALBY] button [title]',
    ],
  },
];

const TableExampleStaticShorthand = () => (
  <DocPage title="Accessbility name computation">
    <Header as="h2">Button accessibility name computation based on used attributes</Header>
    <p>
      In the table below on the left side is group of the attributes which can be used for button labelling. On the
      right side are results how particular screen reader narrates used attributes.
    </p>
    <p>
      Icon {acceptIconLabelled} means that attribute is used for name computation. Icon {closeIconLabelled} means that
      attribute is not used for name computation.
    </p>
    <p>Be aware 'button' is the role which reader narrate.</p>
    {/* <Table header={headerVisual} aria-hidden="true" /> */}
    <Table
      styles={{ '& .ui-table__row:nth-child(even)': { background: 'aliceblue' } }}
      header={header}
      rows={rows}
      aria-label="Button accessibility name computation"
    />
  </DocPage>
);

export default TableExampleStaticShorthand;
