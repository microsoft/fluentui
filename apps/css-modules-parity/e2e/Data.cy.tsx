import * as React from 'react';
import { Avatar } from '@fluentui/react-components';
import {
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
  DataGridSelectionCell,
  Table,
  TableBody,
  TableCell,
  TableCellActions,
  TableCellLayout,
  TableHeader,
  TableHeaderCell,
  TableResizeHandle,
  TableRow,
  TableSelectionCell,
  createTableColumn,
  renderDataGridBody_unstable,
  renderDataGridCell_unstable,
  renderDataGridHeaderCell_unstable,
  renderDataGridHeader_unstable,
  renderDataGridRow_unstable,
  renderDataGridSelectionCell_unstable,
  renderDataGrid_unstable,
  renderTableBody_unstable,
  renderTableCellActions_unstable,
  renderTableCellLayout_unstable,
  renderTableCell_unstable,
  renderTableHeaderCell_unstable,
  renderTableHeader_unstable,
  renderTableResizeHandle_unstable,
  renderTableRow_unstable,
  renderTableSelectionCell_unstable,
  renderTable_unstable,
  useDataGridBody_unstable,
  useDataGridCell_unstable,
  useDataGridContextValues_unstable,
  useDataGridHeaderCell_unstable,
  useDataGridHeader_unstable,
  useDataGridRow_unstable,
  useDataGridSelectionCell_unstable,
  useDataGrid_unstable,
  useTableBody_unstable,
  useTableCellActions_unstable,
  useTableCellLayout_unstable,
  useTableCell_unstable,
  useTableHeaderCell_unstable,
  useTableHeader_unstable,
  useTableResizeHandle_unstable,
  useTableRow_unstable,
  useTableSelectionCell_unstable,
  useTable_unstable,
} from '@fluentui/react-table';
import {
  FlatTree,
  Tree,
  TreeItem,
  TreeItemLayout,
  TreeItemPersonaLayout,
  renderFlatTree_unstable,
  renderTreeItemLayout_unstable,
  renderTreeItemPersonaLayout_unstable,
  renderTreeItem_unstable,
  renderTree_unstable,
  useFlatTreeContextValues_unstable,
  useFlatTree_unstable,
  useTreeContextValues_unstable,
  useTreeItemContextValues_unstable,
  useTreeItemLayout_unstable,
  useTreeItemPersonaLayout_unstable,
  useTreeItem_unstable,
  useTree_unstable,
} from '@fluentui/react-tree';
import {
  List,
  ListItem,
  renderListItem_unstable,
  renderList_unstable,
  useListContextValues_unstable,
  useListItem_unstable,
  useList_unstable,
} from '@fluentui/react-list';
import {
  InteractionTag,
  InteractionTagPrimary,
  InteractionTagSecondary,
  Tag,
  TagGroup,
  renderInteractionTagPrimary_unstable,
  renderInteractionTagSecondary_unstable,
  renderInteractionTag_unstable,
  renderTagGroup_unstable,
  renderTag_unstable,
  useInteractionTagContextValues_unstable,
  useInteractionTagPrimary_unstable,
  useInteractionTagSecondary_unstable,
  useInteractionTag_unstable,
  useTagAvatarContextValues_unstable,
  useTagGroupContextValues_unstable,
  useTagGroup_unstable,
  useTag_unstable,
} from '@fluentui/react-tags';
import {
  TagPicker,
  TagPickerButton,
  TagPickerControl,
  TagPickerGroup,
  TagPickerInput,
  TagPickerList,
  TagPickerOption,
  TagPickerOptionGroup,
  renderTagPickerButton_unstable,
  renderTagPickerControl_unstable,
  renderTagPickerGroup_unstable,
  renderTagPickerInput_unstable,
  renderTagPickerList_unstable,
  renderTagPickerOptionGroup,
  renderTagPickerOption_unstable,
  useTagPickerButton_unstable,
  useTagPickerControl_unstable,
  useTagPickerGroup_unstable,
  useTagPickerInput_unstable,
  useTagPickerList_unstable,
  useTagPickerOptionGroup,
  useTagPickerOption_unstable,
} from '@fluentui/react-tag-picker';
import type { JSXElement } from '@fluentui/react-utilities';
// Context value hooks that are not part of the public API.
import { useTableContextValues_unstable } from '../../../packages/react-components/react-table/library/src/components/Table/useTableContextValues';
import { useTableCellLayoutContextValues_unstable } from '../../../packages/react-components/react-table/library/src/components/TableCellLayout/useTableCellLayoutContextValues';
import { useTreeItemPersonaLayoutContextValues_unstable } from '../../../packages/react-components/react-tree/library/src/components/TreeItemPersonaLayout/useTreeItemPersonaLayoutContextValues';
// Explicit `.ts` imports bypass the CSS Modules resolution, giving the original Griffel implementations.
import { useDataGridStyles_unstable as useGriffelDataGridStyles } from '../../../packages/react-components/react-table/library/src/components/DataGrid/useDataGridStyles.styles.ts';
import { useDataGridBodyStyles_unstable as useGriffelDataGridBodyStyles } from '../../../packages/react-components/react-table/library/src/components/DataGridBody/useDataGridBodyStyles.styles.ts';
import { useDataGridCellStyles_unstable as useGriffelDataGridCellStyles } from '../../../packages/react-components/react-table/library/src/components/DataGridCell/useDataGridCellStyles.styles.ts';
import { useDataGridHeaderStyles_unstable as useGriffelDataGridHeaderStyles } from '../../../packages/react-components/react-table/library/src/components/DataGridHeader/useDataGridHeaderStyles.styles.ts';
import { useDataGridHeaderCellStyles_unstable as useGriffelDataGridHeaderCellStyles } from '../../../packages/react-components/react-table/library/src/components/DataGridHeaderCell/useDataGridHeaderCellStyles.styles.ts';
import { useDataGridRowStyles_unstable as useGriffelDataGridRowStyles } from '../../../packages/react-components/react-table/library/src/components/DataGridRow/useDataGridRowStyles.styles.ts';
import { useDataGridSelectionCellStyles_unstable as useGriffelDataGridSelectionCellStyles } from '../../../packages/react-components/react-table/library/src/components/DataGridSelectionCell/useDataGridSelectionCellStyles.styles.ts';
import { useTableStyles_unstable as useGriffelTableStyles } from '../../../packages/react-components/react-table/library/src/components/Table/useTableStyles.styles.ts';
import { useTableBodyStyles_unstable as useGriffelTableBodyStyles } from '../../../packages/react-components/react-table/library/src/components/TableBody/useTableBodyStyles.styles.ts';
import { useTableCellStyles_unstable as useGriffelTableCellStyles } from '../../../packages/react-components/react-table/library/src/components/TableCell/useTableCellStyles.styles.ts';
import { useTableCellActionsStyles_unstable as useGriffelTableCellActionsStyles } from '../../../packages/react-components/react-table/library/src/components/TableCellActions/useTableCellActionsStyles.styles.ts';
import { useTableCellLayoutStyles_unstable as useGriffelTableCellLayoutStyles } from '../../../packages/react-components/react-table/library/src/components/TableCellLayout/useTableCellLayoutStyles.styles.ts';
import { useTableHeaderStyles_unstable as useGriffelTableHeaderStyles } from '../../../packages/react-components/react-table/library/src/components/TableHeader/useTableHeaderStyles.styles.ts';
import { useTableHeaderCellStyles_unstable as useGriffelTableHeaderCellStyles } from '../../../packages/react-components/react-table/library/src/components/TableHeaderCell/useTableHeaderCellStyles.styles.ts';
import { useTableResizeHandleStyles_unstable as useGriffelTableResizeHandleStyles } from '../../../packages/react-components/react-table/library/src/components/TableResizeHandle/useTableResizeHandleStyles.styles.ts';
import { useTableRowStyles_unstable as useGriffelTableRowStyles } from '../../../packages/react-components/react-table/library/src/components/TableRow/useTableRowStyles.styles.ts';
import { useTableSelectionCellStyles_unstable as useGriffelTableSelectionCellStyles } from '../../../packages/react-components/react-table/library/src/components/TableSelectionCell/useTableSelectionCellStyles.styles.ts';
import { useFlatTreeStyles_unstable as useGriffelFlatTreeStyles } from '../../../packages/react-components/react-tree/library/src/components/FlatTree/useFlatTreeStyles.styles.ts';
import { useTreeStyles_unstable as useGriffelTreeStyles } from '../../../packages/react-components/react-tree/library/src/components/Tree/useTreeStyles.styles.ts';
import { useTreeItemStyles_unstable as useGriffelTreeItemStyles } from '../../../packages/react-components/react-tree/library/src/components/TreeItem/useTreeItemStyles.styles.ts';
import { useTreeItemLayoutStyles_unstable as useGriffelTreeItemLayoutStyles } from '../../../packages/react-components/react-tree/library/src/components/TreeItemLayout/useTreeItemLayoutStyles.styles.ts';
import { useTreeItemPersonaLayoutStyles_unstable as useGriffelTreeItemPersonaLayoutStyles } from '../../../packages/react-components/react-tree/library/src/components/TreeItemPersonaLayout/useTreeItemPersonaLayoutStyles.styles.ts';
import { useListStyles_unstable as useGriffelListStyles } from '../../../packages/react-components/react-list/library/src/components/List/useListStyles.styles.ts';
import { useListItemStyles_unstable as useGriffelListItemStyles } from '../../../packages/react-components/react-list/library/src/components/ListItem/useListItemStyles.styles.ts';
import { useInteractionTagStyles_unstable as useGriffelInteractionTagStyles } from '../../../packages/react-components/react-tags/library/src/components/InteractionTag/useInteractionTagStyles.styles.ts';
import { useInteractionTagPrimaryStyles_unstable as useGriffelInteractionTagPrimaryStyles } from '../../../packages/react-components/react-tags/library/src/components/InteractionTagPrimary/useInteractionTagPrimaryStyles.styles.ts';
import { useInteractionTagSecondaryStyles_unstable as useGriffelInteractionTagSecondaryStyles } from '../../../packages/react-components/react-tags/library/src/components/InteractionTagSecondary/useInteractionTagSecondaryStyles.styles.ts';
import { useTagStyles_unstable as useGriffelTagStyles } from '../../../packages/react-components/react-tags/library/src/components/Tag/useTagStyles.styles.ts';
import { useTagGroupStyles_unstable as useGriffelTagGroupStyles } from '../../../packages/react-components/react-tags/library/src/components/TagGroup/useTagGroupStyles.styles.ts';
import { useTagPickerButtonStyles_unstable as useGriffelTagPickerButtonStyles } from '../../../packages/react-components/react-tag-picker/library/src/components/TagPickerButton/useTagPickerButtonStyles.styles.ts';
import { useTagPickerControlStyles_unstable as useGriffelTagPickerControlStyles } from '../../../packages/react-components/react-tag-picker/library/src/components/TagPickerControl/useTagPickerControlStyles.styles.ts';
import { useTagPickerGroupStyles_unstable as useGriffelTagPickerGroupStyles } from '../../../packages/react-components/react-tag-picker/library/src/components/TagPickerGroup/useTagPickerGroupStyles.styles.ts';
import { useTagPickerInputStyles_unstable as useGriffelTagPickerInputStyles } from '../../../packages/react-components/react-tag-picker/library/src/components/TagPickerInput/useTagPickerInputStyles.styles.ts';
import { useTagPickerListStyles_unstable as useGriffelTagPickerListStyles } from '../../../packages/react-components/react-tag-picker/library/src/components/TagPickerList/useTagPickerListStyles.styles.ts';
import { useTagPickerOptionStyles_unstable as useGriffelTagPickerOptionStyles } from '../../../packages/react-components/react-tag-picker/library/src/components/TagPickerOption/useTagPickerOptionStyles.styles.ts';
import { useTagPickerOptionGroupStyles as useGriffelTagPickerOptionGroupStyles } from '../../../packages/react-components/react-tag-picker/library/src/components/TagPickerOptionGroup/useTagPickerOptionGroupStyles.styles.ts';
import { describeParity, griffel, icon } from './harness';
import type { AnyComponent, ComponentSpec, Implementation } from './harness';

type Components = Record<
  | 'Table'
  | 'TableHeader'
  | 'TableBody'
  | 'TableRow'
  | 'TableHeaderCell'
  | 'TableCell'
  | 'TableCellLayout'
  | 'TableCellActions'
  | 'TableSelectionCell'
  | 'TableResizeHandle'
  | 'DataGrid'
  | 'DataGridHeader'
  | 'DataGridBody'
  | 'DataGridRow'
  | 'DataGridHeaderCell'
  | 'DataGridCell'
  | 'DataGridSelectionCell'
  | 'Tree'
  | 'FlatTree'
  | 'TreeItem'
  | 'TreeItemLayout'
  | 'TreeItemPersonaLayout'
  | 'List'
  | 'ListItem'
  | 'Tag'
  | 'TagGroup'
  | 'InteractionTag'
  | 'InteractionTagPrimary'
  | 'InteractionTagSecondary'
  | 'TagPickerControl'
  | 'TagPickerGroup'
  | 'TagPickerInput'
  | 'TagPickerButton'
  | 'TagPickerList'
  | 'TagPickerOption'
  | 'TagPickerOptionGroup',
  AnyComponent
>;

const css = {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
  TableCellLayout,
  TableCellActions,
  TableSelectionCell,
  TableResizeHandle,
  DataGrid,
  DataGridHeader,
  DataGridBody,
  DataGridRow,
  DataGridHeaderCell,
  DataGridCell,
  DataGridSelectionCell,
  Tree,
  FlatTree,
  TreeItem,
  TreeItemLayout,
  TreeItemPersonaLayout,
  List,
  ListItem,
  Tag,
  TagGroup,
  InteractionTag,
  InteractionTagPrimary,
  InteractionTagSecondary,
  TagPickerControl,
  TagPickerGroup,
  TagPickerInput,
  TagPickerButton,
  TagPickerList,
  TagPickerOption,
  TagPickerOptionGroup,
} as unknown as Components;

const gr: Components = {
  Table: griffel(
    'Table',
    useTable_unstable,
    useGriffelTableStyles,
    renderTable_unstable,
    useTableContextValues_unstable,
  ),
  TableHeader: griffel('TableHeader', useTableHeader_unstable, useGriffelTableHeaderStyles, renderTableHeader_unstable),
  TableBody: griffel('TableBody', useTableBody_unstable, useGriffelTableBodyStyles, renderTableBody_unstable),
  TableRow: griffel('TableRow', useTableRow_unstable, useGriffelTableRowStyles, renderTableRow_unstable),
  TableHeaderCell: griffel(
    'TableHeaderCell',
    useTableHeaderCell_unstable,
    useGriffelTableHeaderCellStyles,
    renderTableHeaderCell_unstable,
  ),
  TableCell: griffel('TableCell', useTableCell_unstable, useGriffelTableCellStyles, renderTableCell_unstable),
  TableCellLayout: griffel(
    'TableCellLayout',
    useTableCellLayout_unstable,
    useGriffelTableCellLayoutStyles,
    renderTableCellLayout_unstable,
    useTableCellLayoutContextValues_unstable,
  ),
  TableCellActions: griffel(
    'TableCellActions',
    useTableCellActions_unstable,
    useGriffelTableCellActionsStyles,
    renderTableCellActions_unstable,
  ),
  TableSelectionCell: griffel(
    'TableSelectionCell',
    useTableSelectionCell_unstable,
    useGriffelTableSelectionCellStyles,
    renderTableSelectionCell_unstable,
  ),
  TableResizeHandle: griffel(
    'TableResizeHandle',
    useTableResizeHandle_unstable,
    useGriffelTableResizeHandleStyles,
    renderTableResizeHandle_unstable,
  ),
  DataGrid: griffel(
    'DataGrid',
    useDataGrid_unstable,
    useGriffelDataGridStyles,
    renderDataGrid_unstable,
    useDataGridContextValues_unstable,
  ),
  DataGridHeader: griffel(
    'DataGridHeader',
    useDataGridHeader_unstable,
    useGriffelDataGridHeaderStyles,
    renderDataGridHeader_unstable,
  ),
  DataGridBody: griffel(
    'DataGridBody',
    useDataGridBody_unstable,
    useGriffelDataGridBodyStyles,
    renderDataGridBody_unstable,
  ),
  DataGridRow: griffel('DataGridRow', useDataGridRow_unstable, useGriffelDataGridRowStyles, renderDataGridRow_unstable),
  DataGridHeaderCell: griffel(
    'DataGridHeaderCell',
    useDataGridHeaderCell_unstable,
    useGriffelDataGridHeaderCellStyles,
    renderDataGridHeaderCell_unstable,
  ),
  DataGridCell: griffel(
    'DataGridCell',
    useDataGridCell_unstable,
    useGriffelDataGridCellStyles,
    renderDataGridCell_unstable,
  ),
  DataGridSelectionCell: griffel(
    'DataGridSelectionCell',
    useDataGridSelectionCell_unstable,
    useGriffelDataGridSelectionCellStyles,
    renderDataGridSelectionCell_unstable,
  ),
  Tree: griffel('Tree', useTree_unstable, useGriffelTreeStyles, renderTree_unstable, useTreeContextValues_unstable),
  FlatTree: griffel(
    'FlatTree',
    useFlatTree_unstable,
    useGriffelFlatTreeStyles,
    renderFlatTree_unstable,
    useFlatTreeContextValues_unstable,
  ),
  TreeItem: griffel(
    'TreeItem',
    useTreeItem_unstable,
    useGriffelTreeItemStyles,
    renderTreeItem_unstable,
    useTreeItemContextValues_unstable,
  ),
  TreeItemLayout: griffel(
    'TreeItemLayout',
    useTreeItemLayout_unstable,
    useGriffelTreeItemLayoutStyles,
    renderTreeItemLayout_unstable,
  ),
  TreeItemPersonaLayout: griffel(
    'TreeItemPersonaLayout',
    useTreeItemPersonaLayout_unstable,
    useGriffelTreeItemPersonaLayoutStyles,
    renderTreeItemPersonaLayout_unstable,
    useTreeItemPersonaLayoutContextValues_unstable,
  ),
  List: griffel('List', useList_unstable, useGriffelListStyles, renderList_unstable, useListContextValues_unstable),
  ListItem: griffel('ListItem', useListItem_unstable, useGriffelListItemStyles, renderListItem_unstable),
  Tag: griffel('Tag', useTag_unstable, useGriffelTagStyles, renderTag_unstable, useTagAvatarContextValues_unstable),
  TagGroup: griffel(
    'TagGroup',
    useTagGroup_unstable,
    useGriffelTagGroupStyles,
    renderTagGroup_unstable,
    useTagGroupContextValues_unstable,
  ),
  InteractionTag: griffel(
    'InteractionTag',
    useInteractionTag_unstable,
    useGriffelInteractionTagStyles,
    renderInteractionTag_unstable,
    useInteractionTagContextValues_unstable,
  ),
  InteractionTagPrimary: griffel(
    'InteractionTagPrimary',
    useInteractionTagPrimary_unstable,
    useGriffelInteractionTagPrimaryStyles,
    renderInteractionTagPrimary_unstable,
    useTagAvatarContextValues_unstable,
  ),
  InteractionTagSecondary: griffel(
    'InteractionTagSecondary',
    useInteractionTagSecondary_unstable,
    useGriffelInteractionTagSecondaryStyles,
    renderInteractionTagSecondary_unstable,
  ),
  TagPickerControl: griffel(
    'TagPickerControl',
    useTagPickerControl_unstable,
    useGriffelTagPickerControlStyles,
    renderTagPickerControl_unstable,
  ),
  TagPickerGroup: griffel(
    'TagPickerGroup',
    useTagPickerGroup_unstable,
    useGriffelTagPickerGroupStyles,
    // Renders nothing without tags; the spec always renders tags.
    renderTagPickerGroup_unstable as (state: never, contextValues: never) => JSXElement,
    useTagGroupContextValues_unstable,
  ),
  TagPickerInput: griffel(
    'TagPickerInput',
    useTagPickerInput_unstable,
    useGriffelTagPickerInputStyles,
    renderTagPickerInput_unstable,
  ),
  TagPickerButton: griffel(
    'TagPickerButton',
    useTagPickerButton_unstable,
    useGriffelTagPickerButtonStyles,
    renderTagPickerButton_unstable,
  ),
  TagPickerList: griffel(
    'TagPickerList',
    useTagPickerList_unstable,
    useGriffelTagPickerListStyles,
    renderTagPickerList_unstable,
  ),
  TagPickerOption: griffel(
    'TagPickerOption',
    useTagPickerOption_unstable,
    useGriffelTagPickerOptionStyles,
    renderTagPickerOption_unstable,
  ),
  TagPickerOptionGroup: griffel(
    'TagPickerOptionGroup',
    useTagPickerOptionGroup,
    useGriffelTagPickerOptionGroupStyles,
    renderTagPickerOptionGroup,
  ),
};

const of = (implementation: Implementation): Components => (implementation === 'css' ? css : gr);

type ParentProps = Record<string, unknown>;

/**
 * Variants configure parents (Table size, Tree appearance, DataGrid selection, ...) through a `parent` prop, which
 * `wrap` strips from the element under test before passing it to the parent of the same implementation.
 */
function splitParent(element: JSXElement): [JSXElement, ParentProps] {
  const { parent = {}, ...props } = element.props as { parent?: ParentProps };
  return [React.createElement(element.type, props), parent];
}

const by = (selector: string) => (container: HTMLElement) => container.querySelector<HTMLElement>(selector)!;

// ---------------------------------------------------------------------------------------------------------------------
// Table

type TableParts = { headerRow?: React.ReactNode; row?: React.ReactNode };

function table(implementation: Implementation, tableProps: ParentProps, parts: TableParts): JSXElement {
  const T = of(implementation);
  return (
    <T.Table {...tableProps}>
      {parts.headerRow && <T.TableHeader>{parts.headerRow}</T.TableHeader>}
      {parts.row && <T.TableBody>{parts.row}</T.TableBody>}
    </T.Table>
  );
}

function inTableRow(element: JSXElement, implementation: Implementation): JSXElement {
  const [child, parent] = splitParent(element);
  const T = of(implementation);
  return table(implementation, parent, { row: <T.TableRow>{child}</T.TableRow> });
}

function inTableHeaderRow(element: JSXElement, implementation: Implementation): JSXElement {
  const [child, parent] = splitParent(element);
  const T = of(implementation);
  return table(implementation, parent, { headerRow: <T.TableRow>{child}</T.TableRow> });
}

// ---------------------------------------------------------------------------------------------------------------------
// DataGrid

type Item = { name: string };
const items: Item[] = [{ name: 'Alpha' }];
const columns = [
  createTableColumn<Item>({
    columnId: 'name',
    compare: (a, b) => a.name.localeCompare(b.name),
    renderHeaderCell: () => 'Name',
    renderCell: item => item.name,
  }),
];

type GridParts = {
  header?: boolean;
  headerRow?: JSXElement;
  headerCell?: JSXElement;
  row?: JSXElement;
  cell?: React.ReactNode;
};

function grid(implementation: Implementation, gridProps: ParentProps, parts: GridParts): JSXElement {
  const D = of(implementation);
  // Rows render their selection cell through a slot; a render function keeps it on the same implementation.
  const selectionCell = {
    children: (_: unknown, props: Record<string, unknown>) => <D.DataGridSelectionCell {...props} />,
  };
  return (
    <D.DataGrid items={items} columns={columns} {...gridProps}>
      {parts.header && (
        <D.DataGridHeader>
          {parts.headerRow ?? (
            <D.DataGridRow selectionCell={selectionCell}>
              {() => parts.headerCell ?? <D.DataGridHeaderCell>Name</D.DataGridHeaderCell>}
            </D.DataGridRow>
          )}
        </D.DataGridHeader>
      )}
      <D.DataGridBody>
        {() =>
          parts.row ?? (
            <D.DataGridRow selectionCell={parts.cell ? null : selectionCell}>
              {() => parts.cell ?? <D.DataGridCell>Alpha</D.DataGridCell>}
            </D.DataGridRow>
          )
        }
      </D.DataGridBody>
    </D.DataGrid>
  );
}

// ---------------------------------------------------------------------------------------------------------------------
// Tree

function treeItemContent(implementation: Implementation, label: string): JSXElement {
  const T = of(implementation);
  return <T.TreeItemLayout iconBefore={icon}>{label}</T.TreeItemLayout>;
}

function tree(implementation: Implementation, treeProps: ParentProps, item: React.ReactNode): JSXElement {
  const T = of(implementation);
  return (
    <T.Tree aria-label="Tree" {...treeProps}>
      {item}
    </T.Tree>
  );
}

/** A layout renders inside a TreeItem; `parent.itemType` makes the item a branch with an expand icon. */
function inTreeItem(element: JSXElement, implementation: Implementation): JSXElement {
  const [child, { itemType = 'leaf', ...treeProps }] = splitParent(element);
  const T = of(implementation);
  return tree(
    implementation,
    treeProps,
    <T.TreeItem itemType={itemType} value="item">
      {child}
      {itemType === 'branch' && (
        <T.Tree>
          <T.TreeItem itemType="leaf" value="child">
            {treeItemContent(implementation, 'Child')}
          </T.TreeItem>
        </T.Tree>
      )}
    </T.TreeItem>,
  );
}

// ---------------------------------------------------------------------------------------------------------------------
// Tags

function tags(implementation: Implementation, count = 2): JSXElement[] {
  const T = of(implementation);
  return Array.from({ length: count }, (_, index) => (
    <T.Tag key={index} value={`tag-${index}`}>
      Tag {index}
    </T.Tag>
  ));
}

function interactionTagChildren(implementation: Implementation, primary?: JSXElement, secondary?: boolean) {
  const T = of(implementation);
  return [
    primary ?? (
      <T.InteractionTagPrimary key="primary" icon={icon} hasSecondaryAction>
        Tag
      </T.InteractionTagPrimary>
    ),
    secondary !== false && <T.InteractionTagSecondary key="secondary" aria-label="Remove" />,
  ];
}

// ---------------------------------------------------------------------------------------------------------------------
// TagPicker

/** The control-only picker sets `noPopover`; `parent` props go to TagPicker, which is unstyled. */
function inTagPicker(
  implementation: Implementation,
  pickerProps: ParentProps,
  trigger: JSXElement,
  popover?: JSXElement,
): JSXElement {
  return (
    // Leaves room for the inline popover so it does not cover the next variant.
    <div style={{ minHeight: popover ? 180 : undefined }}>
      <TagPicker
        // TagPickerGroup renders only with selected options; these match the values of `tags()`.
        selectedOptions={['tag-0', 'tag-1']}
        // Pinned, so the popover does not flip over other variants when it scrolls near the viewport edge.
        {...(popover ? { open: true, inline: true, positioning: { pinned: true } } : { noPopover: true })}
        {...pickerProps}
      >
        {trigger}
        {popover}
      </TagPicker>
    </div>
  );
}

function control(implementation: Implementation, input?: JSXElement, group?: JSXElement): JSXElement {
  const P = of(implementation);
  return (
    <P.TagPickerControl>
      {group ?? <P.TagPickerGroup aria-label="Selected">{tags(implementation, 1)}</P.TagPickerGroup>}
      {input ?? <P.TagPickerInput aria-label="Pick" />}
    </P.TagPickerControl>
  );
}

function pickerList(implementation: Implementation, children?: React.ReactNode, list?: JSXElement): JSXElement {
  const P = of(implementation);
  return (
    list ?? (
      <P.TagPickerList>
        {children ?? (
          <>
            <P.TagPickerOption value="a">Option A</P.TagPickerOption>
            <P.TagPickerOption value="b">Option B</P.TagPickerOption>
          </>
        )}
      </P.TagPickerList>
    )
  );
}

const components: Record<string, ComponentSpec> = {
  // -------------------------------------------------------------------------------------------------------------------
  // react-table
  Table: {
    css: css.Table,
    griffel: gr.Table,
    sampledSlots: [],
    interactive: false,
    props: implementation => {
      const T = of(implementation);
      return {
        'aria-label': 'Table',
        children: [
          <T.TableHeader key="header">
            <T.TableRow>
              <T.TableHeaderCell>Name</T.TableHeaderCell>
            </T.TableRow>
          </T.TableHeader>,
          <T.TableBody key="body">
            <T.TableRow>
              <T.TableCell>Alpha</T.TableCell>
            </T.TableRow>
          </T.TableBody>,
        ],
      };
    },
    variants: [{}, { size: 'small' }, { size: 'extra-small' }, { noNativeElements: true }],
  },
  TableHeader: {
    css: css.TableHeader,
    griffel: gr.TableHeader,
    sampledSlots: [],
    interactive: false,
    props: implementation => {
      const T = of(implementation);
      return {
        children: (
          <T.TableRow>
            <T.TableHeaderCell>Name</T.TableHeaderCell>
          </T.TableRow>
        ),
      };
    },
    wrap: (element, implementation) => {
      const [child, parent] = splitParent(element);
      const T = of(implementation);
      return <T.Table {...parent}>{child}</T.Table>;
    },
    findRoot: by('.fui-TableHeader'),
    variants: [{}, { parent: { noNativeElements: true } }],
  },
  TableBody: {
    css: css.TableBody,
    griffel: gr.TableBody,
    sampledSlots: [],
    interactive: false,
    props: implementation => {
      const T = of(implementation);
      return {
        children: (
          <T.TableRow>
            <T.TableCell>Alpha</T.TableCell>
          </T.TableRow>
        ),
      };
    },
    wrap: (element, implementation) => {
      const [child, parent] = splitParent(element);
      const T = of(implementation);
      return <T.Table {...parent}>{child}</T.Table>;
    },
    findRoot: by('.fui-TableBody'),
    variants: [{}, { parent: { noNativeElements: true } }],
  },
  TableRow: {
    css: css.TableRow,
    griffel: gr.TableRow,
    sampledSlots: [],
    interactive: true,
    props: implementation => {
      const T = of(implementation);
      return { tabIndex: 0, children: <T.TableCell>Alpha</T.TableCell> };
    },
    wrap: (element, implementation) => {
      const [child, { inHeader, ...parent }] = splitParent(element);
      return table(implementation, parent, inHeader ? { headerRow: child } : { row: child });
    },
    findRoot: by('.fui-TableRow'),
    variants: [
      {},
      { appearance: 'brand' },
      { appearance: 'neutral' },
      { parent: { size: 'small', noNativeElements: true } },
      { parent: { size: 'extra-small' } },
      { parent: { inHeader: true } },
    ],
  },
  TableHeaderCell: {
    css: css.TableHeaderCell,
    griffel: gr.TableHeaderCell,
    slot: 'aside',
    sampledSlots: ['fui-TableHeaderCell__button', 'fui-TableHeaderCell__sortIcon', 'fui-TableHeaderCell__aside'],
    interactive: true,
    // Non-sortable header cells have no focusable button; a focusable root keeps `focus-visible` reachable.
    props: { tabIndex: 0, children: 'Name', aside: 'aside' },
    wrap: inTableHeaderRow,
    findRoot: by('.fui-TableHeaderCell'),
    knownDifferences: {
      // The button inherits the root background, which the app's plain stateful CSS now sets (see harness notes).
      'plain CSS stateful class name': {
        'fui-TableHeaderCell__button background-color': [
          '--colorPaletteBerryBackground2',
          '--colorPaletteBlueBackground2',
        ],
      },
    },
    variants: [
      {},
      { sortable: true },
      { sortable: true, sortDirection: 'ascending' },
      { sortDirection: 'descending', parent: { sortable: true } },
      { parent: { size: 'small', noNativeElements: true } },
    ],
  },
  TableCell: {
    css: css.TableCell,
    griffel: gr.TableCell,
    sampledSlots: [],
    interactive: true,
    props: { tabIndex: 0, children: 'Alpha' },
    wrap: inTableRow,
    findRoot: by('.fui-TableCell'),
    variants: [
      {},
      { parent: { size: 'small' } },
      { parent: { size: 'extra-small' } },
      { parent: { noNativeElements: true } },
    ],
  },
  TableCellLayout: {
    css: css.TableCellLayout,
    griffel: gr.TableCellLayout,
    slot: 'media',
    sampledSlots: [
      'fui-TableCellLayout__media',
      'fui-TableCellLayout__content',
      'fui-TableCellLayout__main',
      'fui-TableCellLayout__description',
    ],
    interactive: false,
    props: { media: icon, description: 'Description', children: 'Main' },
    wrap: (element, implementation) => {
      const [child, parent] = splitParent(element);
      const T = of(implementation);
      return table(implementation, parent, {
        row: (
          <T.TableRow>
            <T.TableCell>{child}</T.TableCell>
          </T.TableRow>
        ),
      });
    },
    findRoot: by('.fui-TableCellLayout'),
    variants: [
      {},
      { appearance: 'primary' },
      { truncate: true },
      { parent: { size: 'small' } },
      { appearance: 'primary', parent: { size: 'extra-small' } },
    ],
  },
  TableCellActions: {
    css: css.TableCellActions,
    griffel: gr.TableCellActions,
    sampledSlots: [],
    interactive: true,
    // The root is the only focusable-free part; hovering it also hovers the cell that reveals it.
    states: ['rest', 'hover'],
    props: { children: <button>Act</button> },
    wrap: (element, implementation) => {
      const [child, parent] = splitParent(element);
      const T = of(implementation);
      return table(implementation, parent, {
        row: (
          <T.TableRow>
            <T.TableCell>
              Alpha
              {child}
            </T.TableCell>
          </T.TableRow>
        ),
      });
    },
    findRoot: by('.fui-TableCellActions'),
    variants: [{}, { visible: true }],
  },
  TableSelectionCell: {
    css: css.TableSelectionCell,
    griffel: gr.TableSelectionCell,
    sampledSlots: ['fui-TableSelectionCell__checkboxIndicator', 'fui-TableSelectionCell__radioIndicator'],
    interactive: true,
    props: {},
    wrap: inTableRow,
    findRoot: by('.fui-TableSelectionCell'),
    variants: [
      {},
      { checked: true },
      { checked: 'mixed' },
      { type: 'radio', checked: true },
      { subtle: true },
      { checked: true, parent: { noNativeElements: true, size: 'small' } },
    ],
  },
  TableResizeHandle: {
    css: css.TableResizeHandle,
    griffel: gr.TableResizeHandle,
    sampledSlots: [],
    interactive: true,
    // The handle is not focusable.
    states: ['rest', 'hover', 'pressed'],
    // Its 200ms opacity transition ignores reduced motion in both implementations; sampling compares end states.
    props: { style: { transitionDuration: '0s' } },
    wrap: (element, implementation) => {
      const T = of(implementation);
      return table(
        implementation,
        {},
        { headerRow: <T.TableRow>{<T.TableHeaderCell aside={element}>Name</T.TableHeaderCell>}</T.TableRow> },
      );
    },
    findRoot: by('.fui-TableResizeHandle'),
    variants: [{}],
  },
  DataGrid: {
    css: css.DataGrid,
    griffel: gr.DataGrid,
    sampledSlots: [],
    interactive: false,
    props: implementation => {
      const D = of(implementation);
      return {
        items,
        columns,
        'aria-label': 'Grid',
        children: [
          <D.DataGridHeader key="header">
            <D.DataGridRow>{() => <D.DataGridHeaderCell>Name</D.DataGridHeaderCell>}</D.DataGridRow>
          </D.DataGridHeader>,
          <D.DataGridBody key="body">
            {() => <D.DataGridRow>{() => <D.DataGridCell>Alpha</D.DataGridCell>}</D.DataGridRow>}
          </D.DataGridBody>,
        ],
      };
    },
    variants: [{}, { size: 'small' }, { noNativeElements: true }, { selectionMode: 'multiselect' }],
  },
  DataGridHeader: {
    css: css.DataGridHeader,
    griffel: gr.DataGridHeader,
    sampledSlots: [],
    interactive: false,
    props: implementation => {
      const D = of(implementation);
      return {
        children: <D.DataGridRow>{() => <D.DataGridHeaderCell>Name</D.DataGridHeaderCell>}</D.DataGridRow>,
      };
    },
    wrap: (element, implementation) => {
      const [child, parent] = splitParent(element);
      const D = of(implementation);
      return (
        <D.DataGrid items={items} columns={columns} {...parent}>
          {child}
        </D.DataGrid>
      );
    },
    findRoot: by('.fui-DataGridHeader'),
    variants: [{}, { parent: { size: 'small' } }],
  },
  DataGridBody: {
    css: css.DataGridBody,
    griffel: gr.DataGridBody,
    sampledSlots: [],
    interactive: false,
    props: implementation => {
      const D = of(implementation);
      return {
        children: () => <D.DataGridRow>{() => <D.DataGridCell>Alpha</D.DataGridCell>}</D.DataGridRow>,
      };
    },
    wrap: (element, implementation) => {
      const [child, parent] = splitParent(element);
      const D = of(implementation);
      return (
        <D.DataGrid items={items} columns={columns} {...parent}>
          {child}
        </D.DataGrid>
      );
    },
    findRoot: by('.fui-DataGridBody'),
    variants: [{}, { parent: { size: 'small' } }],
  },
  DataGridRow: {
    css: css.DataGridRow,
    griffel: gr.DataGridRow,
    sampledSlots: ['fui-DataGridRow__selectionCell'],
    interactive: true,
    props: implementation => {
      const D = of(implementation);
      return {
        selectionCell: {
          children: (_: unknown, props: Record<string, unknown>) => <D.DataGridSelectionCell {...props} />,
        },
        children: () => <D.DataGridCell>Alpha</D.DataGridCell>,
      };
    },
    wrap: (element, implementation) => {
      const [row, parent] = splitParent(element);
      return grid(implementation, parent, { row });
    },
    findRoot: by('.fui-DataGridBody .fui-DataGridRow'),
    variants: [
      { parent: { focusMode: 'row_unstable' } },
      { parent: { selectionMode: 'multiselect' } },
      { parent: { selectionMode: 'multiselect', defaultSelectedItems: [0] } },
      { parent: { selectionMode: 'single', defaultSelectedItems: [0], selectionAppearance: 'neutral' } },
      { parent: { selectionMode: 'multiselect', subtleSelection: true, size: 'small' } },
    ],
  },
  DataGridHeaderCell: {
    css: css.DataGridHeaderCell,
    griffel: gr.DataGridHeaderCell,
    slot: 'aside',
    sampledSlots: [
      'fui-DataGridHeaderCell__button',
      'fui-DataGridHeaderCell__sortIcon',
      'fui-DataGridHeaderCell__aside',
    ],
    interactive: true,
    props: { children: 'Name', aside: 'aside' },
    wrap: (element, implementation) => {
      const [headerCell, parent] = splitParent(element);
      return grid(implementation, parent, { header: true, headerCell });
    },
    findRoot: by('.fui-DataGridHeaderCell'),
    knownDifferences: {
      // The button inherits the root background, which the app's plain stateful CSS now sets (see harness notes).
      'plain CSS stateful class name': {
        'fui-DataGridHeaderCell__button background-color': [
          '--colorPaletteBerryBackground2',
          '--colorPaletteBlueBackground2',
        ],
      },
    },
    variants: [
      {},
      { parent: { sortable: true } },
      { parent: { sortable: true, defaultSortState: { sortColumn: 'name', sortDirection: 'ascending' } } },
      { parent: { size: 'small' } },
    ],
  },
  DataGridCell: {
    css: css.DataGridCell,
    griffel: gr.DataGridCell,
    sampledSlots: [],
    interactive: true,
    props: { children: 'Alpha' },
    wrap: (element, implementation) => {
      const [cell, parent] = splitParent(element);
      return grid(implementation, parent, { cell });
    },
    findRoot: by('.fui-DataGridCell'),
    variants: [{}, { parent: { size: 'small' } }, { parent: { size: 'extra-small' } }],
  },
  DataGridSelectionCell: {
    css: css.DataGridSelectionCell,
    griffel: gr.DataGridSelectionCell,
    sampledSlots: ['fui-DataGridSelectionCell__checkboxIndicator', 'fui-DataGridSelectionCell__radioIndicator'],
    interactive: true,
    props: {},
    wrap: (element, implementation) => {
      const [child, parent] = splitParent(element);
      const D = of(implementation);
      return grid(implementation, parent, {
        cell: (
          <>
            {child}
            <D.DataGridCell>Alpha</D.DataGridCell>
          </>
        ),
      });
    },
    findRoot: by('.fui-DataGridSelectionCell'),
    variants: [
      { parent: { selectionMode: 'multiselect' } },
      { parent: { selectionMode: 'multiselect', defaultSelectedItems: [0] } },
      { parent: { selectionMode: 'single', defaultSelectedItems: [0] } },
      { parent: { selectionMode: 'multiselect', subtleSelection: true } },
    ],
  },

  // -------------------------------------------------------------------------------------------------------------------
  // react-tree
  Tree: {
    css: css.Tree,
    griffel: gr.Tree,
    sampledSlots: [],
    interactive: false,
    props: implementation => {
      const T = of(implementation);
      return {
        'aria-label': 'Tree',
        defaultOpenItems: ['branch'],
        children: (
          <T.TreeItem itemType="branch" value="branch">
            {treeItemContent(implementation, 'Branch')}
            <T.Tree>
              <T.TreeItem itemType="leaf" value="leaf">
                {treeItemContent(implementation, 'Leaf')}
              </T.TreeItem>
            </T.Tree>
          </T.TreeItem>
        ),
      };
    },
    variants: [{}, { appearance: 'subtle-alpha' }, { appearance: 'transparent' }, { size: 'small' }],
  },
  FlatTree: {
    css: css.FlatTree,
    griffel: gr.FlatTree,
    sampledSlots: [],
    interactive: false,
    props: implementation => {
      const T = of(implementation);
      return {
        'aria-label': 'Flat tree',
        children: [1, 2].map(index => (
          <T.TreeItem
            key={index}
            itemType="leaf"
            value={`item-${index}`}
            aria-level={1}
            aria-setsize={2}
            aria-posinset={index}
          >
            {treeItemContent(implementation, `Item ${index}`)}
          </T.TreeItem>
        )),
      };
    },
    variants: [{}, { appearance: 'subtle-alpha' }, { size: 'small' }],
  },
  TreeItem: {
    css: css.TreeItem,
    griffel: gr.TreeItem,
    sampledSlots: [],
    interactive: true,
    props: implementation => ({ value: 'item', children: treeItemContent(implementation, 'Item') }),
    wrap: (element, implementation) => {
      const [child, parent] = splitParent(element);
      return tree(implementation, parent, child);
    },
    findRoot: by('.fui-TreeItem'),
    variants: [
      { itemType: 'leaf' },
      { itemType: 'branch' },
      { itemType: 'leaf', parent: { size: 'small', appearance: 'transparent' } },
      { itemType: 'leaf', parent: { selectionMode: 'multiselect' } },
    ],
  },
  TreeItemLayout: {
    css: css.TreeItemLayout,
    griffel: gr.TreeItemLayout,
    slot: 'iconBefore',
    sampledSlots: [
      'fui-TreeItemLayout__main',
      'fui-TreeItemLayout__iconBefore',
      'fui-TreeItemLayout__iconAfter',
      'fui-TreeItemLayout__expandIcon',
      'fui-TreeItemLayout__aside',
      'fui-TreeItemLayout__selector',
    ],
    interactive: true,
    props: { iconBefore: icon, iconAfter: icon, aside: 'aside', children: 'Item' },
    wrap: inTreeItem,
    findRoot: by('.fui-TreeItemLayout'),
    variants: [
      {},
      { parent: { itemType: 'branch' } },
      { parent: { appearance: 'subtle-alpha' } },
      { parent: { appearance: 'transparent', size: 'small' } },
      { parent: { selectionMode: 'multiselect' } },
      { parent: { selectionMode: 'single', size: 'small' } },
    ],
  },
  TreeItemPersonaLayout: {
    css: css.TreeItemPersonaLayout,
    griffel: gr.TreeItemPersonaLayout,
    slot: 'media',
    sampledSlots: [
      'fui-TreeItemPersonaLayout__media',
      'fui-TreeItemPersonaLayout__main',
      'fui-TreeItemPersonaLayout__description',
      'fui-TreeItemPersonaLayout__expandIcon',
      'fui-TreeItemPersonaLayout__aside',
      'fui-TreeItemPersonaLayout__selector',
    ],
    interactive: true,
    props: { media: <Avatar name="Ada Lovelace" />, description: 'Description', aside: 'aside', children: 'Ada' },
    wrap: inTreeItem,
    findRoot: by('.fui-TreeItemPersonaLayout'),
    variants: [
      {},
      { parent: { itemType: 'branch' } },
      { parent: { appearance: 'subtle-alpha', size: 'small' } },
      { parent: { appearance: 'transparent' } },
      { parent: { selectionMode: 'multiselect' } },
    ],
  },

  // -------------------------------------------------------------------------------------------------------------------
  // react-list
  List: {
    css: css.List,
    griffel: gr.List,
    sampledSlots: [],
    interactive: false,
    props: implementation => {
      const L = of(implementation);
      return {
        'aria-label': 'List',
        children: ['a', 'b'].map(value => (
          <L.ListItem key={value} value={value}>
            Item {value}
          </L.ListItem>
        )),
      };
    },
    variants: [{}, { navigationMode: 'items' }, { selectionMode: 'multiselect', defaultSelectedItems: ['a'] }],
  },
  ListItem: {
    css: css.ListItem,
    griffel: gr.ListItem,
    slot: 'checkmark',
    sampledSlots: ['fui-ListItem__checkmark'],
    interactive: true,
    props: { value: 'a', children: 'Item' },
    wrap: (element, implementation) => {
      const [child, parent] = splitParent(element);
      const L = of(implementation);
      return (
        <L.List aria-label="List" {...parent}>
          {child}
        </L.List>
      );
    },
    findRoot: by('.fui-ListItem'),
    // Non-navigable, non-selectable items are not focusable, so every variant makes the item focusable.
    variants: [
      { parent: { navigationMode: 'items' } },
      { parent: { navigationMode: 'composite' } },
      { parent: { selectionMode: 'multiselect' } },
      { parent: { selectionMode: 'multiselect', defaultSelectedItems: ['a'] } },
      { parent: { selectionMode: 'single', defaultSelectedItems: ['a'] } },
      { disabledSelection: true, parent: { selectionMode: 'multiselect' } },
    ],
  },

  // -------------------------------------------------------------------------------------------------------------------
  // react-tags
  Tag: {
    css: css.Tag,
    griffel: gr.Tag,
    slot: 'icon',
    sampledSlots: ['fui-Tag__icon', 'fui-Tag__primaryText', 'fui-Tag__secondaryText'],
    // Non-dismissible tags render a static span.
    interactive: false,
    props: { icon, secondaryText: 'Secondary', children: 'Tag' },
    variants: [
      { appearance: 'filled' },
      { appearance: 'outline', shape: 'circular' },
      { appearance: 'brand' },
      { size: 'small', selected: true },
      { size: 'extra-small', media: <Avatar name="Ada Lovelace" /> },
      { disabled: true },
    ],
  },
  'Tag (dismissible)': {
    css: css.Tag,
    griffel: gr.Tag,
    customStyleHook: 'useTagStyles_unstable',
    slot: 'dismissIcon',
    sampledSlots: ['fui-Tag__icon', 'fui-Tag__primaryText', 'fui-Tag__dismissIcon'],
    interactive: true,
    props: { icon, dismissible: true, children: 'Tag' },
    variants: [
      { appearance: 'filled' },
      { appearance: 'outline', shape: 'circular' },
      { appearance: 'brand', size: 'small' },
      { selected: true },
      { size: 'extra-small' },
      { disabled: true },
    ],
  },
  TagGroup: {
    css: css.TagGroup,
    griffel: gr.TagGroup,
    sampledSlots: [],
    interactive: false,
    props: implementation => ({ 'aria-label': 'Tags', children: tags(implementation) }),
    variants: [{}, { size: 'small' }, { size: 'extra-small', appearance: 'brand' }, { dismissible: true }],
  },
  InteractionTag: {
    css: css.InteractionTag,
    griffel: gr.InteractionTag,
    sampledSlots: [],
    interactive: false,
    props: implementation => ({ children: interactionTagChildren(implementation) }),
    variants: [
      {},
      { appearance: 'outline', shape: 'circular' },
      { appearance: 'brand', size: 'small' },
      { selected: true },
      { disabled: true },
    ],
  },
  InteractionTagPrimary: {
    css: css.InteractionTagPrimary,
    griffel: gr.InteractionTagPrimary,
    slot: 'icon',
    sampledSlots: [
      'fui-InteractionTagPrimary__icon',
      'fui-InteractionTagPrimary__media',
      'fui-InteractionTagPrimary__primaryText',
      'fui-InteractionTagPrimary__secondaryText',
    ],
    interactive: true,
    props: { icon, secondaryText: 'Secondary', children: 'Tag' },
    wrap: (element, implementation) => {
      const [primary, { hasSecondary = true, ...parent }] = splitParent(element);
      const T = of(implementation);
      return (
        <T.InteractionTag {...parent}>
          {interactionTagChildren(implementation, primary, hasSecondary as boolean)}
        </T.InteractionTag>
      );
    },
    findRoot: by('.fui-InteractionTagPrimary'),
    variants: [
      { hasSecondaryAction: true },
      { hasSecondaryAction: false, parent: { hasSecondary: false, appearance: 'outline', shape: 'circular' } },
      { hasSecondaryAction: true, parent: { appearance: 'brand', selected: true } },
      { hasSecondaryAction: true, parent: { size: 'small', shape: 'circular' } },
      { hasSecondaryAction: true, media: <Avatar name="Ada Lovelace" />, parent: { size: 'extra-small' } },
      { hasSecondaryAction: true, disabled: true, parent: { disabled: true } },
    ],
  },
  InteractionTagSecondary: {
    css: css.InteractionTagSecondary,
    griffel: gr.InteractionTagSecondary,
    sampledSlots: [],
    interactive: true,
    props: { 'aria-label': 'Remove' },
    wrap: (element, implementation) => {
      const [secondary, parent] = splitParent(element);
      const T = of(implementation);
      return (
        <T.InteractionTag {...parent}>
          <T.InteractionTagPrimary hasSecondaryAction>Tag</T.InteractionTagPrimary>
          {secondary}
        </T.InteractionTag>
      );
    },
    findRoot: by('.fui-InteractionTagSecondary'),
    // Note: Tab focuses the primary action first; `focus-visible` samples the secondary next to a focused primary.
    variants: [
      {},
      { parent: { appearance: 'outline', shape: 'circular' } },
      { parent: { appearance: 'brand', selected: true } },
      { parent: { size: 'small' } },
      { parent: { size: 'extra-small', selected: true } },
      { disabled: true, parent: { disabled: true } },
    ],
  },

  // -------------------------------------------------------------------------------------------------------------------
  // react-tag-picker
  TagPickerControl: {
    css: css.TagPickerControl,
    griffel: gr.TagPickerControl,
    sampledSlots: ['fui-TagPickerControl__expandIcon', 'fui-TagPickerControl__secondaryAction'],
    interactive: true,
    props: implementation => {
      const P = of(implementation);
      return {
        children: [
          <P.TagPickerGroup key="group" aria-label="Selected">
            {tags(implementation, 1)}
          </P.TagPickerGroup>,
          <P.TagPickerInput key="input" aria-label="Pick" />,
        ],
      };
    },
    wrap: (element, implementation) => {
      const [child, parent] = splitParent(element);
      return inTagPicker(implementation, parent, child);
    },
    findRoot: by('.fui-TagPickerControl'),
    variants: [
      {},
      { parent: { size: 'large' } },
      { parent: { size: 'extra-large', appearance: 'underline' } },
      { parent: { appearance: 'filled-darker' } },
      { secondaryAction: <button>Clear</button>, parent: { appearance: 'filled-lighter' } },
      { disabled: true, parent: { disabled: true } },
    ],
  },
  TagPickerGroup: {
    css: css.TagPickerGroup,
    griffel: gr.TagPickerGroup,
    sampledSlots: [],
    interactive: false,
    props: implementation => ({ 'aria-label': 'Selected', children: tags(implementation) }),
    wrap: (element, implementation) => {
      const [group, parent] = splitParent(element);
      return inTagPicker(implementation, parent, control(implementation, undefined, group));
    },
    findRoot: by('.fui-TagPickerGroup'),
    variants: [{}, { parent: { size: 'large' } }, { parent: { size: 'extra-large' } }],
  },
  TagPickerInput: {
    css: css.TagPickerInput,
    griffel: gr.TagPickerInput,
    sampledSlots: [],
    interactive: true,
    props: { 'aria-label': 'Pick', placeholder: 'Pick' },
    wrap: (element, implementation) => {
      const [input, parent] = splitParent(element);
      const P = of(implementation);
      return inTagPicker(implementation, parent, <P.TagPickerControl>{input}</P.TagPickerControl>);
    },
    findRoot: by('.fui-TagPickerInput'),
    variants: [
      {},
      { parent: { size: 'large' } },
      { parent: { size: 'extra-large', appearance: 'underline' } },
      { disabled: true, parent: { disabled: true } },
    ],
  },
  TagPickerButton: {
    css: css.TagPickerButton,
    griffel: gr.TagPickerButton,
    sampledSlots: [],
    interactive: true,
    props: { 'aria-label': 'Pick' },
    wrap: (element, implementation) => {
      const [button, parent] = splitParent(element);
      const P = of(implementation);
      return inTagPicker(implementation, parent, <P.TagPickerControl>{button}</P.TagPickerControl>);
    },
    findRoot: by('.fui-TagPickerButton'),
    variants: [
      {},
      { parent: { size: 'large' } },
      { parent: { size: 'extra-large', appearance: 'underline' } },
      { disabled: true, parent: { disabled: true } },
    ],
  },
  TagPickerList: {
    css: css.TagPickerList,
    griffel: gr.TagPickerList,
    sampledSlots: [],
    interactive: false,
    props: implementation => {
      const P = of(implementation);
      return { children: <P.TagPickerOption value="a">Option A</P.TagPickerOption> };
    },
    wrap: (element, implementation) => {
      const [list, parent] = splitParent(element);
      return inTagPicker(implementation, parent, control(implementation), pickerList(implementation, null, list));
    },
    findRoot: by('.fui-TagPickerList'),
    variants: [{}, { parent: { size: 'large' } }],
  },
  TagPickerOption: {
    css: css.TagPickerOption,
    griffel: gr.TagPickerOption,
    slot: 'media',
    sampledSlots: ['fui-TagPickerOption__media', 'fui-TagPickerOption__secondaryContent'],
    interactive: true,
    // Options are reached through the input's active descendant, not Tab.
    states: ['rest', 'hover', 'pressed'],
    props: { value: 'a', media: icon, secondaryContent: 'Secondary', children: 'Option A' },
    wrap: (element, implementation) => {
      const [option, parent] = splitParent(element);
      return inTagPicker(implementation, parent, control(implementation), pickerList(implementation, option));
    },
    findRoot: by('.fui-TagPickerOption'),
    variants: [{}, { disabled: true }, { parent: { size: 'large' } }],
  },
  TagPickerOptionGroup: {
    css: css.TagPickerOptionGroup,
    griffel: gr.TagPickerOptionGroup,
    slot: 'label',
    sampledSlots: ['fui-TagPickerOptionGroup__label'],
    interactive: false,
    props: implementation => {
      const P = of(implementation);
      return { label: 'Group', children: <P.TagPickerOption value="a">Option A</P.TagPickerOption> };
    },
    wrap: (element, implementation) => {
      const [group, parent] = splitParent(element);
      return inTagPicker(implementation, parent, control(implementation), pickerList(implementation, group));
    },
    findRoot: by('.fui-TagPickerOptionGroup'),
    variants: [{}],
  },
};

describeParity('data', components);
