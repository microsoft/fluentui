import { useBooleanKnob } from '@fluentui/docs-components';
import { Dropdown } from '@fluentui/react-northstar';
import * as React from 'react';

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

const DropdownExampleLoading = () => {
  const [loading] = useBooleanKnob({ name: 'loading', initialValue: true });

  return (
    <Dropdown
      loading={loading}
      loadingMessage="Loading..."
      multiple
      search
      items={inputItems}
      placeholder="Start typing a name"
      getA11yStatusMessage={({ resultCount, previousResultCount }) => {
        if (loading) {
          return 'loading results';
        }

        if (!resultCount) {
          return 'No results are available.';
        }
        if (resultCount !== previousResultCount) {
          return `${resultCount} result${
            resultCount === 1 ? ' is' : 's are'
          } available, use up and down arrow keys to navigate. Press Enter key to select.`;
        }
        return '';
      }}
    />
  );
};

export default DropdownExampleLoading;
