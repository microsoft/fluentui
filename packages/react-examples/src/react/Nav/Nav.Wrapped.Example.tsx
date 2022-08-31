import * as React from 'react';
import { Nav, INavStyles, INavLinkGroup } from '@fluentui/react/lib/Nav';

const navStyles: Partial<INavStyles> = {
  root: {
    width: 208,
    height: 350,
    boxSizing: 'border-box',
    border: '1px solid #eee',
    overflowY: 'auto',
  },
  // these link styles override the default truncation behavior
  link: {
    whiteSpace: 'normal',
    lineHeight: 'inherit',
  },
};

// adding an empty title string to each link removes the tooltip;
// it's unnecessary now that the text wraps, and will not truncate
const navLinkGroups: INavLinkGroup[] = [
  {
    links: [
      {
        name: 'Home',
        url: 'http://example.com',
        expandAriaLabel: 'Expand Home section',
        title: '',
        links: [
          {
            name: 'Activity',
            url: 'http://msn.com',
            key: 'key1',
            target: '_blank',
            title: '',
          },
          {
            name: 'MSN',
            url: 'http://msn.com',
            disabled: true,
            key: 'key2',
            target: '_blank',
            title: '',
          },
        ],
        isExpanded: true,
      },
      {
        name: 'Shared Documents and Files',
        url: 'http://example.com',
        key: 'key3',
        target: '_blank',
        title: '',
      },
      {
        name: 'Pages',
        url: 'http://msn.com',
        key: 'key4',
        target: '_blank',
        title: '',
      },
      {
        name: 'Notebook',
        url: 'http://msn.com',
        key: 'key5',
        disabled: true,
        title: '',
      },
      {
        name: 'Communication and Media',
        url: 'http://msn.com',
        key: 'key6',
        target: '_blank',
        title: '',
      },
      {
        name: 'News',
        url: 'http://cnn.com',
        icon: 'News',
        key: 'key7',
        target: '_blank',
        title: '',
      },
    ],
  },
];

export const NavWrappedExample: React.FunctionComponent = () => {
  return (
    <Nav selectedKey="key6" ariaLabel="Nav example with wrapped link text" styles={navStyles} groups={navLinkGroups} />
  );
};
