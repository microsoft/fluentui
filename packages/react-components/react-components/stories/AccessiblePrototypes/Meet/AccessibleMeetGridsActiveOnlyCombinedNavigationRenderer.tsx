import * as React from 'react';
import { UpcomingMeeting, RecentCategory, RecentMeetings } from './AccessibleMeetBase';
import {
  getNearestGridCellAncestorOrSelf,
  getNearestRowAncestor,
  getFirstActiveElementInVerticalNavigation,
} from './Utils';

import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  useAdamTableCompositeNavigation,
  useAdamTableCombinedNavigation,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  useFluent,
} from '@fluentui/react-components';

interface UpcomingMeetingsGridActiveOnlyCombinedNavigationRendererProps {
  threeUpcomingMeetings: UpcomingMeeting[];
}
export const UpcomingMeetingsGridActiveOnlyCombinedNavigationRenderer: React.FC<
  UpcomingMeetingsGridActiveOnlyCombinedNavigationRendererProps
> = ({ threeUpcomingMeetings }) => {
  const { tableRowTabsterAttribute, tableTabsterAttribute, onTableKeyDown } = useAdamTableCompositeNavigation();

  const threeUpcomingMeetingsItems = React.useMemo(
    () =>
      threeUpcomingMeetings.map(meeting => ({
        title: meeting.titleWithDateAndTime,
      })),
    [threeUpcomingMeetings],
  );

  const handleGridKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      const isModifierDown = event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
      if (!isModifierDown) {
        const target = event.target as HTMLElement;
        const gridCell = getNearestGridCellAncestorOrSelf(target);
        if (gridCell?.role === 'gridcell') {
          if (event.key === 'ArrowLeft') {
            const row = getNearestRowAncestor(gridCell);
            row.focus();
          }
        }
      }
      onTableKeyDown(event);
    },
    [onTableKeyDown],
  );

  return (
    <Table
      role="grid"
      noNativeElements
      onKeyDown={handleGridKeyDown}
      aria-label="Upcoming meetings"
      {...tableTabsterAttribute}
    >
      <TableBody>
        {threeUpcomingMeetingsItems.map((meeting, index) => (
          <TableRow key={index} tabIndex={0} aria-label={meeting.title} {...tableRowTabsterAttribute}>
            <TableCell role="gridcell">{meeting.title}</TableCell>
            <TableCell role="gridcell">
              <Button>View details</Button>
            </TableCell>
            <TableCell role="gridcell">
              <Menu>
                <MenuTrigger disableButtonEnhancement>
                  <MenuButton>RSVP</MenuButton>
                </MenuTrigger>
                <MenuPopover>
                  <MenuList>
                    <MenuItem>Respond to occurrence</MenuItem>
                    <MenuItem>Respond to series</MenuItem>
                  </MenuList>
                </MenuPopover>
              </Menu>
            </TableCell>
            <TableCell role="gridcell">
              <Button>Chat with participants</Button>
            </TableCell>
            <TableCell role="gridcell">
              <Menu>
                <MenuTrigger disableButtonEnhancement>
                  <MenuButton>More options</MenuButton>
                </MenuTrigger>
                <MenuPopover>
                  <MenuList>
                    <MenuItem>View meeting details</MenuItem>
                    <MenuItem>Copy meeting link</MenuItem>
                  </MenuList>
                </MenuPopover>
              </Menu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

interface RecentMeetingsGridActiveOnlyCombinedNavigationRendererProps {
  recentCategories: RecentCategory[];
  recentMeetings: RecentMeetings;
}
export const RecentMeetingsTreeGridActiveOnlyCombinedNavigationRenderer: React.FC<
  RecentMeetingsGridActiveOnlyCombinedNavigationRendererProps
> = ({ recentCategories, recentMeetings }) => {
  const { targetDocument } = useFluent();
  const [recentCategoriesState, setRecentCategoryState] = React.useState(recentCategories);

  const { tableTabsterAttribute, tableRowTabsterAttribute, onTableKeyDown } = useAdamTableCombinedNavigation();

  const getCategoryById = React.useCallback(
    (id: string) => {
      return recentCategoriesState.find(category => {
        return id === category.id;
      });
    },
    [recentCategoriesState],
  );

  const changeRecentCategoryExpandedState = React.useCallback(
    (category: RecentCategory | undefined, expanded: boolean) => {
      if (category) {
        category.expanded = expanded;
      }
      setRecentCategoryState([...recentCategoriesState]);
    },
    [recentCategoriesState],
  );

  const handleRowClick = React.useCallback(
    (event: React.MouseEvent) => {
      const currentTarget = event.currentTarget as HTMLElement;
      const selectedRowId = currentTarget.id;
      const category = getCategoryById(selectedRowId);
      changeRecentCategoryExpandedState(category, !category?.expanded);
    },
    [getCategoryById, changeRecentCategoryExpandedState],
  );

  const handleTreeGridKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      let callTabsterKeyboardHandler = true;
      const isModifierDown = event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
      if (!isModifierDown) {
        const target = event.target as HTMLElement;
        const gridCell = getNearestGridCellAncestorOrSelf(target);
        let rowToFocus;
        if (gridCell?.role === 'gridcell') {
          const row = getNearestRowAncestor(gridCell);
          const table = row.parentElement?.parentElement as HTMLElement;
          if (event.key === 'ArrowLeft') {
            row.focus();
          } else if (event.key === 'ArrowDown') {
            callTabsterKeyboardHandler = false;
            const nextTableRow = table.nextElementSibling?.querySelector('[aria-level="1"]') as HTMLElement;
            if (row.nextElementSibling && row.nextElementSibling.role === 'row') {
              rowToFocus = row.nextElementSibling;
            } else if (nextTableRow) {
              rowToFocus = nextTableRow;
            }
          } else if (event.key === 'ArrowUp') {
            callTabsterKeyboardHandler = false;
            const prevTableRow = table.previousElementSibling?.querySelector('[aria-level="1"]') as HTMLElement;
            if (row.previousElementSibling && row.previousElementSibling.role === 'row') {
              rowToFocus = row.previousElementSibling;
            } else if (prevTableRow) {
              const isPrevTableRowExpanded = prevTableRow.getAttribute('aria-expanded');
              if (isPrevTableRowExpanded === 'true') {
                const prevTableRows = table.previousElementSibling?.querySelectorAll('[role="row"]');
                rowToFocus = prevTableRows && prevTableRows[prevTableRows.length - 1];
              } else {
                rowToFocus = prevTableRow;
              }
            }
          }
          if (rowToFocus) {
            const elementToFocus = getFirstActiveElementInVerticalNavigation(gridCell, rowToFocus as HTMLElement);
            elementToFocus?.focus();
          }
        } else if (target.role === 'row') {
          const table = target.parentElement?.parentElement as HTMLElement;
          if (event.key === 'ArrowDown') {
            const nextTableRow = table.nextElementSibling?.querySelector('[aria-level="1"]') as HTMLElement;
            if (target.nextElementSibling) {
              rowToFocus = target.nextElementSibling;
            } else if (nextTableRow) {
              rowToFocus = nextTableRow;
            }
          } else if (event.key === 'ArrowUp') {
            const prevTableRow = table.previousElementSibling?.querySelector('[aria-level="1"]') as HTMLElement;
            if (target.previousElementSibling) {
              rowToFocus = target.previousElementSibling;
            } else if (prevTableRow) {
              const isPrevTableRowExpanded = prevTableRow.getAttribute('aria-expanded');
              if (isPrevTableRowExpanded === 'true') {
                const prevTableRows = table.previousElementSibling?.querySelectorAll('[role="row"]');
                rowToFocus = prevTableRows && prevTableRows[prevTableRows.length - 1];
              } else {
                rowToFocus = prevTableRow;
              }
            }
          }
          if (rowToFocus) {
            (rowToFocus as HTMLElement).focus();
          }
          const selectedRowId = target.id;
          const category = getCategoryById(selectedRowId);
          const level = target.getAttribute('aria-level');
          if (event.key === 'ArrowRight' && level === '1' && category && !category.expanded) {
            changeRecentCategoryExpandedState(category, true);
            callTabsterKeyboardHandler = false;
          } else if (event.key === 'ArrowLeft' && level === '1') {
            changeRecentCategoryExpandedState(category, false);
          } else if ((event.key === 'Enter' || event.key === ' ') && level === '1') {
            changeRecentCategoryExpandedState(category, !category?.expanded);
          } else if (event.key === 'ArrowLeft' && level === '2') {
            const categoryToFocus = recentCategories.find(testedCategory => {
              return !!recentMeetings[testedCategory.id].find(meeting => {
                return meeting.id === selectedRowId;
              });
            }) as RecentCategory;
            const categoryRowToFocus = targetDocument?.getElementById(categoryToFocus.id) as HTMLElement;
            categoryRowToFocus.focus();
          }
        }
      }
      if (callTabsterKeyboardHandler) {
        onTableKeyDown(event);
      }
    },
    [
      changeRecentCategoryExpandedState,
      getCategoryById,
      recentCategories,
      recentMeetings,
      onTableKeyDown,
      targetDocument,
    ],
  );

  return (
    <div
      role="treegrid"
      aria-label="All meetings"
      aria-describedby="lastMeetings-hint"
      onKeyDown={handleTreeGridKeyDown}
      {...tableTabsterAttribute}
    >
      {recentCategories.map(category => (
        <Table key={category.id} role="presentation" noNativeElements>
          <TableBody role="presentation">
            <TableRow
              role="row"
              id={category.id}
              tabIndex={0}
              onClick={handleRowClick}
              aria-level={1}
              aria-expanded={category.expanded}
              aria-label={category.title}
              {...tableRowTabsterAttribute}
            >
              <TableCell role="gridcell">{category.title}</TableCell>
              <TableCell role="gridcell" aria-colspan={category.columns.length + 2}>
                <Button>Header action</Button>
              </TableCell>
            </TableRow>
            {category.expanded &&
              recentMeetings[category.id].map(meeting => (
                <TableRow
                  key={meeting.id}
                  role="row"
                  id={meeting.id}
                  tabIndex={0}
                  aria-level={2}
                  aria-label={meeting.titleWithTime}
                  {...tableRowTabsterAttribute}
                >
                  <TableCell role="gridcell">{meeting.titleWithTime}</TableCell>
                  <TableCell role="gridcell">
                    <Button>Chat with participants</Button>
                  </TableCell>
                  <TableCell role="gridcell">
                    <Button>View recap</Button>
                  </TableCell>
                  {category.columns.includes('includingContent') && (
                    <TableCell role="gridcell">
                      {meeting.properties?.includes('includingContent') && <Button>Agenda and notes</Button>}
                    </TableCell>
                  )}
                  {category.columns.includes('tasks') && (
                    <TableCell role="gridcell">
                      {meeting.tasksCount && <Button>{`${meeting.tasksCount} tasks`}</Button>}
                    </TableCell>
                  )}
                  {category.columns.includes('transcript') && (
                    <TableCell role="gridcell">
                      {meeting.properties?.includes('transcript') && <Button>Transcript</Button>}
                    </TableCell>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      ))}
    </div>
  );
};
