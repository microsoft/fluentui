# Fluent UI Codebase Usage Report

## Summary

| Package                                               | Components | Hooks | Types | Others | Total Imports |
| ----------------------------------------------------- | ---------- | ----- | ----- | ------ | ------------- |
| `@fluentui-contrib/azure-theme`                       | 2          | 0     | 0     | 0      | 76            |
| `@fluentui-contrib/houdini-utils`                     | 2          | 0     | 0     | 4      | 15            |
| `@fluentui-contrib/react-cap-theme`                   | 6          | 0     | 0     | 0      | 6             |
| `@fluentui-contrib/react-chat`                        | 3          | 0     | 0     | 0      | 23            |
| `@fluentui-contrib/react-contextual-pane`             | 2          | 0     | 0     | 0      | 9             |
| `@fluentui-contrib/react-data-grid-react-window`      | 7          | 0     | 0     | 0      | 29            |
| `@fluentui-contrib/react-data-grid-react-window-grid` | 6          | 0     | 0     | 0      | 13            |
| `@fluentui-contrib/react-draggable-dialog`            | 4          | 0     | 0     | 0      | 17            |
| `@fluentui-contrib/react-gamepad-navigation`          | 0          | 1     | 0     | 0      | 3             |
| `@fluentui-contrib/react-headless-provider`           | 1          | 0     | 0     | 0      | 2             |
| `@fluentui-contrib/react-interactive-tab`             | 1          | 0     | 0     | 0      | 2             |
| `@fluentui-contrib/react-keytips`                     | 3          | 1     | 0     | 0      | 20            |
| `@fluentui-contrib/react-resize-handle`               | 1          | 1     | 0     | 0      | 2             |
| `@fluentui-contrib/react-shadow`                      | 0          | 0     | 0     | 2      | 4             |
| `@fluentui-contrib/react-themeless-provider`          | 1          | 0     | 0     | 1      | 3             |
| `@fluentui-contrib/react-tree-grid`                   | 8          | 1     | 0     | 0      | 28            |
| `@fluentui-contrib/react-virtualizer`                 | 6          | 2     | 3     | 0      | 32            |
| `@fluentui-contrib/teams-components`                  | 3          | 0     | 0     | 0      | 6             |
| `@fluentui/keyboard-keys`                             | 8          | 0     | 0     | 0      | 17            |
| `@fluentui/react`                                     | 1          | 0     | 0     | 2      | 3             |
| `@fluentui/react-aria`                                | 0          | 1     | 0     | 0      | 1             |
| `@fluentui/react-components`                          | 184        | 55    | 44    | 32     | 1219          |
| `@fluentui/react-icons`                               | 84         | 0     | 0     | 1      | 180           |
| `@fluentui/react-jsx-runtime`                         | 1          | 0     | 0     | 1      | 16            |
| `@fluentui/react-migration-v8-v9`                     | 2          | 0     | 0     | 5      | 7             |
| `@fluentui/react-positioning`                         | 0          | 1     | 0     | 1      | 2             |
| `@fluentui/react-shared-contexts`                     | 10         | 5     | 1     | 0      | 21            |
| `@fluentui/react-tabs`                                | 0          | 3     | 0     | 0      | 3             |
| `@fluentui/react-tabster`                             | 7          | 4     | 0     | 0      | 20            |
| `@fluentui/react-utilities`                           | 6          | 7     | 8     | 8      | 60            |
| `@fluentui/scheme-utilities`                          | 1          | 0     | 0     | 0      | 1             |
| `@griffel/react`                                      | 1          | 0     | 0     | 2      | 7             |
| `@griffel/shadow-dom`                                 | 0          | 0     | 0     | 1      | 1             |
| `react`                                               | 1          | 2     | 1     | 0      | 4             |
| `tabster`                                             | 0          | 0     | 0     | 1      | 1             |

## `@fluentui-contrib/azure-theme`

### Components

| Component         | Usages | Props |
| ----------------- | ------ | ----- |
| `AzureLightTheme` | 0      | -     |
| `AzureDarkTheme`  | 0      | -     |

## `@fluentui-contrib/houdini-utils`

### Components

| Component              | Usages | Props |
| ---------------------- | ------ | ----- |
| `PaintWorklet`         | 0      | -     |
| `PaintWorkletGeometry` | 0      | -     |

### Other Exports

| Symbol                   | Usages |
| ------------------------ | ------ |
| `blobify`                | 3      |
| `registerPaintWorklet`   | 3      |
| `fallbackPaintAnimation` | 2      |
| `hasHoudini`             | 1      |

## `@fluentui-contrib/react-cap-theme`

### Components

| Component              | Usages | Props                                                                                                                                                                                                                                                                                          |
| ---------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Button`               | 5      | `id`(5): stateId(appearance, 'default'), stateId(appearance, 'hover'), stateId(appearance, 'active'), stateId(appearance, 'focus'), stateId(appearance, 'disabled'), `icon`(5): <CalendarMonth />, `appearance`(5): appearance, `disabled`(1): true, `disabledFocusable`(1): disabledFocusable |
| `CAPThemeProvider`     | 4      | `theme`(4): { ...teamsLightV21Theme, ...CAP_THEME_TEAMS }, { ...CAP_THEME_ONE_DRIVE }, { ...CAP_THEME_SHAREPOINT }, config.theme                                                                                                                                                               |
| `CAP_THEME_ONE_DRIVE`  | 0      | -                                                                                                                                                                                                                                                                                              |
| `CAP_THEME_SHAREPOINT` | 0      | -                                                                                                                                                                                                                                                                                              |
| `CAP_THEME_TEAMS`      | 0      | -                                                                                                                                                                                                                                                                                              |
| `ButtonProps`          | 0      | -                                                                                                                                                                                                                                                                                              |

## `@fluentui-contrib/react-chat`

### Components

| Component       | Usages | Props                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| --------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ChatMyMessage` | 17     | `onKeyDown`(1): handleMessageKeyDown, `decoration`(2): important, urgent, `details`(1): Edited, `author`(1): Ashley McCarthy, `decorationLabel`(1): important!, `decorationIcon`(1): <Question20Regular />, `timestamp`(1): 8:00 AM, `reactions`(1): <Reactions />, `body`(1): Message body, `status`(6): failed, sending, received, read, blocked, scheduled                                                                                                      |
| `ChatMessage`   | 14     | `avatar`(4): <Avatar name={user.name} badge={{ status: user.status }} />, <Avatar name="Ashley McCarthy" badge={{ status: 'available' }} />, `onKeyDown`(1): handleMessageKeyDown, `decoration`(4): important, urgent, mention, mentionEveryone, `details`(1): Edited, `author`(1): Ashley McCarthy, `decorationLabel`(1): important!, `decorationIcon`(1): <Question20Regular />, `timestamp`(1): 8:00 AM, `reactions`(1): <Reactions />, `body`(1): Message body |
| `Chat`          | 9      | `role`(1): application                                                                                                                                                                                                                                                                                                                                                                                                                                             |

## `@fluentui-contrib/react-contextual-pane`

### Components

| Component | Usages | Props                              |
| --------- | ------ | ---------------------------------- |
| `Header`  | 5      | `primaryAction`(3): <ToolbarButton |

            key="more-menu"
            appearance="transparent"
            icon={<MoreHorizontalRegular />}
          />, props.primaryAction && (
            <ToolbarButton
              appearance="transparent"
              key="more-menu"
              icon={<MoreHorizontalRegular />}
            />
          ), `secondaryAction`(3): <Avatar
            avatarUrl="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/KatriAthokas.jpg"
            key="avatar"
            users={[
              {
                id: 'avatar-Id-0',
                displayName: 'Katri Athokas',
                avatarUrl:
                  'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/KatriAthokas.jpg',
              },
            ]}
            aria-hidden={true}
          />, props.secondaryAction && (
            <Avatar
              avatarUrl="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/KatriAthokas.jpg"
              key="avatar"
              users={[
                {
                  id: 'avatar-Id-0',
                  displayName: 'Katri Athokas',
                  avatarUrl:
                    'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/KatriAthokas.jpg',
                },
              ]}
              aria-hidden={true}
            />
          ), `caption`(5): This is a title, Copilot, props.caption, This is a very very long long long title, `brandIcon`(3): <WindowRegular fontSize={20} />, props.brandIcon ? <WindowRegular fontSize={20} /> : null, `hasArrowBack`(2): props.hasArrowBack |

| `Footer` | 4 | `toolbarLables`(4): {
leftActionsAriaLabel:
'Left actions ( should be translated string )',
rightActionsAriaLabel:
'Right actions ( should be translated string )',
}, `leftActions`(2): <ToolbarButton
appearance="transparent"
icon={<CursorClickRegular />}
/>, `rightActions`(2): [
<ToolbarButton
appearance="transparent"
key="clipboard"
icon={<ClipboardCheckmarkRegular />}
/>,
<ToolbarButton
appearance="transparent"
key="cloud"
icon={<CloudSyncRegular />}
/>,
] |

## `@fluentui-contrib/react-data-grid-react-window`

### Components

| Component      | Usages | Props                                                                                     |
| -------------- | ------ | ----------------------------------------------------------------------------------------- |
| `DataGridRow`  | 8      | `key`(4): rowId, `style`(4): style                                                        |
| `DataGridBody` | 4      | `itemSize`(4): 50, `height`(4): 400, height - HEADER_HEIGHT, `listProps`(2): listProps, { |

              className: styles.list,
            } |

| `DataGrid` | 4 | `items`(4): items, items.slice(0, 8), `columns`(4): columns, `focusMode`(4): cell, `sortable`(4): true, `selectionMode`(4): multiselect, `className`(1): styles.grid, `style`(1): {
'--scrollbar-width': `${scrollbarWidth}px`,
'--header-height': `${HEADER_HEIGHT}px`,
} as React.CSSProperties, `resizableColumns`(1): true, `resizableColumnsOptions`(1): { autoFitColumns: false } |
| `DataGridHeader` | 4 | `style`(3): { paddingRight: scrollbarWidth }, `className`(1): styles.header |
| `DataGridCell` | 4 | `focusMode`(3): group |
| `DataGridHeaderCell` | 4 | - |
| `RowRenderer` | 0 | - |

## `@fluentui-contrib/react-data-grid-react-window-grid`

### Components

| Component            | Usages | Props                                                                                                                                                             |
| -------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DataGrid`           | 2      | `noNativeElements`(2): true, `sortable`(2): true, `items`(2): items, `columns`(2): columns, `size`(2): 'medium', `bodyRef`(2): bodyRef, `headerRef`(2): headerRef |
| `DataGridBody`       | 2      | `rowHeight`(2): () => ROW_HEIGHT, (index) => ROW_HEIGHT, `height`(2): 500, `width`(2): 1000, `columnWidth`(2): columnWidth, `gridProps`(1): gridProps             |
| `DataGridCell`       | 2      | `style`(2): { ...style, boxSizing: 'border-box' }                                                                                                                 |
| `DataGridHeaderRow`  | 2      | `itemSize`(2): columnWidth, `height`(2): 42, `width`(2): 1000                                                                                                     |
| `DataGridHeaderCell` | 2      | `className`(2): styles.headerCell, `as`(2): div, `style`(2): style                                                                                                |
| `CellRenderer`       | 0      | -                                                                                                                                                                 |

## `@fluentui-contrib/react-draggable-dialog`

### Components

| Component                 | Usages | Props                                                                                                                                                                   |
| ------------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DraggableDialog`         | 5      | `open`(1): open, `modalType`(2): non-modal, `boundary`(2): boundaryRef, null, `margin`(3): margin, 16, `position`(1): position, `onPositionChange`(1): onPositionChange |
| `DraggableDialogSurface`  | 5      | `className`(2): styles.dialog, contentStyles.surface                                                                                                                    |
| `DraggableDialogHandle`   | 5      | `className`(2): styles.handle, contentStyles.handle                                                                                                                     |
| `DraggableDialogPosition` | 0      | -                                                                                                                                                                       |

## `@fluentui-contrib/react-gamepad-navigation`

### Hooks

| Hook                        | Usages | Arguments                    |
| --------------------------- | ------ | ---------------------------- |
| `useGamepadNavigationGroup` | 3      | `focusFirstElement`(3): true |

## `@fluentui-contrib/react-headless-provider`

### Components

| Component                | Usages | Props                               |
| ------------------------ | ------ | ----------------------------------- |
| `HeadlessFluentProvider` | 1      | `targetDocument`(1): targetDocument |

## `@fluentui-contrib/react-interactive-tab`

### Components

| Component        | Usages | Props                                                                                                                     |
| ---------------- | ------ | ------------------------------------------------------------------------------------------------------------------------- |
| `InteractiveTab` | 1      | `key`(1): tab.value, `button`(1): { className: styles.interactiveTab }, `value`(1): tab.value, `contentAfter`(1): <Button |

                appearance="subtle"
                className={styles.dismissButton}
                icon={<DismissIcon />}
                size="small"
                onClick={() => alert('Dismiss button clicked')}
              /> |

## `@fluentui-contrib/react-keytips`

### Components

| Component                   | Usages | Props |
| --------------------------- | ------ | ----- |
| `Keytips`                   | 2      | -     |
| `ExecuteKeytipEventHandler` | 0      | -     |
| `KeytipProps`               | 0      | -     |

### Hooks

| Hook           | Usages | Arguments                                                                                                                                                                                             |
| -------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `useKeytipRef` | 35     | `keySequences`(29): ['1d'], ['1d', '1'], ['1d', '2'], ['1b'], ['1b', 'e'], ['1b', 'f'], ['1a'], ['1c'], ['1e'], ['2ee'], ['4dl'], ['4dl', '1a'], ['gg1'], ['gg2'], [startSequence, 'gg3'], !isVisible |

        ? ['r', ...keytipProps.keySequences]
        : keytipProps.keySequences, ['r'], ['b1'], ['b2'], ['b3'], ['b1', '1'], ['b1', '2'], ['b1', '3'], ['b2', '1'], ['b3', '1'], ['h'], ['v'], ['e'], [...overflowSequence, ...keytipProps.keySequences.slice(-1)], `content`(27): '1D', '1', '2', '1B', 'E', 'F', '1A', '1C', '1E', '2EE', '4DL', 'GG1', 'GG2', 'GG3', 'R', 'B1', 'B2', 'B3', '3', 'H', 'V', `onExecute`(26): onExecute, () => alert('Item A'), () => alert('Item B'), btnExecute, `positioning`(1): { offset: { crossAxis: -50, mainAxis: 5 } }, `dynamic`(2): true, `overflowSequence`(2): !isVisible ? ['r'] : [], !isVisible ? ['h', '00'] : [], `hasMenu`(4): true, `arg0`(4): keytipProps, overflowKeytipProps, keytipsMap.newMail |

## `@fluentui-contrib/react-resize-handle`

### Components

| Component               | Usages | Props |
| ----------------------- | ------ | ----- |
| `UseResizeHandleParams` | 0      | -     |

### Hooks

| Hook              | Usages | Arguments                                                                                                                                                                                                                                                                                               |
| ----------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `useResizeHandle` | 3      | `variableName`(3): NAV_SIZE_CSS_VAR, SIDE_SIZE_CSS_VAR, FOOTER_SIZE_CSS_VAR, `growDirection`(3): 'end', 'start', 'up', `relative`(1): true, `unit`(3): unit, `onChange`(1): handleChange, `onChangeRejected`(1): handleChangeRejected, `onDragStart`(1): handleDragStart, `onDragEnd`(1): handleDragEnd |

## `@fluentui-contrib/react-shadow`

### Other Exports

| Symbol       | Usages |
| ------------ | ------ |
| `root`       | 3      |
| `createRoot` | 1      |

## `@fluentui-contrib/react-themeless-provider`

### Components

| Component                 | Usages | Props |
| ------------------------- | ------ | ----- |
| `ThemelessFluentProvider` | 1      | -     |

### Other Exports

| Symbol                         | Usages |
| ------------------------------ | ------ |
| `createCSSStyleSheetFromTheme` | 1      |

## `@fluentui-contrib/react-tree-grid`

### Components

| Component      | Usages | Props                                                                                                                                                                                                                                                                                            |
| -------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `TreeGridCell` | 59     | `className`(50): mergeClasses(styles.cell, styles.historyRowHeader), styles.cell, styles.descriptionCell, tableCellStyle, mergeClasses(styles.header, styles.container), styles.thumbnail, `header`(16): true, `aria-colspan`(4): 3, 5, 4, `aria-label`(2): `${props.header}. ${props.location}` |
| `TreeGridRow`  | 15     | `open`(4): open, openItems.get(item.value) !== undefined, `onOpenChange`(4): (\_, data) => setOpen(data.open), handleOpenChange, (ev, data) =>                                                                                                                                                   |

        requestOpenChange({ ...data, index: props.index }), `className`(6): mergeClasses(styles.row, styles.historyRow), mergeClasses(styles.row), tableRowStyle, styles.sectionItem, styles.section, `subtree`(6): { children: props.children }, <>
            <TreeGridRow>
              <TreeGridCell className={styles.cell} header>
                Monthly townhall, 10:00 AM to 11:00 AM
              </TreeGridCell>
              <TreeGridCell className={styles.cell}>
                <Button>Chat with participants</Button>
              </TreeGridCell>
              <TreeGridCell className={styles.cell}>
                <Menu>
                  <MenuTrigger disableButtonEnhancement>
                    <Button>More Actions</Button>
                  </MenuTrigger>

                  <MenuPopover>
                    <MenuList>
                      <MenuItem>New </MenuItem>
                      <MenuItem>New Window</MenuItem>
                      <MenuItem disabled>Open File</MenuItem>
                      <MenuItem>Open Folder</MenuItem>
                    </MenuList>
                  </MenuPopover>
                </Menu>
              </TreeGridCell>
              <TreeGridCell className={styles.cell}>
                <Button>Agenda and notes</Button>
              </TreeGridCell>
            </TreeGridRow>
            <TreeGridRow>
              <TreeGridCell className={styles.cell} header>
                Planning for next quarter, 11:00 AM to 12:00 PM
              </TreeGridCell>
              <TreeGridCell className={styles.cell}>
                <Button>Chat with participants</Button>
              </TreeGridCell>
              <TreeGridCell className={styles.cell}>
                <Button>View recap</Button>
              </TreeGridCell>
            </TreeGridRow>
          </>, <>
            <TreeGridRow>
              <TreeGridCell className={styles.cell} header>
                Weekly summary #2, 2:30 PM to 3:30 PM
              </TreeGridCell>
              <TreeGridCell className={styles.cell}>
                <Button>Chat with participants</Button>
              </TreeGridCell>
              <TreeGridCell className={styles.cell}>
                <Button>View recap</Button>
              </TreeGridCell>
              <TreeGridCell className={styles.cell}>
                <Button>Agenda and notes</Button>
              </TreeGridCell>
              <TreeGridCell className={styles.cell}>
                <Button>4 tasks</Button>
              </TreeGridCell>
            </TreeGridRow>
            <TreeGridRow>
              <TreeGridCell className={styles.cell} header>
                Mandatory training #1, 9:00 AM to 10:00 AM
              </TreeGridCell>
              <TreeGridCell className={styles.cell}>
                <Button>Chat with participants</Button>
              </TreeGridCell>
              <TreeGridCell className={styles.cell}>
                <Button>View recap</Button>
              </TreeGridCell>
              <TreeGridCell className={styles.cell}>
                <Button>Agenda and notes</Button>
              </TreeGridCell>
            </TreeGridRow>
            <TreeGridRow>
              <TreeGridCell className={styles.cell} header>
                Meeting with John, 10:15 AM to 11:15 AM
              </TreeGridCell>
              <TreeGridCell className={styles.cell}>
                <Button>Chat with participants</Button>
              </TreeGridCell>
              <TreeGridCell className={styles.cell}>
                <Button>View recap</Button>
              </TreeGridCell>
              <TreeGridCell className={styles.cell}>
                <Button>Agenda and notes</Button>
              </TreeGridCell>
              <TreeGridCell className={styles.cell}>
                <Button>2 tasks</Button>
              </TreeGridCell>
              <TreeGridCell className={styles.cell}>
                <Button>Transcript</Button>
              </TreeGridCell>
            </TreeGridRow>
          </>, props.replies, <>{props.children}</>, true, `aria-description`(3): has contextual menu, `Created by: ${props.owner}. ${
        props.status ? `Meeting status: ${props.status}` : ''
      }`, `data-item-id`(1): item.value, `aria-level`(1): 1, `style`(2): props.style, `data-item-parent-id`(1): item.parentValue |

| `TreeGrid` | 6 | `className`(1): styles.grid, `aria-label`(5): All calls, All meetings, All e-mails, `ref`(1): ref |
| `TreeGridInteraction` | 2 | `className`(1): styles.input, `aria-label`(2): TreeGrid interactive filter input, TreeGrid interactive tablist, `aria-roledescription`(2): interactive content, `aria-description`(2): interact with Enter, then leave with Escape |
| `TreeGridRowTrigger` | 1 | - |
| `TreeGridRowProvider` | 1 | `value`(1): {
open: !!openItems.get(item.parentValue),
level: 1,
requestOpenChange,
} |
| `TreeGridRowOnOpenChangeData` | 0 | - |
| `TreeGridProps` | 0 | - |

### Hooks

| Hook                    | Usages | Arguments |
| ----------------------- | ------ | --------- |
| `useTreeGridRowContext` | 1      | -         |

## `@fluentui-contrib/react-virtualizer`

### Components

| Component                      | Usages | Props                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------------------------------ | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Virtualizer`                  | 8      | `numItems`(8): childLength, `virtualizerLength`(8): virtualizerLength, `bufferItems`(8): bufferItems, `bufferSize`(8): bufferSize, `itemSize`(8): 25, 100, smallSize, itemWidth, itemSize, `containerSizeRef`(8): containerSizeRef, `getItemSize`(1): getSizeForIndex, `virtualizerContext`(1): contextState, `updateScrollPosition`(1): updateScrollPosition, `gap`(1): 20, `axis`(3): 'horizontal', `key`(1): `virtualizer-container-${index}`, `reversed`(3): true |
| `VirtualizerScrollViewDynamic` | 6      | `numItems`(6): childLength, `itemSize`(6): minHeight, baseHeight + bottomCalcDisplayHeight, minHeight + maxHeightMod / 2.0, 100, minHeight + maxHeightIncrease / 2, `container`(6): {                                                                                                                                                                                                                                                                                 |

        role: 'list',
        'aria-label': `Virtualized list with ${childLength} children`,
        tabIndex: 0,
        style: {
          maxHeight: '80vh',
          gap: '20px',
        },
      }, {
          role: 'list',
          className: styles.container,
          style: {
            maxHeight: '80vh',
          },
        }, {
        role: 'list',
        'aria-label': `Virtualized list with ${childLength} children`,
        tabIndex: 0,
        style: { maxHeight: '80vh' },
      }, {
          role: 'list',
          'aria-label': `Virtualized list with ${childLength} children`,
          tabIndex: 0,
          style: { maxHeight: '80vh' },
        }, `bufferItems`(3): 1, `bufferSize`(3): minHeight / 2.0, 30, `gap`(1): 20, `imperativeRef`(2): virtualizerScrollRef, scrollRef, `imperativeVirtualizerRef`(2): virtualizerRef, sizeRef, `enableScrollAnchor`(1): true, `getItemSize`(3): getItemSizeCallback, `enableScrollLoad`(1): true, `enablePagination`(1): true |

| `VirtualizerScrollView` | 3 | `numItems`(3): childLength, `itemSize`(3): 100, `container`(3): {
role: 'list',
'aria-label': `Virtualized list with ${childLength} children`,
tabIndex: 0,
style: { maxHeight: '80vh' },
}, {
role: 'list',
'aria-label': `Virtualized list with ${childLength} children`,
tabIndex: 0,
style: { maxHeight: '80vh' },
}, {
role: 'list',
'aria-label': `Virtualized list with ${childLength} children`,
tabIndex: 0,
className: styles.container,
}, `imperativeRef`(1): scrollRef, `axis`(1): 'horizontal', `enablePagination`(1): true |
| `VirtualizerContextProvider` | 1 | `value`(1): contextState |
| `ScrollToInterface` | 0 | - |
| `VirtualizerDataRef` | 0 | - |

### Hooks

| Hook                           | Usages | Arguments                                                                                                                       |
| ------------------------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------- |
| `useStaticVirtualizerMeasure`  | 7      | `defaultItemSize`(7): 25, 100, itemWidth, itemSize, `direction`(3): 'horizontal'                                                |
| `useDynamicVirtualizerMeasure` | 1      | `defaultItemSize`(1): 100, `getItemSize`(1): getSizeForIndex, `numItems`(1): childLength, `virtualizerContext`(1): contextState |

### Types

| Symbol                           | Usages |
| -------------------------------- | ------ |
| `ScrollToInterface`              | 2      |
| `DynamicVirtualizerContextProps` | 1      |
| `VirtualizerDataRef`             | 1      |

## `@fluentui-contrib/teams-components`

### Components

| Component      | Usages | Props                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| -------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Button`       | 9      | `icon`(6): { children: <CalendarIcon /> }, <CalendarIcon />, `appearance`(6): transparent, primary, `title`(3): Calendar                                                                                                                                                                                                                                                                                                                             |
| `MenuButton`   | 9      | `icon`(6): { children: <CalendarIcon /> }, <CalendarIcon />, `appearance`(6): transparent, primary, `title`(3): Calendar                                                                                                                                                                                                                                                                                                                             |
| `ToggleButton` | 9      | `onClick`(9): createOnClick(1), createOnClick(2), createOnClick(4), createOnClick(5), createOnClick(7), createOnClick(8), createOnClick(3), createOnClick(6), createOnClick(9), `checked`(9): isChecked(1), isChecked(2), isChecked(4), isChecked(5), isChecked(7), isChecked(8), isChecked(3), isChecked(6), isChecked(9), `icon`(6): { children: <CalendarIcon /> }, <CalendarIcon />, `appearance`(6): transparent, primary, `title`(3): Calendar |

## `@fluentui/keyboard-keys`

### Components

| Component    | Usages | Props |
| ------------ | ------ | ----- |
| `Tab`        | 0      | -     |
| `ArrowLeft`  | 0      | -     |
| `Enter`      | 0      | -     |
| `Space`      | 0      | -     |
| `ArrowUp`    | 0      | -     |
| `ArrowDown`  | 0      | -     |
| `ArrowRight` | 0      | -     |
| `Shift`      | 0      | -     |

## `@fluentui/react`

### Components

| Component | Usages | Props |
| --------- | ------ | ----- |
| `IColor`  | 0      | -     |

### Other Exports

| Symbol               | Usages |
| -------------------- | ------ |
| `getColorFromString` | 1      |
| `updateA`            | 1      |

## `@fluentui/react-aria`

### Hooks

| Hook                 | Usages | Arguments                           |
| -------------------- | ------ | ----------------------------------- | --- | ------------------------------------------------------------- |
| `useARIAButtonProps` | 1      | `arg0`(1): child?.type === 'button' |     | child?.type === 'a' ? child.type : 'div', `type`(1): 'button' |

## `@fluentui/react-components`

### Components

| Component | Usages | Props                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| --------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Button`  | 191    | `icon`(42): <CalendarMonthRegular />, <CalendarMonth />, <ArrowReplyRegular fontSize={16} />, <ShareRegular fontSize={16} />, <Dismiss24Regular />, <TextBoldRegular />, <TextUnderlineRegular />, <TextItalicRegular />, <TextAlignLeftRegular />, <TextAlignCenterRegular />, <TextAlignRightRegular />, <CopyRegular />, <CutRegular />, <ClipboardPasteRegular />, <MoreHorizontal20Filled />, open ? <CaretDownFilled /> : <CaretRightFilled />, <DismissFilled aria-label="Enter by voice" />, <FilterFilled />, <MoreHorizontalFilled />, <MoreHorizontal24Regular />, <MoreHorizontal20Regular />, <DismissRegular />, { |

        className: styles.buttonIcon,
        children: <EmojiSmileSlightRegular fontSize={16} />,
      }, <MoreHorizontalRegular />, <DismissIcon />, icon, `appearance`(69): primary, outline, subtle, transparent, secondary, `onClick`(41): () => setIsOpen(true), () => setIsOpen(false), notify, onClick, onCloseDialog, () => {
            setCurrentButton('Button 1');
          }, () => {
            setCurrentButton('Button 2');
          }, () => setShowInput(false), () => setShowInput(true), () => setRunning(true), onClose, () => {
          setWidth(100);
          bodyRef.current?.resetAfterColumnIndex(0);
          headerRef.current?.resetAfterIndex(0);
        }, () => setOpen((isOpen) => !isOpen), () => alert('Dismiss button clicked'), scrollToIndex, addRow, removeRow, () => {
              setCurrentButton('Button 1');
            }, () => {
              setCurrentButton('Button 2');
            }, enterKeytipMode, exitKeytipMode, `aria-label`(26): Close, Bold, Underline, Italic, Align Left, Align Center, Align Right, Copy, Cut, Paste, More items, Filter, More actions, Go to meeting, More options, Smile, more, `type`(1): submit, `ref`(28): dialogBtn, disabledButton, normalButton, offsetButton, dialogButton, dialogInnerButton, firstButton, secondButton, thirdButton, mergedRefs, btnRef, btnRefSecond, ref, disabledKeytipTarget, keytipTarget, keytipMenu, `disabled`(3): true, running, `className`(13): mergeClasses(
                    styles.moreActionsBtn,
                    menuOpen && styles.moreActionsBtnVisible
                  ), mergeClasses(styles.noPadding, styles.image), mergeClasses(styles.noPadding, styles.title), styles.button, styles.dismissButton, my-style-from-outside-react, `size`(5): small, `id`(1): id |

| `FluentProvider` | 86 | `theme`(84): webLightTheme, AzureLightTheme, AzureDarkTheme, theme, `className`(1): sb-unstyled, `style`(73): { backgroundColor: 'transparent' }, { flex: 1, height: '100%', paddingTop: 20 }, { flex: 1, height: '100%', paddingTop: 20, paddingLeft: 20 }, `customStyleHooks_unstable`(1): customStyleHooks |
| `MenuItem` | 86 | `disabled`(6): true, `onClick`(20): onClick, `icon`(9): <Cut20Regular />, <ClipboardPaste20Regular />, <Edit20Regular />, `ref`(13): menuItemA, menuItemB, firstMenuItemRef, secondMenuItemRef, mergedRefs, keytipMenuEnabled, keytipMenuDisabled, keytipRef, `id`(4): keytipProps.id, id |
| `Avatar` | 54 | `name`(48): Lydia Bauer, Amanda Brady, Henry Brill, Robin Counts, Tim Deboer, Cameron Evans, Wanda Howard, Mona Kane, Allan Munger, Erik Nason, Daisy Phillips, Kevin Sturgis, Elliot Woodward, item.author.label, option, props.name, Čestmír Ondřej, Maxim Tobiáš, Kristina Ctibor, E+D HR, user.name, Ashley McCarthy, John Doe, `badge`(41): { status: 'available' }, { status: 'busy' }, { status: 'out-of-office' }, { status: 'away' }, { status: 'offline' }, { status: 'do-not-disturb' }, { status: 'blocked' }, { status: 'available', outOfOffice: true }, { status: 'busy', outOfOffice: true }, { status: 'out-of-office', outOfOffice: true }, { status: 'away', outOfOffice: true }, { status: 'offline', outOfOffice: true }, { status: 'do-not-disturb', outOfOffice: true }, { status: 'blocked', outOfOffice: true }, { status: item.author.status }, {
status: item.author.status as PresenceBadgeStatus,
}, { status: user.status }, `aria-label`(4): item.author.label, `aria-hidden`(10): true, `color`(10): colorful, brown, `shape`(1): square, `role`(1): button, `tabIndex`(1): 0, `className`(2): styles.icon, `icon`(2): <CalendarRegular />, `initials`(2): JD, `size`(2): 48 |
| `Badge` | 47 | `shape`(24): square, rounded, circular, shape, `appearance`(20): appearance, filled, outline, tint, ghost, `size`(19): size, small, large, extra-large, tiny, extra-small, `color`(20): color, important, brand, danger, warning, success, informative, subtle, severe, `iconPosition`(2): iconPosition, `icon`(38): <CircleRegular /> |
| `Menu` | 39 | `positioning`(9): below-end, { autoSize: true }, `key`(2): keytipProps.id, `openOnContext`(1): true, `open`(1): menuOpen, `onOpenChange`(1): (_, data) => setMenuOpen(data.open), `hasIcons`(1): true |
| `MenuTrigger` | 39 | `disableButtonEnhancement`(32): true |
| `MenuPopover` | 38 | - |
| `MenuList` | 36 | - |
| `TableCellLayout` | 28 | `media`(26): item.file.icon, <Avatar
aria-label={item.author.label}
name={item.author.label}
badge={{ status: item.author.status }}
/>, item.lastUpdate.icon, <Avatar
aria-label={item.author.label}
name={item.author.label}
badge={{
                          status: item.author.status as PresenceBadgeStatus,
                        }}
/>, <Avatar badge={{ status: item.author.status }} />, <CalendarClock16Regular />, `truncate`(2): true, `title`(2): item[`column${index}`] |
| `Tab` | 24 | `value`(24): tab1, tab2, tab3, tab4, 1, 2, 3, all, missed, incoming, voicemail, Home, View, Help, `id`(8): 1, 2, 3, Home, View, Help, `ref`(8): refFirstTab, refSecondTab, refThirdTab, homeButtonKeytipRef, valueButtonKeytipRef, helpButtonKeytipRef |
| `Tooltip` | 21 | `content`(21): This is the description of the button, 5 tasks for people to follow up on, 2 files, 8 tasks for people to follow up on, Hello, world!, Hello world!, caption, title, `relationship`(21): description, label, `visible`(1): titleHasEllipsis && isVisibleTooltip, `onVisibleChange`(1): handleTooltipVisibleChange |
| `DialogTrigger` | 20 | `disableButtonEnhancement`(16): true |
| `ToolbarButton` | 20 | `aria-label`(9): Increase Font Size, Decrease Font Size, Reset Font Size, `${overflowCount} more tabs`, toolbarLabels.arrowBackAriaLabel, toolbarLabels.dismissAriaLabel, `appearance`(13): primary, transparent, `icon`(18): <FontIncrease24Regular />, <FontDecrease24Regular />, <TextFont24Regular />, <CursorClickRegular />, <ClipboardCheckmarkRegular />, <CloudSyncRegular />, <MoreHorizontalRegular />, <ArrowLeftRegular />, <DismissRegular />, `ref`(3): mergedRefs, `key`(7): clipboard, cloud, more-menu, `as`(2): button, `onClick`(2): onArrowBackClick, onDismissClick |
| `Label` | 18 | `htmlFor`(13): inputId, id, emailId, passId, sliderId, spinId, `size`(2): props.size, `disabled`(2): props.disabled, `required`(2): true, `id`(1): labelId |
| `Field` | 18 | `label`(12): Example field, Favorite Fruit, Textarea with placeholder, Select Employees, Default Textarea, Margin, X, Y, `validationState`(6): success, none, `validationMessage`(6): This is a success message., Opaque Appearance, Translucent Appearance, `style`(1): { maxWidth: 400 }, `className`(2): styles.pane |
| `Checkbox` | 16 | `checked`(13): option1 && option2 && option3
? true
: !(option1 || option2 || option3)
? false
: 'mixed', option1, option2, option3, fluentProviderEnabled, `onChange`(13): (\_ev, data) => {
setOption1(!!data.checked);
setOption2(!!data.checked);
setOption3(!!data.checked);
}, () => setOption1((checked) => !checked), () => setOption2((checked) => !checked), () => setOption3((checked) => !checked), () => setFluentProviderEnabled(!fluentProviderEnabled), `label`(16): All options, Option 1, Option 2, Option 3, remember email, Checkbox, Use standard FluentProvider, `ref`(2): checkBoxRef |
| `Input` | 16 | `id`(5): inputId, emailId, passId, `name`(2): email, password, `placeholder`(3): Enter a valid email, Placeholder text, Type a message..., `required`(2): true, `type`(4): password, number, `className`(1): styles.input, `autoFocus`(1): true, `onChange`(6): ({ target }) => setMargin(Number(target.value)), onFieldChange('x'), onFieldChange('y'), onChangeGoToIndex, `value`(3): margin.toString(), position.x.toString(), position.y.toString(), `appearance`(1): outline, `defaultValue`(3): '0' |
| `Radio` | 16 | `value`(16): apple, pear, banana, orange, px, viewport, `label`(16): Apple, Pear, Banana, Orange, px, viewport |
| `TreeItem` | 16 | `itemType`(16): branch, leaf |
| `TreeItemLayout` | 16 | - |
| `Link` | 15 | `href`(10): https://react.fluentui.dev, https://www.bing.com, https://bing.com, `mailto:${props.email}`, `ref`(2): linkRef, `target`(2): \_blank |
| `InteractionTag` | 15 | `appearance`(6): outline, brand, `shape`(12): circular, `size`(12): small |
| `InteractionTagPrimary` | 15 | `icon`(15): <CalendarMonth />, <CheckmarkCircleRegular />, <AttachRegular />, `hasSecondaryAction`(3): true, `aria-label`(12): 5 tasks for people to follow up on, 2 files, 8 tasks for people to follow up on |
| `BreadcrumbItem` | 12 | - |
| `BreadcrumbButton` | 12 | `href`(12): path, `icon`(3): <CalendarMonth />, `current`(3): true |
| `DialogContent` | 12 | - |
| `Switch` | 11 | `label`(11): This is a switch, A, B, C, D, E, Toggle animation, `defaultChecked`(1): true, `ref`(2): switchRef, `onChange`(2): (e, data) => setRunning(data.checked), `checked`(2): running |
| `Caption1` | 10 | `className`(7): styles.caption, styles.location, styles.description, `tabIndex`(2): 0 |
| `DialogTitle` | 10 | - |
| `DialogBody` | 10 | - |
| `DialogActions` | 10 | - |
| `AccordionHeader` | 9 | - |
| `AccordionItem` | 9 | `value`(9): 1, 2, 3 |
| `AccordionPanel` | 9 | - |
| `BreadcrumbDivider` | 9 | - |
| `Option` | 9 | `key`(9): option, `item-${index}`, `disabled`(8): option === 'Ferret', `className`(1): styles.option, `aria-posinset`(1): index, `aria-setsize`(1): options.length, `value`(1): index.toString(), `data-testid`(1): `option-${index}` |
| `Toolbar` | 9 | `aria-label`(6): Small, toolbarLables.leftActionsAriaLabel, toolbarLables.rightActionsAriaLabel, toolbarLabels.brandAriaLabel, toolbarLabels.actionsAriaLabel, `size`(6): small, medium, `style`(2): {
border: '2px solid black',
borderRadius: '8px',
}, `className`(1): styles.brandToolbar |
| `OverflowItem` | 8 | `key`(5): i, id, `id`(8): i, keytipProps.id, id, 1 |
| `TableCell` | 8 | - |
| `TabList` | 8 | `defaultSelectedValue`(2): tab2, `onTabSelect`(3): onTabSelect, `selectTabOnFocus`(1): true |
| `Tree` | 8 | `aria-label`(2): Default |
| `ColorSwatch` | 8 | `color`(8): #FF1921, #FF7A00, #90D057, #00B053, #00AFED, #006EBD, #011F5E, #712F9E, `value`(8): FF1921, FF7A00, 90D057, 00B053, 00AFED, 006EBD, 011F5E, 712F9E, `aria-label`(8): red, orange, light green, green, light blue, blue, dark blue, purple, `disabled`(1): true |
| `SplitButton` | 8 | `menuButton`(8): triggerProps, {
...triggerProps,
// @ts-expect-error ref exists
ref: useMergedRefs(splitButton, triggerProps.ref),
}, {
...triggerProps,
// @ts-expect-error ref does not exist on triggerProps type
ref: mergeCallbacks(triggerProps.ref, keytipRef),
}, {
...triggerProps,
ref: useMergedRefs(triggerProps.ref, keytipRef),
}, `primaryActionButton`(5): primaryActionButtonProps, `appearance`(5): primary, outline, subtle, transparent, `ref`(2): mergedRefs, ref, `icon`(2): icon, <MailRegular /> |
| `Dialog` | 7 | `modalType`(2): modalType, modal |
| `DialogSurface` | 7 | `ref`(1): ref, `style`(1): {
...style,
...draggableStyle,
}, `className`(1): mergeClasses(
'fui-DraggableDialogSurface',
styles.root,
className
), `mountNode`(1): mountNode |
| `MenuButton` | 7 | `ref`(2): ref, menuRef, `icon`(5): <CalendarMonthRegular />, `appearance`(4): primary, outline, subtle, transparent |
| `Overflow` | 7 | `minimumVisible`(3): 1 |
| `Text` | 7 | `as`(1): h5, `weight`(1): semibold, `style`(1): { margin: 0 }, `aria-live`(2): polite |
| `DataGridRow` | 6 | `selectionCell`(6): {
checkboxIndicator: { 'aria-label': 'Select all rows' },
}, {
checkboxIndicator: { 'aria-label': 'Select row' },
}, `key`(3): rowId |
| `Skeleton` | 6 | `aria-label`(4): Loading Content, `appearance`(2): translucent, `style`(2): { width: '100%' }, { width: 80 } |
| `SkeletonItem` | 6 | `shape`(2): rectangle, `animation`(2): pulse, `appearance`(2): translucent |
| `Image` | 6 | `src`(6): https://placehold.co/130x70, `alt`(6): Meeting recording |
| `Combobox` | 5 | `aria-labelledby`(4): comboId, labelledBy, `placeholder`(5): Select an animal, Select one or more animals, Select a number, `multiselect`(1): true, `onOptionSelect`(2): onSelect, (_, data) => {
if (data.optionValue) {
selectedIndex.current = parseInt(data.optionValue, 10);
}
}, `id`(1): `${comboId}`, `positioning`(1): { autoSize: 'width' }, `listbox`(1): { ref: mergedRefs, className: styles.listbox }, `onOpenChange`(1): (e, data) => {
clearScrollTimer();
if (data.open) {
setScrollTimer(() => {
mergedRefs.current?.scrollTo({
top: (itemHeight + rowGap) \* selectedIndex.current,
});
}, 0);
}
}, `inlinePopup`(1): true |
| `DataGridHeader` | 5 | `className`(2): styles.tableHeader |
| `RadioGroup` | 5 | `layout`(2): horizontal, `onChange`(1): (_, data) => {
setUnit(data.value as 'px' | 'viewport');
}, `value`(1): unit, `aria-labelledby`(1): labelId |
| `Slider` | 5 | `defaultValue`(5): 20, 10, 30, `id`(5): id, sliderId |
| `SpinButton` | 5 | `defaultValue`(5): 10, 20, 38, `min`(5): 0, 20, 30, `max`(5): 20, 30, 40, `id`(3): spinId |
| `Textarea` | 5 | `placeholder`(4): type here..., Type something, `className`(2): styles.textArea |
| `AvatarGroupItem` | 4 | `name`(4): name, `key`(4): name |
| `Divider` | 4 | - |
| `Dropdown` | 4 | `aria-labelledby`(4): dropdownId, comboId, `placeholder`(4): Select an animal, `multiselect`(1): true |
| `Select` | 4 | `id`(4): selectId |
| `TableRow` | 4 | `key`(2): item.file.label |
| `MenuItemLink` | 4 | `href`(4): https://www.microsoft.com, `target`(1): \_blank |
| `TableCellActions` | 4 | - |
| `Accordion` | 3 | - |
| `Breadcrumb` | 3 | `aria-label`(3): Breadcrumb default example |
| `Body1` | 3 | - |
| `Card` | 3 | `className`(2): styles.card |
| `CardHeader` | 3 | `image`(2): <img
src={resolveAsset('avatar_elvia.svg')}
alt="Elvia Atkins avatar picture"
/>, `header`(3): <Body1>
<b>Elvia Atkins</b> mentioned you
</Body1>, <Text as="h5" weight="semibold" style={{ margin: 0 }}>
App Name
</Text>, `description`(3): <Caption1>5h ago · About us - Overview</Caption1>, <Caption1>Developer</Caption1>, `action`(1): <Button
appearance="transparent"
icon={<MoreHorizontal20Regular />}
aria-label="More options"
/> |
| `DataGridBody` | 3 | - |
| `DataGrid` | 3 | `items`(3): items, `columns`(3): columns, gridColumns, `sortable`(3): true, `selectionMode`(3): multiselect, `getRowId`(3): (item) => item.file.label, `focusMode`(3): composite, `style`(3): { minWidth: '550px' } |
| `DataGridHeaderCell` | 3 | - |
| `DataGridCell` | 3 | - |
| `DrawerBody` | 3 | `tabIndex`(1): 0, `role`(1): group, `aria-label`(1): Example scrolling content |
| `DrawerHeader` | 3 | - |
| `DrawerHeaderTitle` | 3 | `action`(3): <Button
appearance="subtle"
aria-label="Close"
icon={<Dismiss24Regular />}
onClick={() => setIsOpen(false)}
/>, <Button
appearance="subtle"
aria-label="Close"
icon={<DismissRegular />}
onClick={onClose}
/> |
| `InteractionTagSecondary` | 3 | `aria-label`(3): remove |
| `Tag` | 3 | `key`(1): option, `shape`(3): rounded, circular, `media`(1): <Avatar aria-hidden name={option} color="colorful" />, `value`(1): option, `className`(2): mergeClasses(styles.missedTag, styles.tag), `size`(2): small |
| `TabListProvider` | 3 | `value`(3): contextValues.tabList |
| `AvatarGroup` | 2 | - |
| `AvatarGroupPopover` | 2 | - |
| `CardFooter` | 2 | - |
| `CardPreview` | 2 | `logo`(2): <img
src={resolveAsset('docx.png')}
alt="Microsoft Word document"
/> |
| `OverlayDrawer` | 2 | `open`(2): isOpen, `onOpenChange`(2): (_, { open }) => setIsOpen(open) |
| `InfoLabel` | 2 | `info`(2): <>
This is example information for an InfoLabel.{' '}
<Link href="https://react.fluentui.dev">Learn more</Link>
</> |
| `MessageBar` | 2 | `key`(2): intent, `intent`(2): intent |
| `MessageBarTitle` | 2 | - |
| `MessageBarBody` | 2 | - |
| `Persona` | 2 | `name`(2): Kevin Sturgis, `secondaryText`(2): Available, `presence`(2): { status: 'available' }, `avatar`(2): {
image: {
src: 'https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-react-assets/persona-male.png',
},
} |
| `TableBody` | 2 | - |
| `Table` | 2 | `arial-label`(2): Default table, `style`(2): { minWidth: '510px' } |
| `TableHeader` | 2 | - |
| `TableHeaderCell` | 2 | `key`(2): column.columnKey |
| `Toaster` | 2 | `toasterId`(2): toasterId |
| `TagPickerOption` | 2 | `secondaryContent`(1): Microsoft FTE, `media`(1): <Avatar
                        shape="square"
                        aria-hidden
                        name={option}
                        color="colorful"
                      />, `value`(2): option, no-options, `key`(1): option |
| `MenuGroup` | 2 | - |
| `MenuGroupHeader` | 2 | - |
| `RendererProvider` | 2 | `renderer`(2): renderer, `targetDocument`(1): targetDocument |
| `Body1Stronger` | 2 | - |
| `Caption1Stronger` | 2 | - |
| `TableRowIdContextProvider` | 2 | `value`(2): row.rowId |
| `ColumnIdContextProvider` | 2 | `value`(2): columnDef?.columnId, column.columnId, `key`(1): columnDef?.columnId |
| `Toast` | 1 | - |
| `ToastTitle` | 1 | `action`(1): <Link>Undo</Link> |
| `ToastBody` | 1 | `subtitle`(1): Subtitle |
| `ToastFooter` | 1 | - |
| `SwatchPicker` | 1 | `aria-label`(1): SwatchPicker default, `selectedValue`(1): selectedValue, `onSelectionChange`(1): handleSelect |
| `TagPicker` | 1 | `onOptionSelect`(1): onOptionSelect, `selectedOptions`(1): selectedOptions |
| `TagPickerControl` | 1 | - |
| `TagPickerGroup` | 1 | `aria-label`(1): Selected Employees |
| `TagPickerInput` | 1 | `aria-label`(1): Select Employees |
| `TagPickerList` | 1 | - |
| `MenuDivider` | 1 | - |
| `CompoundButton` | 1 | `ref`(1): compoundButton, `icon`(1): <CalendarMonthRegular />, `secondaryContent`(1): Keytips |
| `PortalMountNodeProvider` | 1 | `value`(1): root |
| `Title2` | 1 | `className`(1): styles.h2, `as`(1): h2 |
| `Drawer` | 1 | `type`(1): overlay, `position`(1): position, `size`(1): size, `open`(1): isOpen, `onOpenChange`(1): (\_, { open }) => setIsOpen(open) |
| `DrawerFooter` | 1 | - |
| `AvatarFluent` | 1 | `className`(1): v9ClassName, `name`(1): user?.displayName, `size`(1): 20, `image`(1): {
src: avatarUrl ?? user?.avatarUrl,
} |
| `Portal` | 1 | `mountNode`(1): {
className: classes.portal,
...state.mountNode,
} |
| `PresenceBadgeStatus` | 0 | - |
| `TableColumnDefinition` | 0 | - |
| `FieldProps` | 0 | - |
| `InfoLabelProps` | 0 | - |
| `MessageBarIntent` | 0 | - |
| `OverflowItemProps` | 0 | - |
| `RadioGroupProps` | 0 | - |
| `SwatchPickerOnSelectEventHandler` | 0 | - |
| `TagPickerProps` | 0 | - |
| `MenuButtonProps` | 0 | - |
| `ComboboxProps` | 0 | - |
| `Slot` | 0 | - |
| `HeadlessFlatTreeItemProps` | 0 | - |
| `ForwardRefComponent` | 0 | - |
| `BrandVariants` | 0 | - |
| `BadgeState` | 0 | - |
| `ButtonState` | 0 | - |
| `CardFooterState` | 0 | - |
| `CardHeaderState` | 0 | - |
| `CardState` | 0 | - |
| `DialogBodyState` | 0 | - |
| `DialogSurfaceState` | 0 | - |
| `DrawerBodyState` | 0 | - |
| `DrawerFooterState` | 0 | - |
| `DrawerHeaderNavigationState` | 0 | - |
| `DrawerHeaderState` | 0 | - |
| `DrawerHeaderTitleState` | 0 | - |
| `DrawerState` | 0 | - |
| `FluentProviderProps` | 0 | - |
| `InputState` | 0 | - |
| `InlineDrawerState` | 0 | - |
| `OverlayDrawerState` | 0 | - |
| `Theme` | 0 | - |
| `DrawerProps` | 0 | - |
| `AvatarProps` | 0 | - |
| `BadgeProps` | 0 | - |
| `DialogProps` | 0 | - |
| `SlotClassNames` | 0 | - |
| `TooltipProps` | 0 | - |
| `DataGridProps` | 0 | - |
| `DataGridContextValues` | 0 | - |
| `TableRowData` | 0 | - |
| `DataGridHeaderProps` | 0 | - |
| `DataGridHeaderState` | 0 | - |
| `DataGridRowProps` | 0 | - |
| `DataGridRowState` | 0 | - |
| `DataGridState` | 0 | - |
| `DataGridHeaderCellProps` | 0 | - |
| `DataGridHeaderCellState` | 0 | - |
| `DataGridContextValue` | 0 | - |
| `DataGridRowSlots` | 0 | - |
| `DialogSurfaceProps` | 0 | - |
| `PortalProps` | 0 | - |
| `ComponentProps` | 0 | - |
| `ComponentState` | 0 | - |
| `SelectTabData` | 0 | - |
| `SelectTabEvent` | 0 | - |
| `TabValue` | 0 | - |
| `SplitButtonProps` | 0 | - |
| `ButtonProps` | 0 | - |
| `GriffelStyle` | 0 | - |
| `ToggleButtonProps` | 0 | - |

### Hooks

| Hook               | Usages | Arguments                                                                                                                                                                                                                                                                                                             |
| ------------------ | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `useFluent`        | 31     | -                                                                                                                                                                                                                                                                                                                     |
| `useMergedRefs`    | 23     | `arg0`(23): splitButton, ref, navWrapperRef, handle.elementRef, state.body.ref, baseState.root.ref, props.bodyRef, props.headerRef, state.content.ref, triggerProps.ref, scrollRef, `arg1`(21): triggerProps.ref, keytipRef, menuRef, sideWrapperRef, elementRef, triggerRef as React.MutableRefObject<HTMLDivElement | null>, setupScrollRef, innerBodyRef, innerHeaderRef, forwardedRef, containerRef, useFocusVisible<HTMLDivElement>({ targetDocument }), `arg2`(1): footerWrapperRef |
| `useId`            | 21     | `arg0`(17): 'combo-default', 'dropdown-default', 'input', 'toaster', 'spin-button', 'slider-default', 'select-default', 'window', 'label-', 'draggable-dialog-', 'keytip-', 'combobox', `arg1`(2): shadowDOMAPI?.windowId, `keytip-${id}`                                                                             |
| `useEventCallback` | 12     | `arg0`(12): (data: TreeGridRowOnOpenChangeData & { index: number }) => {                                                                                                                                                                                                                                              |

      const row = data.event.currentTarget;
      if (isHTMLElement(row)) {
        const id = row.dataset.itemId;
        if (id) {
          setOpenItems((prev) => {
            const next = new Map(prev);
            if (data.open) {
              next.set(id, data.index);
            } else {
              next.delete(id);
            }
            return next;
          });
        }
      }
    }, (event: KeyboardEvent) => {
    if (!isSupportedKey(growDirection, event.key)) {
      return;
    }

    const currentValue = getCurrentValue();

    const multiplier = multipliers[growDirection][event.key] ?? 1;
    const directionMultiplier =
      dir === 'rtl' && ['start', 'end'].includes(growDirection) ? -1 : 1;
    const offset =
      multiplier * unitHandle.getOffsetStep() * directionMultiplier;

    onValueChange(event, {
      event,
      value: unitHandle.roundValue(currentValue + offset),
      type: EVENTS.keyboard,
      unit: unitHandle.name,
    });

}, (event: NativeTouchOrMouseEvent) => {
const { clientX, clientY } = getEventClientCoords(event);
const deltaCoords = [
clientX - dragStartOriginCoords.current.clientX,
clientY - dragStartOriginCoords.current.clientY,
];

      let newValue = startValue.current;

      switch (growDirection) {
        case 'end':
          newValue += unitHandle.fromPxToValue(
            deltaCoords[0] * (dir === 'rtl' ? -1 : 1)
          );
          break;
        case 'start':
          newValue -= unitHandle.fromPxToValue(
            deltaCoords[0] * (dir === 'rtl' ? -1 : 1)
          );
          break;
        case 'up':
          newValue -= unitHandle.fromPxToValue(deltaCoords[1]);
          break;
        case 'down':
          newValue += unitHandle.fromPxToValue(deltaCoords[1]);
          break;
      }

      onValueChange(event, {
        value: unitHandle.roundValue(newValue),
        unit: unitHandle.name,
        ...(isTouchEvent(event)
          ? { event, type: EVENTS.touch }
          : { event, type: EVENTS.mouse }),
      });
    }, (event: NativeTouchOrMouseEvent) => {
    if (targetWindow) {
      rafIdRef.current = targetWindow.requestAnimationFrame(() =>
        recalculatePosition(event)
      );
    }

}, (event: NativeTouchOrMouseEvent) => {
if (isMouseEvent(event)) {
targetDocument?.removeEventListener('mouseup', onDragEnd);
targetDocument?.removeEventListener('mousemove', onDrag);
}

    if (isTouchEvent(event)) {
      targetDocument?.removeEventListener('touchend', onDragEnd);
      targetDocument?.removeEventListener('touchmove', onDrag);
    }

    // Heads up!
    //
    // To keep the order of events, we need to cancel the animation frame i.e. the order should be always:
    // - onChange
    // - onDragEnd

    if (targetWindow && rafIdRef.current) {
      targetWindow.cancelAnimationFrame(rafIdRef.current);
    }

    recalculatePosition(event);
    params.onDragEnd?.(
      event,
      isTouchEvent(event)
        ? { event, type: EVENTS.touch, unit: unitHandle.name }
        : { event, type: EVENTS.mouse, unit: unitHandle.name }
    );

}, (event: NativeTouchOrMouseEvent) => {
dragStartOriginCoords.current = getEventClientCoords(event);
// As we start dragging, save the current value otherwise the value increases,
// the delta compounds and the element grows/shrinks too fast.
startValue.current = getCurrentValue();

    if (event.defaultPrevented) {
      return;
    }

    if (isMouseEvent(event)) {
      // ignore other buttons than primary mouse button
      if (event.target !== event.currentTarget || event.button !== 0) {
        return;
      }
      targetDocument?.addEventListener('mouseup', onDragEnd);
      targetDocument?.addEventListener('mousemove', onDrag);
    }

    if (isTouchEvent(event)) {
      targetDocument?.addEventListener('touchend', onDragEnd);
      targetDocument?.addEventListener('touchmove', onDrag);
    }

    params.onDragStart?.(
      event,
      isTouchEvent(event)
        ? { event, type: EVENTS.touch, unit: unitHandle.name }
        : { event, type: EVENTS.mouse, unit: unitHandle.name }
    );

}, (e, data) => {
onDragStart?.(e, {
...data,
value: currentValue.current,
} as ResizeHandleUpdateEventData);
}, (e, data) => {
onDragEnd?.(e, {
...data,
value: currentValue.current,
} as ResizeHandleUpdateEventData);
}, onPositionChange, (event: React.KeyboardEvent<HTMLDivElement>) => {
props.onKeyDown?.(event);
if (!isHTMLElement(event.target)) {
return;
}
// TreeGridRow
if (event.target.role === 'row') {
handleTreeGridRowKeyDown(event);
return;
}
const row = event.target.closest<HTMLElement>('[role=row]');
if (!row) {
return;
}
// TreeGridInteraction
if (event.target.role === 'group') {
handleTreeGridInteractionCellKeyDown(event, row);
return;
}
const wrapper = event.target.closest<HTMLDivElement>(
'[role=row],[role=group],[role=rowheader],[role=gridcell]'
);
// if the target is inside a TreeGridInteraction,
// keydown should be handled by the interaction cell
if (wrapper?.role === 'group') {
return;
}
// TreeGridCell
handleTreeGridCellKeyDown(event, row);
}, (event: React.KeyboardEvent<HTMLDivElement>) => {
props.onKeyDown?.(event);
if (event.target !== event.currentTarget) return;
switch (event.key) {
case Enter: {
return event.currentTarget.click();
}
case ArrowRight: {
if (open === false) {
requestOpenChange({ open: true, event, type: 'keydown' });
}
return;
}
case ArrowLeft: {
if (open === true) {
requestOpenChange({ open: false, event, type: 'keydown' });
}
return;
}
}
}, (event: React.MouseEvent<HTMLDivElement>) => {
props.onClick?.(event);
let element = event.target as HTMLElement | SVGElement | null;
while (element && element !== event.currentTarget) {
if (element.tabIndex >= 0) return;
element = element.parentElement;
}
requestOpenChange({ open: !open, event, type: 'click' });
} |
| `useIsOverflowItemVisible` | 7 | `arg0`(7): id, keytipProps.id |
| `useScrollbarWidth` | 6 | `targetDocument`(6): targetDocument |
| `useFocusableGroup` | 6 | `ignoreDefaultKeydown`(3): { Enter: true }, `tabBehavior`(4): 'limited-trap-focus' |
| `useBaseState` | 6 | `'aria-rowcount'`(2): props.items.length, `containerWidthOffset`(2): containerWidthOffset, `arg1`(6): ref, `arg0`(1): props, `'aria-rowindex'`(2): rowIndex, `'aria-colindex'`(2): colIndex, `'aria-colcount'`(1): columns.length |
| `useOverflowMenu` | 4 | - |
| `useTimeout` | 3 | - |
| `useFocusFinders` | 2 | - |
| `useArrowNavigationGroup` | 2 | `axis`(2): 'vertical', 'horizontal', `memorizeCurrent`(2): true, `unstable_hasDefault`(1): true |
| `usePopoverContext_unstable` | 2 | `arg0`(2): (context) => context.setOpen, (context) => context.triggerRef |
| `useDataGridContextValues_unstable` | 2 | `arg0`(2): state |
| `useDataGridStyles_unstable` | 2 | `arg0`(2): state |
| `useDataGridBodyBase_unstable` | 2 | `children`(2): renderRowWithUnknown, () => null, `arg1`(2): ref |
| `useDataGridBodyStylesBase_unstable` | 2 | `renderRow`(2): () => null |
| `useDataGridContext_unstable` | 2 | `arg0`(2): (cxt) => cxt.columns, (ctx) => ctx.columns |
| `useFluentProviderContextValues_unstable` | 2 | `arg0`(2): state |
| `useToastController` | 1 | `arg0`(1): toasterId |
| `useTableRowStyles_unstable` | 1 | `noNativeElements`(1): true |
| `useTableRow_unstable` | 1 | `arg1`(1): React.createRef() |
| `useTableCell_unstable` | 1 | `arg1`(1): React.createRef() |
| `useTableHeader_unstable` | 1 | `arg1`(1): React.createRef() |
| `useTableHeaderCell_unstable` | 1 | `arg1`(1): React.createRef() |
| `useTableCellStyles_unstable` | 1 | `noNativeElements`(1): true |
| `useTableHeaderStyles_unstable` | 1 | `noNativeElements`(1): true |
| `useTableHeaderCellStyles_unstable` | 1 | `noNativeElements`(1): true |
| `useBadgeStyles_unstable` | 1 | `arg0`(1): state |
| `useDialogBodyStyles_unstable` | 1 | `arg0`(1): state |
| `useDialogSurfaceStyles_unstable` | 1 | `arg0`(1): state |
| `useIsomorphicLayoutEffect` | 1 | `arg0`(1): () => {
callbackRef.current = fn;
}, `arg1`(1): [fn] |
| `useDataGridHeaderStylesBase_unstable` | 1 | `arg0`(1): state |
| `useDataGridRowStyles_unstable` | 1 | `arg0`(1): state as unknown as DataGridRowState |
| `useDataGridRowStylesBase_unstable` | 1 | `arg0`(1): state |
| `useDataGridRow_unstable` | 1 | `children`(1): () => null, `'aria-rowindex'`(1): 1, `arg1`(1): ref |
| `useDataGridCellStyles_unstable` | 1 | `arg0`(1): state |
| `useDataGridHeaderCell_unstable` | 1 | `arg0`(1): props, `arg1`(1): ref |
| `useDataGridHeaderCellStyles_unstable` | 1 | `arg0`(1): state |
| `useAnimationFrame` | 1 | - |
| `useTab_unstable` | 1 | `arg0`(1): props, `arg1`(1): ref |
| `useIsSSR` | 1 | - |
| `useFocusVisible` | 1 | `targetDocument`(1): targetDocument |
| `useButton_unstable` | 1 | `arg0`(1): props, `arg1`(1): ref |
| `useButtonStyles_unstable` | 1 | `arg0`(1): state |
| `useMenuButton_unstable` | 1 | `arg0`(1): props, `arg1`(1): ref |
| `useMenuButtonStyles_unstable` | 1 | `arg0`(1): state |
| `useToggleButtonStyles_unstable` | 1 | `arg0`(1): state |
| `useToggleButton_unstable` | 1 | `arg0`(1): props, `arg1`(1): ref |
| `useDataGrid_unstable` | 0 | - |
| `useDataGridBody_unstable` | 0 | - |
| `useDataGridBodyStyles_unstable` | 0 | - |
| `useDataGridHeader_unstable` | 0 | - |
| `useDataGridHeaderStyles_unstable` | 0 | - |
| `useDataGridCell_unstable` | 0 | - |

### Types

| Symbol                        | Usages |
| ----------------------------- | ------ |
| `JSXElement`                  | 46     |
| `ForwardRefComponent`         | 9      |
| `ComponentProps`              | 7      |
| `Slot`                        | 7      |
| `BrandVariants`               | 5      |
| `ComponentState`              | 5      |
| `SlotClassNames`              | 4      |
| `FluentProviderState`         | 4      |
| `Theme`                       | 3      |
| `PartialTheme`                | 3      |
| `SelectTabData`               | 2      |
| `SelectTabEvent`              | 2      |
| `TabValue`                    | 2      |
| `GriffelStyle`                | 2      |
| `TableRowData`                | 2      |
| `DataGridBodyProps`           | 2      |
| `DataGridBodySlots`           | 2      |
| `DataGridBodyState`           | 2      |
| `DataGridRowState`            | 2      |
| `TableColumnDefinition`       | 2      |
| `DataGridCellProps`           | 2      |
| `FluentProviderProps`         | 2      |
| `TabState`                    | 2      |
| `FluentProviderSlots`         | 2      |
| `AvatarGroupProps`            | 1      |
| `ComboboxProps`               | 1      |
| `DropdownProps`               | 1      |
| `InputProps`                  | 1      |
| `PersonaProps`                | 1      |
| `SelectProps`                 | 1      |
| `SkeletonProps`               | 1      |
| `ColorTokens`                 | 1      |
| `TabListProps`                | 1      |
| `ButtonProps`                 | 1      |
| `ButtonState`                 | 1      |
| `DataGridState`               | 1      |
| `DataGridRowProps`            | 1      |
| `DataGridContextValue`        | 1      |
| `DataGridCellState`           | 1      |
| `TabListContextValue`         | 1      |
| `TabSlots`                    | 1      |
| `TabProps`                    | 1      |
| `PositioningProps`            | 1      |
| `FluentProviderContextValues` | 1      |

### Other Exports

| Symbol                              | Usages |
| ----------------------------------- | ------ |
| `makeStyles`                        | 93     |
| `mergeClasses`                      | 42     |
| `tokens`                            | 32     |
| `shorthands`                        | 19     |
| `slot`                              | 12     |
| `createTableColumn`                 | 8      |
| `webLightTheme`                     | 6      |
| `assertSlots`                       | 6      |
| `getIntrinsicElementProps`          | 6      |
| `makeResetStyles`                   | 3      |
| `getPartitionedNativeProps`         | 3      |
| `getSlots`                          | 3      |
| `createDarkTheme`                   | 2      |
| `createFocusOutlineStyle`           | 2      |
| `renderDataGrid_unstable`           | 2      |
| `partitionAvatarGroupItems`         | 1      |
| `teamsLightV21Theme`                | 1      |
| `createDOMRenderer`                 | 1      |
| `mergeCallbacks`                    | 1      |
| `createCSSRuleFromTheme`            | 1      |
| `createLightTheme`                  | 1      |
| `typographyStyles`                  | 1      |
| `createCustomFocusIndicatorStyle`   | 1      |
| `renderDataGridHeader_unstable`     | 1      |
| `renderDataGridRow_unstable`        | 1      |
| `renderDataGridCell_unstable`       | 1      |
| `renderDataGridHeaderCell_unstable` | 1      |
| `renderFluentProvider_unstable`     | 1      |
| `resolvePositioningShorthand`       | 1      |
| `renderButton_unstable`             | 1      |
| `renderMenuButton_unstable`         | 1      |
| `renderToggleButton_unstable`       | 1      |

## `@fluentui/react-icons`

### Components

| Component                      | Usages | Props                                   |
| ------------------------------ | ------ | --------------------------------------- |
| `CircleRegular`                | 38     | -                                       |
| `CheckmarkCircle20Filled`      | 19     | `color`(19): #6bb700                    |
| `OpenRegular`                  | 14     | -                                       |
| `CalendarMonthRegular`         | 10     | -                                       |
| `FolderRegular`                | 8      | -                                       |
| `PeopleRegular`                | 8      | -                                       |
| `AttachRegular`                | 8      | -                                       |
| `MoreHorizontalRegular`        | 8      | -                                       |
| `EditRegular`                  | 7      | -                                       |
| `DocumentRegular`              | 7      | -                                       |
| `DocumentPdfRegular`           | 7      | -                                       |
| `VideoRegular`                 | 7      | -                                       |
| `CheckmarkCircleRegular`       | 4      | -                                       |
| `ClipboardPaste20Regular`      | 3      | -                                       |
| `Cut20Regular`                 | 3      | -                                       |
| `DismissCircle20Filled`        | 3      | `color`(3): #c50f1f                     |
| `Edit20Regular`                | 3      | -                                       |
| `WindowRegular`                | 3      | `fontSize`(3): 20                       |
| `SettingsRegular`              | 3      | -                                       |
| `ArrowReplyRegular`            | 2      | `fontSize`(2): 16                       |
| `ShareRegular`                 | 2      | `fontSize`(2): 16                       |
| `Dismiss24Regular`             | 2      | -                                       |
| `FontIncrease24Regular`        | 2      | -                                       |
| `FontDecrease24Regular`        | 2      | -                                       |
| `TextFont24Regular`            | 2      | -                                       |
| `ErrorCircle20Filled`          | 2      | `color`(2): #fce100                     |
| `MoreHorizontal20Filled`       | 2      | -                                       |
| `CaretRightFilled`             | 2      | `aria-hidden`(1): true                  |
| `CaretDownFilled`              | 2      | `aria-hidden`(1): true                  |
| `CalendarRegular`              | 2      | -                                       |
| `DismissRegular`               | 2      | -                                       |
| `EmojiSmileSlightRegular`      | 2      | `fontSize`(2): 16                       |
| `Question20Regular`            | 2      | -                                       |
| `CursorClickRegular`           | 2      | -                                       |
| `ClipboardCheckmarkRegular`    | 2      | -                                       |
| `CloudSyncRegular`             | 2      | -                                       |
| `CalendarClock16Regular`       | 2      | -                                       |
| `FlagRegular`                  | 2      | -                                       |
| `MailRegular`                  | 2      | -                                       |
| `InfoFilled`                   | 1      | `className`(1): styles.nativePropsIcon  |
| `ClipboardPasteRegular`        | 1      | -                                       |
| `CopyRegular`                  | 1      | -                                       |
| `CutRegular`                   | 1      | -                                       |
| `TextAlignCenterRegular`       | 1      | -                                       |
| `TextAlignLeftRegular`         | 1      | -                                       |
| `TextAlignRightRegular`        | 1      | -                                       |
| `TextBoldRegular`              | 1      | -                                       |
| `TextItalicRegular`            | 1      | -                                       |
| `TextUnderlineRegular`         | 1      | -                                       |
| `MoreHorizontalFilled`         | 1      | -                                       |
| `FilterFilled`                 | 1      | -                                       |
| `DismissFilled`                | 1      | `aria-label`(1): Enter by voice         |
| `ChevronRightRegular`          | 1      | `aria-hidden`(1): true                  |
| `ChevronDownRegular`           | 1      | `aria-hidden`(1): true                  |
| `MoreHorizontal24Regular`      | 1      | -                                       |
| `MoreHorizontal20Regular`      | 1      | -                                       |
| `CheckmarkCircle16Regular`     | 1      | -                                       |
| `Circle16Regular`              | 1      | -                                       |
| `Clock16Regular`               | 1      | -                                       |
| `Eye16Filled`                  | 1      | -                                       |
| `Flag16Filled`                 | 1      | -                                       |
| `Warning16Filled`              | 1      | -                                       |
| `AlertUrgentFilled`            | 1      | -                                       |
| `ImportantFilled`              | 1      | -                                       |
| `MentionFilled`                | 1      | -                                       |
| `PeopleFilled`                 | 1      | -                                       |
| `ArrowLeftRegular`             | 1      | -                                       |
| `PersonCallRegular`            | 1      | -                                       |
| `PeopleCallRegular`            | 1      | -                                       |
| `HeadsetRegular`               | 1      | -                                       |
| `DeleteRegular`                | 1      | -                                       |
| `ArchiveRegular`               | 1      | -                                       |
| `DocumentAddRegular`           | 1      | -                                       |
| `ShieldKeyholeRegular`         | 1      | -                                       |
| `PinRegular`                   | 1      | -                                       |
| `FlashRegular`                 | 1      | -                                       |
| `MailUnreadRegular`            | 1      | -                                       |
| `ZoomInRegular`                | 1      | -                                       |
| `ArrowSyncRegular`             | 1      | -                                       |
| `LayoutCellFourRegular`        | 1      | -                                       |
| `TextDensityRegular`           | 1      | -                                       |
| `IconDirectionContextProvider` | 1      | `value`(1): contextValues.iconDirection |
| `CalendarMonthFilled`          | 0      | -                                       |
| `CalendarFilled`               | 0      | -                                       |

### Other Exports

| Symbol       | Usages |
| ------------ | ------ |
| `bundleIcon` | 8      |

## `@fluentui/react-jsx-runtime`

### Components

| Component  | Usages | Props |
| ---------- | ------ | ----- |
| `Fragment` | 0      | -     |

### Other Exports

| Symbol          | Usages |
| --------------- | ------ |
| `createElement` | 14     |

## `@fluentui/react-migration-v8-v9`

### Components

| Component     | Usages | Props |
| ------------- | ------ | ----- |
| `AlphaColors` | 0      | -     |
| `Greys`       | 0      | -     |

### Other Exports

| Symbol       | Usages |
| ------------ | ------ |
| `black`      | 1      |
| `white`      | 1      |
| `grey`       | 1      |
| `whiteAlpha` | 1      |
| `blackAlpha` | 1      |

## `@fluentui/react-positioning`

### Hooks

| Hook             | Usages | Arguments                     |
| ---------------- | ------ | ----------------------------- |
| `usePositioning` | 1      | `arg0`(1): positioningOptions |

### Other Exports

| Symbol              | Usages |
| ------------------- | ------ |
| `createSlideStyles` | 1      |

## `@fluentui/react-shared-contexts`

### Components

| Component                               | Usages | Props                                                                                         |
| --------------------------------------- | ------ | --------------------------------------------------------------------------------------------- |
| `Provider_unstable`                     | 3      | `value`(3): { dir: 'ltr', targetDocument: document }                                          |
| `Provider`                              | 1      | `value`(1): contextValues.provider                                                            |
| `CustomStyleHooksProvider`              | 1      | `value`(1): contextValues.customStyleHooks_unstable as Required<CustomStyleHooksContextValue> |
| `TooltipVisibilityProvider`             | 1      | `value`(1): contextValues.tooltip                                                             |
| `OverridesProvider`                     | 1      | `value`(1): contextValues.overrides_unstable                                                  |
| `CustomStyleHooksContext_unstable`      | 0      | -                                                                                             |
| `OverridesProvider_unstable`            | 0      | -                                                                                             |
| `TooltipVisibilityProvider_unstable`    | 0      | -                                                                                             |
| `CustomStyleHooksProvider_unstable`     | 0      | -                                                                                             |
| `CustomStyleHooksContextValue_unstable` | 0      | -                                                                                             |

### Hooks

| Hook                          | Usages | Arguments                                                                                                                               |
| ----------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| `useFluent`                   | 6      | -                                                                                                                                       |
| `useCustomStyleHook_unstable` | 3      | `arg0`(3): 'useVirtualizerStyles_unstable', 'useVirtualizerScrollViewStyles_unstable', 'useVirtualizerScrollViewDynamicStyles_unstable' |
| `useOverrides`                | 2      | -                                                                                                                                       |
| `useFluent_unstable`          | 0      | -                                                                                                                                       |
| `useOverrides_unstable`       | 0      | -                                                                                                                                       |

### Types

| Symbol                                  | Usages |
| --------------------------------------- | ------ |
| `CustomStyleHooksContextValue_unstable` | 2      |

## `@fluentui/react-tabs`

### Hooks

| Hook                             | Usages | Arguments                                    |
| -------------------------------- | ------ | -------------------------------------------- |
| `useTabButtonStyles_unstable`    | 1      | `arg0`(1): tabState, `arg1`(1): state.button |
| `useTabContentStyles_unstable`   | 1      | `arg0`(1): tabState                          |
| `useTabIndicatorStyles_unstable` | 1      | `arg0`(1): tabState                          |

## `@fluentui/react-tabster`

### Components

| Component                        | Usages | Props |
| -------------------------------- | ------ | ----- |
| `MoverMoveFocusEvent`            | 0      | -     |
| `TabsterDOMAttribute`            | 0      | -     |
| `UseArrowNavigationGroupOptions` | 0      | -     |
| `UseFocusableGroupOptions`       | 0      | -     |
| `MoverKeys`                      | 0      | -     |
| `GroupperMoveFocusActions`       | 0      | -     |
| `GroupperMoveFocusEvent`         | 0      | -     |

### Hooks

| Hook                                  | Usages | Arguments                                                  |
| ------------------------------------- | ------ | ---------------------------------------------------------- |
| `useMergedTabsterAttributes_unstable` | 4      | `arg0`(4): groupperDOMAttribute, useArrowNavigationGroup({ |

            axis: 'vertical',
            memorizeCurrent: true,
          }), useFocusableGroup({
        tabBehavior: 'limited-trap-focus',
      }), useArrowNavigationGroup({
        axis: 'horizontal',
        memorizeCurrent: true,
      }), `arg1`(4): moverDOMAttribute, props as TabsterDOMAttribute, props as unknown as TabsterDOMAttribute, useFocusableGroup({
        tabBehavior: 'limited-trap-focus',
        ignoreDefaultKeydown: { Enter: true },
      }), `arg2`(1): props as TabsterDOMAttribute |

| `useArrowNavigationGroup` | 2 | `axis`(2): axis, 'vertical', `circular`(1): circular, `memorizeCurrent`(2): memorizeCurrent, true, `tabbable`(1): tabbable, `ignoreDefaultKeydown`(1): ignoreDefaultKeydown, `unstable_hasDefault`(1): unstable_hasDefault |
| `useFocusableGroup` | 1 | `tabBehavior`(1): tabBehavior, `ignoreDefaultKeydown`(1): ignoreDefaultKeydown |
| `useFocusFinders` | 1 | - |

## `@fluentui/react-utilities`

### Components

| Component                 | Usages | Props |
| ------------------------- | ------ | ----- |
| `EventHandler`            | 0      | -     |
| `NativeTouchOrMouseEvent` | 0      | -     |
| `JSXElement`              | 0      | -     |
| `EventData`               | 0      | -     |
| `FluentTriggerComponent`  | 0      | -     |
| `TriggerProps`            | 0      | -     |

### Hooks

| Hook                   | Usages | Arguments                                                                                                                                                                                                                             |
| ---------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `useTimeout`           | 4      | -                                                                                                                                                                                                                                     |
| `useMergedRefs`        | 4      | `arg0`(4): container, props.scrollViewRef, React.useRef<VirtualizerDataRef>(null), `arg1`(4): useResizeObserverRef_unstable(resizeCallback), scrollRef, imperativeVirtualizerRef, `arg2`(2): paginationRef, `arg3`(1): localScrollRef |
| `useControllableState` | 2      | `state`(2): props.open, visible, `initialState`(2): false, `defaultState`(1): props.defaultOpen                                                                                                                                       |
| `useEventCallback`     | 2      | `arg0`(2): (data: TreeGridRowOnOpenChangeData) => {                                                                                                                                                                                   |

      props.onOpenChange?.(data.event, data);
      setOpen(data.open);
    }, (event: React.MouseEvent) => {
    child?.props.onClick?.(event);
    if (!event.isDefaultPrevented()) {
      requestOpenChange({ open: !open, event, type: 'click' });
    }

} |
| `useIsomorphicLayoutEffect` | 2 | `arg0`(2): () => {
if (virtualizerContext.contextIndex + virtualizerLength < numItems) {
// Avoid re-rendering/re-calculating when the end index has already been reached
handleScrollResize(container);
}
}, () => {
if (!win) {
return;
}

    observer.current = new win.IntersectionObserver(callback, {
      ...observerInit,
      rootMargin: getRTLRootMargin(
        ltrRootMargin.current,
        observerInit?.root,
        win
      ),
    });

    // If we have an instance of IO and a list with elements, observer the elements
    if (observer.current && observerList && observerList.length > 0) {
      observerList.forEach((element) => {
        observer.current?.observe(element);
      });
    }

    // clean up previous elements being listened to
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };

}, `arg1`(2): [
handleScrollResize,
numItems,
virtualizerContext.contextIndex,
virtualizerLength,
], [observerList, observerInit, callback, win] |
| `useAnimationFrame` | 2 | - |
| `usePrevious` | 1 | `arg0`(1): keytip |

### Types

| Symbol                | Usages |
| --------------------- | ------ |
| `EventHandler`        | 4      |
| `EventData`           | 3      |
| `SlotClassNames`      | 3      |
| `ComponentProps`      | 3      |
| `ComponentState`      | 3      |
| `JSXElement`          | 2      |
| `Slot`                | 2      |
| `ForwardRefComponent` | 1      |

### Other Exports

| Symbol                        | Usages |
| ----------------------------- | ------ |
| `assertSlots`                 | 4      |
| `slot`                        | 3      |
| `isHTMLElement`               | 2      |
| `getEventClientCoords`        | 1      |
| `isMouseEvent`                | 1      |
| `isTouchEvent`                | 1      |
| `applyTriggerPropsToChildren` | 1      |
| `getTriggerChild`             | 1      |

## `@fluentui/scheme-utilities`

### Components

| Component          | Usages | Props |
| ------------------ | ------ | ----- |
| `VariantThemeType` | 0      | -     |

## `@griffel/react`

### Components

| Component               | Usages | Props                                 |
| ----------------------- | ------ | ------------------------------------- |
| `TextDirectionProvider` | 1      | `dir`(1): contextValues.textDirection |

### Other Exports

| Symbol         | Usages |
| -------------- | ------ |
| `makeStyles`   | 3      |
| `mergeClasses` | 3      |

## `@griffel/shadow-dom`

### Other Exports

| Symbol                    | Usages |
| ------------------------- | ------ |
| `createShadowDOMRenderer` | 1      |

## `react`

### Components

| Component   | Usages | Props |
| ----------- | ------ | ----- |
| `RefObject` | 0      | -     |

### Hooks

| Hook        | Usages | Arguments          |
| ----------- | ------ | ------------------ |
| `useEffect` | 1      | `arg0`(1): () => { |

    // eslint-disable-next-line no-restricted-globals
    const handler = document.defaultView?.setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return (): void => {
      // eslint-disable-next-line no-restricted-globals
      clearTimeout(handler);
    };

}, `arg1`(1): [value, delay] |
| `useState` | 1 | `arg0`(1): value |

### Types

| Symbol        | Usages |
| ------------- | ------ |
| `RefCallback` | 1      |

## `tabster`

### Other Exports

| Symbol            | Usages |
| ----------------- | ------ |
| `getShadowDOMAPI` | 1      |
