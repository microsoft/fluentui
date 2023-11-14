import * as React from 'react';
import { RecentCategory, UpcomingMeeting, RecentMeetings } from './AccessibleMeetBase';

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

interface UpcomingMeetingsGridCellNavigationRendererProps {
  threeUpcomingMeetings: UpcomingMeeting[];
}
export const UpcomingMeetingsGridCellNavigationRenderer: React.FC<UpcomingMeetingsGridCellNavigationRendererProps> = ({
  threeUpcomingMeetings,
}) => {
  const tableTabsterAttribute = useArrowNavigationGroup({ axis: 'grid' });

  const threeUpcomingMeetingsItems = React.useMemo(
    () =>
      threeUpcomingMeetings.map(meeting => ({
        title: meeting.titleWithDateAndTime,
      })),
    [threeUpcomingMeetings],
  );

  return (
    <Table role="grid" noNativeElements aria-label="Upcoming meetings" {...tableTabsterAttribute}>
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

interface RecentMeetingsGridCellNavigationRendererrerProps {
  recentCategories: RecentCategory[];
  recentMeetings: RecentMeetings;
}
export const RecentMeetingsTreeGridCellNavigationRenderer: React.FC<
  RecentMeetingsGridCellNavigationRendererrerProps
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
      const element = event.currentTarget as HTMLElement;
      const selectedRowId = element.id;
      const category = getCategoryById(selectedRowId);
      changeRecentCategoryExpandedState(category, !category?.expanded);
    },
    [getCategoryById, changeRecentCategoryExpandedState],
  );

  const handleTreeGridKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      const element = event.target as HTMLElement;
      if (element.role === 'gridcell') {
        const isModifierDown = event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
        if (!isModifierDown) {
          const parent = element.parentElement;
          const isFirstChild = (parent?.querySelector('*:first-child') as HTMLElement) === element;
          const selectedRowId = parent?.id || '';
          const category = getCategoryById(selectedRowId);
          const level = parent?.getAttribute('aria-level') || 1;
          if (event.key === 'ArrowRight' && level === '1' && isFirstChild && category && !category.expanded) {
            changeRecentCategoryExpandedState(category, true);
          } else if (event.key === 'ArrowLeft' && level === '1' && isFirstChild) {
            changeRecentCategoryExpandedState(category, false);
          } else if ((event.key === 'Enter' || event.key === ' ') && level === '1') {
            changeRecentCategoryExpandedState(category, !category?.expanded);
          } else if (event.key === 'ArrowLeft' && level === '2' && isFirstChild) {
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
        mover: { direction: Types.MoverDirections.Grid },
      })}
    >
      {recentCategories.map(category => (
        <Table key={category.id} role="presentation" noNativeElements>
          <TableBody role="presentation">
            <TableRow role="row" id={category.id} onClick={handleRowClick} aria-level={1}>
              <TableCell role="gridcell" tabIndex={0} aria-expanded={category.expanded}>
                {category.title}
              </TableCell>
              <TableCell role="gridcell" aria-colspan={3}>
                <Button>Header action</Button>
              </TableCell>
            </TableRow>
            {category.expanded &&
              recentMeetings[category.id].map(meeting => (
                <TableRow key={meeting.id} id={meeting.id} role="row" aria-level={2}>
                  <TableCell role="gridcell" tabIndex={0}>
                    {meeting.titleWithTime}
                  </TableCell>
                  <TableCell role="gridcell">
                    {' '}
                    <Button>Agenda and notes</Button>
                  </TableCell>
                  <TableCell role="gridcell">
                    <Button>Chat with participants</Button>
                  </TableCell>
                  <TableCell role="gridcell">
                    <Button>View recap</Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      ))}
    </div>
  );
};
