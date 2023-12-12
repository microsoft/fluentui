import * as React from 'react';
import { RecentCategory, RecentMeetings } from './TreeGridBase';
import {
  srNarrate,
  getNearestGridCellAncestorOrSelf,
  getNearestRowAncestor,
  getFirstCellChild,
  getNextOrPrevFocusable,
} from './../TreeGridUtils';

// import { useAnnounce_unstable } from '@fluentui/react-shared-contexts';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  useAdamTableInteractiveNavigation,
  Button,
  Input,
  Field,
  useFluent,
} from '@fluentui/react-components';

const focusNextOrPrevRow = (currentRow: HTMLElement, event: React.KeyboardEvent) => {
  const table = currentRow.parentElement?.parentElement as HTMLElement;
  let rowToFocus: HTMLElement | undefined;
  if (event.key === 'ArrowDown') {
    const nextTableRow = table.nextElementSibling?.querySelector('[aria-level="1"]') as HTMLElement;
    if (currentRow.nextElementSibling) {
      rowToFocus = currentRow.nextElementSibling as HTMLElement;
    } else if (nextTableRow) {
      rowToFocus = nextTableRow;
    }
  } else if (event.key === 'ArrowUp') {
    const prevTableRow = table.previousElementSibling?.querySelector('[aria-level="1"]') as HTMLElement;
    if (currentRow.previousElementSibling) {
      rowToFocus = currentRow.previousElementSibling as HTMLElement;
    } else if (prevTableRow) {
      const isPrevTableRowExpanded = prevTableRow.getAttribute('aria-expanded');
      if (isPrevTableRowExpanded === 'true') {
        const prevTableRows = table.previousElementSibling?.querySelectorAll('[role="row"]');
        rowToFocus = prevTableRows && (prevTableRows[prevTableRows.length - 1] as HTMLElement);
      } else {
        rowToFocus = prevTableRow;
      }
    }
  }
  if (rowToFocus) {
    (rowToFocus as HTMLElement).focus();
  }
};

interface TreeGridWithEnterInputsRendererProps {
  recentCategories: RecentCategory[];
  recentMeetings: RecentMeetings;
}
export const TreeGridWithEnterInputsRenderer: React.FC<TreeGridWithEnterInputsRendererProps> = ({
  recentCategories,
  recentMeetings,
}) => {
  const { targetDocument } = useFluent();
  // const { announce } = useAnnounce_unstable();

  const [recentCategoriesState, setRecentCategoryState] = React.useState(recentCategories);
  const [isNavigationMode, setIsNavigationMode] = React.useState(false);

  const { tableTabsterAttribute, tableRowTabsterAttribute, onTableKeyDown } = useAdamTableInteractiveNavigation();

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

  const narrateInputHint = React.useCallback(element => {
    if ((element.tagName === 'INPUT' && element.getAttribute('type') === 'text') || element.role === 'textbox') {
      const message = 'Press Escape to cancel editing, then navigate with arrow keys';
      srNarrate(message);
      // announce(message, { polite: true } );
    }
  }, []);

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
        if ((target.tagName === 'INPUT' && target.getAttribute('type') === 'text') || target.role === 'textbox') {
          const row = getNearestRowAncestor(target);
          if (isNavigationMode) {
            if (event.key === 'ArrowRight') {
              const nextFocusable = getNextOrPrevFocusable(row, target, 'next');
              nextFocusable?.focus();
              setIsNavigationMode(false);
            } else if (event.key === 'ArrowLeft') {
              const prevFocusable = getNextOrPrevFocusable(row, target, 'prev');
              prevFocusable?.focus();
              setIsNavigationMode(false);
            } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
              focusNextOrPrevRow(row, event);
              setIsNavigationMode(false);
            }
          } else if (event.key === 'Escape') {
            setIsNavigationMode(true);
          }
        } else {
          const gridCell = getNearestGridCellAncestorOrSelf(target);
          if (gridCell) {
            const row = getNearestRowAncestor(gridCell);
            if (event.key === 'ArrowLeft') {
              const isFirstCellChild = gridCell === getFirstCellChild(row);
              if (isFirstCellChild) {
                row.focus();
              } else {
                const prevFocusable = getNextOrPrevFocusable(row, target, 'prev');
                prevFocusable?.focus();
                narrateInputHint(prevFocusable);
              }
            } else if (event.key === 'ArrowRight') {
              const nextFocusable = getNextOrPrevFocusable(row, target, 'next');
              nextFocusable?.focus();
              narrateInputHint(nextFocusable);
            }
            focusNextOrPrevRow(row, event);
          } else if (target.role === 'row') {
            if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
              focusNextOrPrevRow(target, event);
            }
            const selectedRowId = target.id;
            const category = getCategoryById(selectedRowId);
            const level = target.getAttribute('aria-level');
            if (event.key === 'ArrowRight' && (!category || (category && category.expanded))) {
              const nextFocusable = getNextOrPrevFocusable(target, undefined, 'next');
              nextFocusable?.focus();
              narrateInputHint(nextFocusable);
              callTabsterKeyboardHandler = false;
            }
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
      }
    },
    [
      isNavigationMode,
      narrateInputHint,
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
                  {...tableRowTabsterAttribute}
                >
                  <TableCell role="rowheader">{meeting.titleWithTime}</TableCell>
                  <TableCell role="gridcell">
                    <Button>Chat with participants</Button>
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
