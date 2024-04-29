import * as React from 'react';
import { Dropdown } from '@fluentui/react-northstar';

const getA11ySelectionMessage = {
  onAdd: item => `${item} has been selected.`,
  onRemove: item => `${item} has been removed.`,
};

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
    } available, use up and down arrow keys to navigate. Press Enter key to select.`;
  }
  return '';
};

const ThemeDropdown = ({ onChange, themeOptions, ...rest }) => {
  return (
    <Dropdown
      getA11yStatusMessage={getA11yStatusMessage}
      getA11ySelectionMessage={getA11ySelectionMessage}
      noResultsMessage="We couldn't find any matches."
      placeholder="Theme"
      onChange={onChange}
      items={themeOptions.map(({ text, value }) => ({ header: text, value }))}
      {...rest}
    />
  );
};

export default ThemeDropdown;
