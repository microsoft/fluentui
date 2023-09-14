import * as React from 'react';
import { Dropdown } from '@fluentui/react-northstar';

const inputItems = Array.from(Array(24), (_, index) => index).map(h => `${h}:00`);

const getA11yStatusMessage = ({ isOpen, itemToString, previousResultCount, resultCount, selectedItem }) => {
  if (!isOpen) {
    return selectedItem ? itemToString(selectedItem) : '';
  }
  if (!resultCount) {
    return 'No results are available.';
  }
  if (resultCount !== previousResultCount) {
    return `${resultCount} result${
      resultCount === 1 ? ' is' : 's are'
    } available, use up and down arrow keys to navigate. Press Enter key to select or continue typing.`;
  }
  return '';
};

const DropdownExampleFreeform = () => {
  const [searchQuery, setSearchQuery] = React.useState('16:00');

  const handleSearchQueryChange = (e, data) => {
    setSearchQuery(data.searchQuery);
  };

  return (
    <>
      <span id="freeform-label">Start time</span>
      <Dropdown
        allowFreeform
        getA11yStatusMessage={getA11yStatusMessage}
        defaultHighlightedIndex={16}
        onSearchQueryChange={handleSearchQueryChange}
        searchQuery={searchQuery}
        search={() => inputItems}
        items={inputItems}
        aria-labelledby="freeform-label"
        noResultsMessage="We couldn't find any matches."
        getA11ySelectionMessage={{
          onAdd: item => `${item} has been selected.`,
        }}
      />
      <br />
      Selected value: {searchQuery}
    </>
  );
};

export default DropdownExampleFreeform;
