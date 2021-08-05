import * as React from 'react';
import { Dropdown } from '@fluentui/react-northstar';

const inputItems = [
  {
    header: 'Robert Tolbert',
    image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobertTolbert.jpg',
    content: 'Software Engineer',
  },
  {
    header: 'Wanda Howard',
    image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/WandaHoward.jpg',
    content: 'UX Designer 2',
  },
  {
    header: 'Tim Deboer',
    image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/TimDeboer.jpg',
    content: 'Principal Software Engineering Manager',
  },
  {
    header: 'Amanda Brady',
    image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AmandaBrady.jpg',
    content: 'Technology Consultant',
  },
  {
    header: `Ashley McCarthy`,
    image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AshleyMcCarthy.jpg',
    content: 'Software Engineer 2',
  },
  {
    header: 'Cameron Evans',
    image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CameronEvans.jpg',
    content: 'Software Engineer 2',
  },
  {
    header: 'Carlos Slattery',
    image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CarlosSlattery.jpg',
    content: 'Senior Computer Scientist',
  },
  {
    header: 'Carole Poland',
    image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CarolePoland.jpg',
    content: 'Partner Software Engineer',
  },
  {
    header: 'Robin Counts',
    image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobinCounts.jpg',
    content: 'Graphic Designer',
  },
];

const DropdownExampleSearchMultipleImageAndContent = () => (
  <Dropdown
    multiple
    search
    items={inputItems}
    placeholder="Start typing a name"
    getA11ySelectionMessage={getA11ySelectionMessage}
    noResultsMessage="We couldn't find any matches."
    a11ySelectedItemsMessage="Press Delete or Backspace to remove"
  />
);

const getA11ySelectionMessage = {
  onAdd: item => `${item.header} selected. Press left or right arrow keys to navigate selected items.`,
  onRemove: item => `${item.header} has been removed.`,
};

export default DropdownExampleSearchMultipleImageAndContent;
