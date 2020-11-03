import * as React from 'react';
import { Dropdown } from '@fluentui/react-northstar';

const inputItems = [
  {
    header: 'Bruce Wayne',
    image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/small/matt.jpg',
    content: 'Software Engineer',
  },
  {
    header: 'Natasha Romanoff',
    image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/small/jenny.jpg',
    content: 'UX Designer 2',
  },
  {
    header: 'Steven Strange',
    image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/small/joe.jpg',
    content: 'Principal Software Engineering Manager',
  },
  {
    header: 'Alfred Pennyworth',
    image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/small/justen.jpg',
    content: 'Technology Consultant',
  },
  {
    header: `Scarlett O'Hara`,
    image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/small/laura.jpg',
    content: 'Software Engineer 2',
  },
  {
    header: 'Imperator Furiosa',
    image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/small/veronika.jpg',
    content: 'Boss',
  },
  {
    header: 'Bruce Banner',
    image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/small/chris.jpg',
    content: 'Senior Computer Scientist',
  },
  {
    header: 'Peter Parker',
    image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/small/daniel.jpg',
    content: 'Partner Software Engineer',
  },
  {
    header: 'Selina Kyle',
    image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/small/ade.jpg',
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
