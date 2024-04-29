import { gridCellMultipleFocusableBehavior, gridCellWithFocusableElementBehavior } from '@fluentui/accessibility';
import { Avatar, Button, Checkbox, Dropdown, Flex, Menu, MenuButton, Text, Table } from '@fluentui/react-northstar';
import * as React from 'react';
import chatProtoStyle from '.././chatPane/chatProtoStyle';
import { ComponentPrototype, PrototypeSection } from '../Prototypes';
import AdvancedTable, { stringCellComparator } from './AdvancedTable';
import InteractiveTable from './InteractiveTable';
import ResponsiveTableContainer from './ResponsiveTableContainer';
import { MoreIcon, BookmarkIcon } from '@fluentui/react-icons-northstar';
import SelectableTable from './SelectableTable';

function handleRowClick(index) {
  alert(`OnClick on the row ${index} executed.`);
}

const roleDropdown = {
  content: <Dropdown inline items={['Owner', 'Member']} defaultValue={'Owner'} />,
  truncateContent: false,
  accessibility: gridCellMultipleFocusableBehavior,
  onClick: e => e.stopPropagation(),
};

const tagButtons = {
  content: (
    <Flex gap="gap.small" vAlign="center">
      <Menu variables={{ horizontalPadding: '0.5rem 0.5rem' }} items={['tag 1', 'tag 2']} data-is-focusable={true} />
    </Flex>
  ),
  accessibility: gridCellMultipleFocusableBehavior,
};

const columnsMembers = [
  { title: 'Name', key: 'name', name: 'name' },
  { title: 'Title', key: 'title', name: 'title', cellComparator: stringCellComparator },
  { title: 'Location', key: 'location', name: 'location', cellComparator: stringCellComparator },
  { title: 'Tags', key: 'tags', name: 'tags' },
  { title: 'Role', key: 'role', name: 'roles' },
];

const rowsMembers = [
  {
    key: 1,
    items: [
      {
        content: (
          <Flex gap="gap.medium" vAlign="center">
            <Avatar name="Cecil Folk (Software Developer)" status="success" />
            <Text>Cecil Folk</Text>
          </Flex>
        ),
        key: '1-2',
      },
      { content: 'SOFTWARE DEVELOPER', key: '1-3' },
      { content: 'PRAGUE', key: '1-4' },
      { key: '1-5', ...tagButtons },
      { key: '1-6', ...roleDropdown },
    ],
    onClick: () => handleRowClick(1),
  },
  {
    key: 2,
    items: [
      {
        content: (
          <Flex gap="gap.medium" vAlign="center">
            <Avatar name="John Smith" status="success" />
            <Text>John Smith</Text>
          </Flex>
        ),
        key: '2-2',
      },
      { content: 'PROGRAM MANAGER', key: '2-3' },
      { content: 'PRAGUE', key: '2-4' },
      { key: '2-5', ...tagButtons },
      { key: '2-6', ...roleDropdown },
    ],
    onClick: () => handleRowClick(2),
  },
  {
    key: 3,
    items: [
      {
        content: (
          <Flex gap="gap.medium" vAlign="center">
            <Avatar name="Bruce Wayne" status="success" />
            <Text>Bruce Wayne</Text>
          </Flex>
        ),
        key: '3-1',
      },
      { content: 'BATMAN', key: '3-3' },
      { content: 'GOTHAM CITY', key: '3-4' },
      { key: '3-5' },
      { key: '3-6', ...roleDropdown },
    ],
    onClick: () => handleRowClick(3),
  },
];

const menuButton = (
  <MenuButton
    trigger={<Button tabIndex={-1} icon={<MoreIcon />} circular text iconOnly title="More options" />}
    menu={[
      '1',
      '2',
      '3',
      {
        content: 'submenu',
        menu: {
          items: ['4', '5'],
        },
      },
    ]}
    on="click"
  />
);

const moreOptionButton = {
  content: menuButton,
  truncateContent: true,
  key: '1-6',
  accessibility: gridCellWithFocusableElementBehavior,
};

const columnsChannels = [
  { key: 'Name', name: 'Name', title: 'Name' },
  { key: 'show-for-me', name: 'show-for-me', title: 'Show for me' },
  { key: 'show-for-members', name: 'show-for-members', title: 'Show for members' },
  {
    key: 'Description',
    name: 'Description',
    title: 'Description',
    cellComparator: stringCellComparator,
  },
  { key: 'Type', name: 'Type', title: 'Type', cellComparator: stringCellComparator },
  { key: 'Last activity', name: 'Last activity', title: 'Last activity' },
  { key: 'more-options', name: 'more-options', title: 'More options' },
];

const rowsChannels = [
  {
    key: 1,
    items: [
      { content: 'General', key: '1' },
      {
        content: <Checkbox title="Show for me" />,
        accessibility: gridCellWithFocusableElementBehavior,
        key: '2',
      },
      {
        content: <Checkbox title="Show for members" />,
        accessibility: gridCellWithFocusableElementBehavior,
        key: '3',
      },
      { content: 'Some description', key: '5' },
      { content: <BookmarkIcon title="Random icon" />, key: '6' },
      { content: 'yesterday', key: '7' },
      moreOptionButton,
    ],
  },
];

const columnsPerson = {
  items: ['id', 'Name', 'Age', 'Picture'],
};

const rowsPerson = [
  ['1', 'Roman van', '30 years', 'None'],
  ['2', 'Alex', '1 year', 'None'],
  ['3', 'Ali', '30000000000000 years', 'None'],
];

const responsiveColumnsConfig = [
  { priority: 4, minWidth: 200 },
  { priority: 3, minWidth: 360 },
  { priority: 2, minWidth: 300 },
  { priority: 1, minWidth: 200 },
];

const responsiveColumnsConfigPriorityOrder = [
  { priority: 3, minWidth: 200 },
  { priority: 2, minWidth: 360 },
  { priority: 1, minWidth: 300 },
  { priority: 4, minWidth: 200 },
];

export default () => (
  <PrototypeSection title="Advanced table">
    <ComponentPrototype title="Table example 1" description="Table with sorting, tags and dropdown menu in a cell">
      <AdvancedTable columns={columnsMembers} rows={rowsMembers} label="Channel members" />
    </ComponentPrototype>
    <ComponentPrototype title="Table example 2" description="Table with menu, checkboxes and Aria anouncements">
      <AdvancedTable columns={columnsChannels} rows={rowsChannels} label="Channels" />
      <div id="ariaLive" aria-live="polite" aria-atomic="true" style={chatProtoStyle.screenReaderContainerStyles} />
    </ComponentPrototype>
    <ComponentPrototype title="Table example 3" description="Table with popover and context menu ">
      <InteractiveTable />
    </ComponentPrototype>
    <ComponentPrototype
      title="Responsive Table"
      description="Responsive table hiding columns based in the priority passed to the Resposive Container as columns configurarion. The container can also receive a Breakpoint input with an array of number representing the breakpoints"
    >
      <ResponsiveTableContainer columns={responsiveColumnsConfig}>
        <Table rows={rowsPerson} header={columnsPerson} arial-label="Persons" />
      </ResponsiveTableContainer>
    </ComponentPrototype>
    <ComponentPrototype
      title="Responsive Table"
      description="Responsive table hiding middle columns keeping the first and the last"
    >
      <ResponsiveTableContainer columns={responsiveColumnsConfigPriorityOrder}>
        <Table rows={rowsPerson} header={columnsPerson} arial-label="Persons" />
      </ResponsiveTableContainer>
    </ComponentPrototype>
    <ComponentPrototype title="Selectable table" description="Table with rows that can be selected">
      <SelectableTable />
    </ComponentPrototype>
  </PrototypeSection>
);
