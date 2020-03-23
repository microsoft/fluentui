import * as React from 'react';
import { Dropdown, Header } from '@fluentui/react-northstar';

const inputItems = [
  'Bruce Wayne',
  'Natasha Romanoff',
  'Steven Strange',
  'Alfred Pennyworth',
  `Scarlett O'Hara`,
  'Imperator Furiosa',
  'Bruce Banner',
  'Peter Parker',
  'Selina Kyle',
];

const DropdownExampleInline = () => (
  <>
    <Header as="h3">Inline:</Header>
    <div>
      Some text inline with the <Dropdown inline items={inputItems} placeholder="Select your hero" /> and more text.
    </div>
    <Header as="h3">Inline Search:</Header>
    <span>
      Some other text inline with the{' '}
      <Dropdown
        inline
        search
        items={inputItems}
        noResultsMessage="We couldn't find any matches."
        placeholder="Start typing a name"
      />{' '}
      and more text.
    </span>
  </>
);

export default DropdownExampleInline;
