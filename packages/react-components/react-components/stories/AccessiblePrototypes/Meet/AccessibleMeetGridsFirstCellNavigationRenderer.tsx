import * as React from 'react';
import { RecentCategory, UpcomingMeeting, RecentMeetings } from './AccessibleMeetBase';
import { getNearestRowAncestor, getFirstCellChild } from './Utils';

import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  useArrowNavigationGroup,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  useFluent,
} from '@fluentui/react-components';
import { createTabster, getMover, getGroupper, getTabsterAttribute, Types } from 'tabster';

interface UpcomingMeetingsGridFirstCellNavigationRendererProps {
  threeUpcomingMeetings: UpcomingMeeting[];
}
export const UpcomingMeetingsGridFirstCellNavigationRenderer: React.FC<
  UpcomingMeetingsGridFirstCellNavigationRendererProps
> = ({ threeUpcomingMeetings }) => {
  const tableTabsterAttribute = useArrowNavigationGroup({
    axis: 'grid',
    ignoreDefaultKeydown: { ArrowDown: true, ArrowUp: true },
    memorizeCurrent: true,
  });

  const handleGridKeyDown = React.useCallback((event: React.KeyboardEvent) => {
    const isModifierDown = event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
    if (!isModifierDown) {
      const target = event.target as HTMLElement;
      const row = getNearestRowAncestor(target);
      let rowToFocus;
      if (event.key === 'ArrowDown' && row.nextElementSibling) {
        rowToFocus = row.nextElementSibling;
      } else if (event.key === 'ArrowUp' && row.previousElementSibling) {
        rowToFocus = row.previousElementSibling;
      }
      if (rowToFocus) {
        const cellToFocus = getFirstCellChild(rowToFocus as HTMLElement);
        cellToFocus.focus();
      }
    }
  }, []);

  const threeUpcomingMeetingsItems = React.useMemo(
    () =>
      threeUpcomingMeetings.map(meeting => ({
        title: meeting.titleWithDateAndTime,
      })),
    [threeUpcomingMeetings],
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
          <TableRow key={index}>
            <TableCell role="gridcell" tabIndex={0}>
              {meeting.title}
            </TableCell>
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

interface RecentMeetingsGridFirstCellNavigationRendererProps {
  recentCategories: RecentCategory[];
  recentMeetings: RecentMeetings;
}
export const RecentMeetingsTreeGridFirstCellNavigationRenderer: React.FC<
  RecentMeetingsGridFirstCellNavigationRendererProps
> = ({ recentCategories, recentMeetings }) => {
  const { targetDocument } = useFluent();
  const [recentCategoriesState, setRecentCategoryState] = React.useState(recentCategories);

  const tabsterCore = createTabster(window);
  getMover(tabsterCore);
  getGroupper(tabsterCore);

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
      const isModifierDown = event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
      if (!isModifierDown) {
        const target = event.target as HTMLElement;
        const row = getNearestRowAncestor(target);
        const table = row.parentElement?.parentElement as HTMLElement;
        let rowToFocus;
        if (event.key === 'ArrowDown') {
          const nextTableRow = table.nextElementSibling?.querySelector('[aria-level="1"]') as HTMLElement;
          if (row.nextElementSibling) {
            rowToFocus = row.nextElementSibling;
          } else if (nextTableRow) {
            rowToFocus = nextTableRow;
          }
        } else if (event.key === 'ArrowUp') {
          const prevTableRow = table.previousElementSibling?.querySelector('[aria-level="1"]') as HTMLElement;
          if (row.previousElementSibling) {
            rowToFocus = row.previousElementSibling;
          } else if (prevTableRow) {
            const isPrevTableRowExpanded = getFirstCellChild(prevTableRow).getAttribute('aria-expanded');
            if (isPrevTableRowExpanded === 'true') {
              const prevTableRows = table.previousElementSibling?.querySelectorAll('[role="row"]');
              rowToFocus = prevTableRows && prevTableRows[prevTableRows.length - 1];
            } else {
              rowToFocus = prevTableRow;
            }
          }
        }
        if (rowToFocus) {
          const cellToFocus = getFirstCellChild(rowToFocus as HTMLElement);
          cellToFocus.focus();
        }
        if (target.role === 'gridcell') {
          const isFirstCellChild = getFirstCellChild(row as HTMLElement) === target;
          const selectedRowId = row?.id || '';
          const category = getCategoryById(selectedRowId);
          const level = row?.getAttribute('aria-level') || 1;
          if (event.key === 'ArrowRight' && level === '1' && isFirstCellChild && category && !category.expanded) {
            changeRecentCategoryExpandedState(category, true);
          } else if (event.key === 'ArrowLeft' && level === '1' && isFirstCellChild) {
            changeRecentCategoryExpandedState(category, false);
          } else if ((event.key === 'Enter' || event.key === ' ') && level === '1') {
            changeRecentCategoryExpandedState(category, !category?.expanded);
          } else if (event.key === 'ArrowLeft' && level === '2' && isFirstCellChild) {
            const categoryToFocus = recentCategories.find(testedCategory => {
              return !!recentMeetings[testedCategory.id].find(meeting => {
                return meeting.id === selectedRowId;
              });
            }) as RecentCategory;
            const headerCellToFocus = targetDocument?.querySelector(`#${categoryToFocus.id} > *`) as HTMLElement;
            headerCellToFocus.focus();
          }
        }
      }
    },
    [getCategoryById, changeRecentCategoryExpandedState, recentCategories, recentMeetings, targetDocument],
  );

  return (
    <div
      role="treegrid"
      onKeyDown={handleTreeGridKeyDown}
      aria-label="All meetings"
      aria-describedby="lastMeetings-hint"
      {...getTabsterAttribute({
        groupper: {
          tabbability: Types.GroupperTabbabilities.Unlimited,
        },
        mover: {
          direction: Types.MoverDirections.Grid,
          memorizeCurrent: true,
        },
        focusable: {
          ignoreKeydown: { ArrowDown: true, ArrowUp: true },
        },
      })}
    >
      {recentCategories.map((category, categoryIndex) => (
        <Table key={category.id} role="presentation" noNativeElements>
          <TableBody role="presentation">
            <TableRow
              role="row"
              id={category.id}
              onClick={handleRowClick}
              tabIndex={-1}
              aria-level={1}
              aria-posinset={categoryIndex + 1}
              aria-setsize={recentCategories.length}
            >
              <TableCell role="gridcell" tabIndex={0} aria-expanded={category.expanded}>
                {category.title}
              </TableCell>
              <TableCell role="gridcell" aria-colspan={category.columns.length + 2}>
                <Button>Header action</Button>
              </TableCell>
            </TableRow>
            {category.expanded &&
              recentMeetings[category.id].map((meeting, meetingIndex) => (
                <TableRow
                  key={meeting.id}
                  id={meeting.id}
                  role="row"
                  tabIndex={-1}
                  aria-level={2}
                  aria-posinset={meetingIndex + 1}
                  aria-setsize={recentMeetings[category.id].length}
                >
                  <TableCell role="gridcell" tabIndex={0}>
                    {meeting.titleWithTime}
                  </TableCell>
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
