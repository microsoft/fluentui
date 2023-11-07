import * as React from 'react';
import { RecentCategory, UpcomingMeeting, RecentMeetings } from './AccessibleMeetBase';

import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableCellActions,
  TableCellLayout,
  useArrowNavigationGroup,
  useTableCompositeNavigation,
  Button,
  SplitButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Toolbar,
  ToolbarButton,
  useFluent,
} from '@fluentui/react-components';
import { createTabster, getMover, getGroupper, getTabsterAttribute, Types } from 'tabster';

interface IUpcomingMeetingsGridCellNavigationRendererProps {
  cellNavigationOnly: boolean;
  threeUpcomingMeetings: UpcomingMeeting[];
}
export const UpcomingMeetingsGridCellNavigationRenderer: React.FC<IUpcomingMeetingsGridCellNavigationRendererProps> = ({
  cellNavigationOnly,
  threeUpcomingMeetings,
}) => {
  const [tableNavigationAttribute, setTableNavigationAttribute] = React.useState({});
  const [tableRowNavigationAttribute, setTableRowNavigationAttribute] = React.useState({});
  const [handleTableKeyDown, setHandleTableKeyDown] = React.useState<React.KeyboardEventHandler | undefined>(undefined);

  const { tableRowTabsterAttribute, tableTabsterAttribute, onTableKeyDown } = useTableCompositeNavigation();
  const cellTableNavigationAttribute = useArrowNavigationGroup({ axis: 'grid' });

  React.useEffect(() => {
    if (cellNavigationOnly) {
      setTableNavigationAttribute(() => cellTableNavigationAttribute);
      setTableRowNavigationAttribute(() => {});
      setHandleTableKeyDown(undefined);
    } else {
      setTableNavigationAttribute(() => tableTabsterAttribute);
      setTableRowNavigationAttribute(() => tableRowTabsterAttribute);
      setHandleTableKeyDown(() => onTableKeyDown);
    }
  }, [
    cellNavigationOnly,
    tableTabsterAttribute,
    tableRowTabsterAttribute,
    onTableKeyDown,
    cellTableNavigationAttribute,
    setTableNavigationAttribute,
    setTableRowNavigationAttribute,
    setHandleTableKeyDown,
  ]);

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
      onKeyDown={handleTableKeyDown}
      aria-label="Upcoming meetings"
      {...tableNavigationAttribute}
    >
      <TableBody>
        {threeUpcomingMeetingsItems.map((meeting, index) => (
          <TableRow key={index} tabIndex={cellNavigationOnly ? undefined : 0} {...tableRowNavigationAttribute}>
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

interface IRecentMeetingsGridCellNavigationRendererrerProps {
  recentCategories: RecentCategory[];
  recentMeetings: RecentMeetings;
}
export const RecentMeetingsTreeGridCellNavigationRenderer: React.FC<
  IRecentMeetingsGridCellNavigationRendererrerProps
> = ({ recentCategories, recentMeetings }) => {
  const { targetDocument } = useFluent();
  const [recentCategoriesState, setRecentCategoryState] = React.useState(recentCategories);

  const tabsterCore = createTabster(window);
  getMover(tabsterCore);
  getGroupper(tabsterCore);

  const changeRecentCategoryExpandedState = React.useCallback(
    (id: string, expanded: boolean) => {
      recentCategoriesState.find(category => {
        if (id === category.id) {
          category.expanded = expanded;
          return true;
        }
        return false;
      });
      setRecentCategoryState([...recentCategoriesState]);
    },
    [recentCategoriesState],
  );

  const handleTreeGridKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      const element = event.target as HTMLElement;
      if (element.role === 'gridcell') {
        const isModifierDown = event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
        if (!isModifierDown) {
          const parent = element.parentElement;
          const isFirstChild = (parent?.querySelector('*:first-child') as HTMLElement) === element;
          const isLastChild = (parent?.querySelector('*:first-child') as HTMLElement) === element;
          const selectedRowId = parent?.id || '';
          const level = parent?.getAttribute('aria-level') || 1;
          if (event.key === 'ArrowRight' && level === '1' && isLastChild) {
            changeRecentCategoryExpandedState(selectedRowId, true);
          } else if (event.key === 'ArrowLeft' && level === '1' && isFirstChild) {
            changeRecentCategoryExpandedState(selectedRowId, false);
          } else if (event.key === 'ArrowLeft' && level === '2' && isFirstChild) {
            const categoryToFocus = recentCategories.find(category => {
              return !!recentMeetings[category.id].find(meeting => {
                return meeting.id === selectedRowId;
              });
            }) as RecentCategory;
            const headerCellToFocus = targetDocument?.querySelector(`#${categoryToFocus.id} > *`) as HTMLElement;
            headerCellToFocus.focus();
          }
        }
      }
    },
    [changeRecentCategoryExpandedState, recentCategories, recentMeetings, setRecentCategoryState, targetDocument],
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
        <Table role="presentation" noNativeElements>
          <TableBody role="presentation">
            <TableRow key={category.id} id={category.id} role="row" aria-level={1}>
              <TableCell
                role="gridcell"
                tabIndex={0}
                colSpan={4}
                // aria-expanded={category.expanded}
              >
                {category.title}
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
