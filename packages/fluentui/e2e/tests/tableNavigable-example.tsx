import {
  Table,
  Button,
  Flex,
  MenuButton,
  Ref,
  tableRowClassName,
  tableCellClassName,
  buttonClassName,
  tableSlotClassNames,
} from '@fluentui/react-northstar';
import {
  gridNestedBehavior,
  gridCellWithFocusableElementBehavior,
  gridCellMultipleFocusableBehavior,
} from '@fluentui/accessibility';
import * as React from 'react';

export const selectors = {
  buttonClassName,
  tableHeaderClass: tableSlotClassNames.header,
  row: tableRowClassName,
  cell: tableCellClassName,
  beforeTableId: 'before-table',
  afterTableId: 'after-table',
  moreOptionsButtonId: 'more-options',
  rowOnclickTestId: 'row-onclick',
  buttonInCellOnclickTestId: 'button-in-cell-onlick',
};

const rowOnclickTestRef = React.createRef<HTMLButtonElement>();
const buttonInCellOnclickTestRef = React.createRef<HTMLButtonElement>();

function handleRowClick(index) {
  rowOnclickTestRef.current.focus();
}

const header = {
  key: 'header',
  items: [
    { content: 'id', key: 'id' },
    { content: 'Name', key: 'name' },
    { content: 'Picture', key: 'pic' },
    { content: 'Age', key: 'action' },
    { content: 'Tags', key: 'tags' },
    { key: 'more options', 'aria-label': 'options' },
  ],
};

const moreOptionCell = {
  content: <Button tabIndex={-1} icon="more" circular text iconOnly title="More options" />,
  truncateContent: true,
  accessibility: gridCellWithFocusableElementBehavior,
  onClick: e => {
    buttonInCellOnclickTestRef.current.focus();
    e.stopPropagation();
  },
};

const moreActionCell = {
  content: (
    <Flex gap="gap.small" vAlign="center">
      <Button size="small" content="tag 1" />
      <Button size="small" content="tag 2" />
    </Flex>
  ),
  accessibility: gridCellMultipleFocusableBehavior,
};

const contextMenuItems = ['Add to selection', 'Remove', 'Download'];

const rowsPlain = [
  {
    key: 1,
    items: [
      { content: '1', key: '1-1' },
      { content: 'Roman van von der Longername', key: '1-2', id: 'name-1' },
      { content: 'None', key: '1-3' },
      { content: '30 years', key: '1-4', id: 'age-1' },
      { key: '1-5', ...moreActionCell },
      { key: '1-6', ...moreOptionCell },
    ],
    onClick: () => handleRowClick(1),
    'aria-labelledby': 'name-1 age-1',
    children: (Component, { key, ...rest }) => (
      <MenuButton menu={contextMenuItems} key={key} contextMenu trigger={<Component {...rest} />} />
    ),
  },
  {
    key: 2,
    items: [
      { content: '2', key: '2-1' },
      { content: 'Alex', key: '2-2' },
      { content: 'None', key: '2-3' },
      { content: '1 year', key: '2-4' },
      { key: '2-5', ...moreActionCell },
      { key: '2-6', ...moreOptionCell },
    ],
    onClick: () => handleRowClick(2),
    children: (Component, { key, ...rest }) => (
      <MenuButton menu={contextMenuItems} key={key} contextMenu trigger={<Component {...rest} />} />
    ),
  },
  {
    key: 3,
    items: [
      { content: '3', key: '3-1' },
      { content: 'Ali', key: '3-2' },
      { content: 'None', key: '3-3' },
      { content: '30000000000000 years', truncateContent: true, key: '3-4' },
      { key: '3-5' },
      { key: '3-6', ...moreOptionCell },
    ],
    onClick: () => handleRowClick(3),
    children: (Component, { key, ...rest }) => (
      <MenuButton menu={contextMenuItems} key={key} contextMenu trigger={<Component {...rest} />} />
    ),
  },
];

const StaticTable = () => (
  <>
    <Button id={selectors.beforeTableId} content="before table" />
    <Table
      variables={{ cellContentOverflow: 'none' }}
      header={header}
      rows={rowsPlain}
      aria-label="Nested navigation"
      accessibility={gridNestedBehavior}
    />
    <Button id={selectors.afterTableId} content="after table" />
    <Ref innerRef={rowOnclickTestRef}>
      <Button id={selectors.rowOnclickTestId}>row onclick test</Button>
    </Ref>
    <Ref innerRef={buttonInCellOnclickTestRef}>
      <Button id={selectors.buttonInCellOnclickTestId}>button in cell onclick test</Button>
    </Ref>
  </>
);

export default StaticTable;
