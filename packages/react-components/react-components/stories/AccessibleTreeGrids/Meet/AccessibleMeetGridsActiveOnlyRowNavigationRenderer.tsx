import * as React from 'react';
import { UpcomingMeeting, RecentCategory, RecentMeetings } from './AccessibleMeetBase';
import { getNearestGridCellAncestorOrSelf, getNearestRowAncestor } from './../TreeGridUtils';

import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  useAdamTableCompositeNavigation,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  useFluent,
} from '@fluentui/react-components';

interface UpcomingMeetingsGridActiveOnlyRowNavigationRendererProps {
  threeUpcomingMeetings: UpcomingMeeting[];
}
export const UpcomingMeetingsGridActiveOnlyRowNavigationRenderer: React.FC<
  UpcomingMeetingsGridActiveOnlyRowNavigationRendererProps
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
        if (gridCell) {
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
            <TableCell role="rowheader">{meeting.title}</TableCell>
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

interface RecentMeetingsGridActiveOnlyRowNavigationRendererProps {
  recentCategories: RecentCategory[];
  recentMeetings: RecentMeetings;
}
export const RecentMeetingsTreeGridActiveOnlyRowNavigationRenderer: React.FC<
  RecentMeetingsGridActiveOnlyRowNavigationRendererProps
> = ({ recentCategories, recentMeetings }) => {
  const { targetDocument } = useFluent();
  const [recentCategoriesState, setRecentCategoryState] = React.useState(recentCategories);

  const { tableTabsterAttribute, tableRowTabsterAttribute, onTableKeyDown } = useAdamTableCompositeNavigation();

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
        if (gridCell) {
          if (event.key === 'ArrowLeft') {
            const row = getNearestRowAncestor(gridCell);
            row.focus();
          }
        } else if (target.role === 'row') {
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
              <TableCell role="rowheader">{category.title}</TableCell>
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
                  <TableCell role="rowheader">{meeting.titleWithTime}</TableCell>
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
