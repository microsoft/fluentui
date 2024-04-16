import * as React from 'react';
import { RecentCategory, RecentMeetings } from './TreeGridBase';
import { getNearestGridCellAncestorOrSelf, getNearestRowAncestor, getFirstCellChild } from './../TreeGridUtils';

import { TabsterMoveFocusEvent } from '@fluentui/react-tabster';

import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  useFocusableGroup,
  useAdamTableInteractive2Navigation,
  Button,
  Input,
  Field,
  useFluent,
} from '@fluentui/react-components';

interface TreeGridWithEnterInputsRendererProps {
  recentCategories: RecentCategory[];
  recentMeetings: RecentMeetings;
}
export const TreeGridWithEnterInputsRenderer: React.FC<TreeGridWithEnterInputsRendererProps> = ({
  recentCategories,
  recentMeetings,
}) => {
  const { targetDocument } = useFluent();
  const [recentCategoriesState, setRecentCategoryState] = React.useState(recentCategories);

  const { tableTabsterAttribute, tableRowTabsterAttribute, onTableKeyDown } = useAdamTableInteractive2Navigation();
  const focusableGroupAttribute = useFocusableGroup({
    tabBehavior: 'limited-trap-focus',
  });

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
          const row = getNearestRowAncestor(gridCell);
          const isFirstCellChild = gridCell === getFirstCellChild(row);
          if (event.key === 'ArrowLeft' && isFirstCellChild) {
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
        if (callTabsterKeyboardHandler) {
          onTableKeyDown(event);
        }
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

  const handleTreeGridMoveFocus = React.useCallback(
    (event: TabsterMoveFocusEvent) => {
      const key = event.details.relatedEvent.key;
      if (key === 'Enter' && targetDocument?.activeElement?.role === 'row') {
        event.preventDefault();
      }
    },
    [targetDocument],
  );

  React.useEffect(() => {
    const treeGrid = targetDocument?.getElementById('recentMeetings');

    // eslint-disable-next-line
    treeGrid?.addEventListener('tabster:movefocus' as any, handleTreeGridMoveFocus);

    return () => {
      // eslint-disable-next-line
      treeGrid?.removeEventListener('tabster:movefocus' as any, handleTreeGridMoveFocus);
    };
  }, [handleTreeGridMoveFocus, targetDocument]);

  return (
    <div
      id="recentMeetings"
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
              {...tableRowTabsterAttribute}
            >
              <TableCell role="rowheader">{category.title}</TableCell>
              <TableCell role="gridcell" aria-colspan={category.columns.length + 3}>
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
                  {...tableRowTabsterAttribute}
                >
                  <TableCell role="rowheader">{meeting.titleWithTime}</TableCell>
                  <TableCell role="gridcell">
                    <Button>Chat with participants</Button>
                  </TableCell>
                  <TableCell role="gridcell" tabIndex={0} {...focusableGroupAttribute}>
                    <Field label="Type here">
                      <Input />
                    </Field>
                  </TableCell>
                  <TableCell role="gridcell">
                    <Button>View recap</Button>
                    <Button>Another</Button>
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
