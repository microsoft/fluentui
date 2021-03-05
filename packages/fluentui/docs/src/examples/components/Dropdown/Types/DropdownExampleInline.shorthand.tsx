import * as React from 'react';
import { Dropdown, Header } from '@fluentui/react-northstar';

const inputItems = [
  'Robert Tolbert',
  'Wanda Howard',
  'Tim Deboer',
  'Amanda Brady',
  'Ashley McCarthy',
  'Cameron Evans',
  'Carlos Slattery',
  'Carole Poland',
  'Robin Counts',
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
