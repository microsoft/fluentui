import * as React from 'react';
import { Nav, INavStyles, INavLinkGroup } from '@fluentui/react/lib/Nav';

const navStyles: Partial<INavStyles> = { root: { width: 300 } };

const navLinkGroups: INavLinkGroup[] = [
  {
    name: 'Basic components',
    expandAriaLabel: 'Show more Basic components',
    links: [
      {
        key: 'ActivityItem',
        name: 'ActivityItem',
        url: '#/examples/activityitem',
      },
      {
        key: 'Breadcrumb',
        name: 'Breadcrumb',
        url: '#/examples/breadcrumb',
      },
      {
        key: 'Button',
        name: 'Button',
        url: '#/examples/button',
      },
    ],
  },
  {
    name: 'Extended components',
    expandAriaLabel: 'Show more Extended components',
    links: [
      {
        key: 'ColorPicker',
        name: 'ColorPicker',
        url: '#/examples/colorpicker',
      },
      {
        key: 'ExtendedPeoplePicker',
        name: 'ExtendedPeoplePicker',
        url: '#/examples/extendedpeoplepicker',
      },
      {
        key: 'GroupedList',
        name: 'GroupedList',
        url: '#/examples/groupedlist',
      },
    ],
  },
  {
    name: 'Utilities',
    expandAriaLabel: 'Show more Utilities',
    links: [
      {
        key: 'FocusTrapZone',
        name: 'FocusTrapZone',
        url: '#/examples/focustrapzone',
      },
      {
        key: 'FocusZone',
        name: 'FocusZone',
        url: '#/examples/focuszone',
      },
      {
        key: 'MarqueeSelection',
        name: 'MarqueeSelection',
        url: '#/examples/marqueeselection',
      },
    ],
  },
];

export const NavFabricDemoAppExample: React.FunctionComponent = () => {
  return (
    <Nav styles={navStyles} ariaLabel="Nav example similar to one found in this demo page" groups={navLinkGroups} />
  );
};
