import * as React from 'react';
import { Dropdown } from '@fluentui/react-northstar';

const generateItems = (searchQuery = 'default'): string[] => {
  const items = [];

  for (let i = 0; i < 10; i++) {
    items.push(`${searchQuery}-item-${i}`);
  }

  return items;
};

const DropdownExampleSearch = () => {
  const [inputItems, setInputItems] = React.useState(generateItems());
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [externalSearch, setExternalSearch] = React.useState(false);
  const externalSearchItem = 'search externally';

  return (
    <Dropdown
      search={(filteredItemsByValue: string[], searchQuery: string) => {
        const result = filteredItemsByValue.filter(
          item => item.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1,
        );
        if (result.length === 0) {
          return [externalSearchItem];
        }
        return result;
      }}
      loading={loading}
      value={value}
      highlightFirstItemOnOpen={true}
      open={open}
      loadingMessage="Loading..."
      searchQuery={searchQuery}
      onOpenChange={(e, { open, value }) => {
        if (value && value === externalSearchItem) {
          return;
        }
        setOpen(open);
      }}
      items={externalSearch ? [externalSearchItem] : inputItems}
      placeholder="Start typing ..."
      onChange={(e, { value }) => {
        if (value === externalSearchItem) {
          setLoading(true);
          setInputItems([]);
          setOpen(true);
          setValue(null);
          setTimeout(() => {
            setInputItems(generateItems(searchQuery));
            setLoading(false);
            setExternalSearch(false);
          }, 2000);
        } else {
          setValue(value);
        }
      }}
      onSearchQueryChange={(e, { searchQuery }) => {
        setExternalSearch(inputItems.filter(item => item.startsWith(searchQuery)).length === 0);
        searchQuery !== externalSearchItem && setSearchQuery(searchQuery);
      }}
      noResultsMessage="We couldn't find any matches."
      headerMessage={externalSearch ? "We couldn't find any matches, but you can search externally!" : undefined}
      getA11yStatusMessage={({ resultCount, previousResultCount }) => {
        if (loading) {
          return 'loading results';
        }

        if (externalSearch) {
          return 'no results, but you can search externally';
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
      getA11ySelectionMessage={{
        onAdd: item => (item === externalSearchItem ? 'loading external results' : `${item} has been selected.`),
      }}
    />
  );
};
export default DropdownExampleSearch;
