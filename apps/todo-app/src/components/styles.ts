// TODO: Update to use new styling pattern once it's finalized
//
// This file shows an older way of handling styling which will continue to work, but will not be
// the recommended method going forward and should not be viewed as prescriptive.

import { getTheme, mergeStyleSets } from '@fluentui/react';

const theme = getTheme();
const hiddenClass = 'is-hidden';
const completedClass = 'is-completed';

export const appStyles = mergeStyleSets({
  root: [
    theme.fonts.medium,
    {
      padding: '28px 40px 60px 40px',
      maxWidth: 640,
      margin: '0 auto',
      border: `2px solid ${theme.palette.neutralLighter}`,
      selectors: {
        '@media only screen and (maxWidth: 640px)': {
          padding: '20px 20px',
        },
      },
    },
  ],
  topRow: {
    position: 'relative',
  },
  todoHeading: {
    display: 'inline-block',
    lineHeight: '1em',
  },
  fetchingTasksSpinner: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 24,
  },
});

export const itemStyles = mergeStyleSets({
  todoItem: {
    border: `1px solid ${theme.palette.neutralLight}`,
    borderTop: 'none',
    selectors: {
      [`&.${hiddenClass}`]: {
        display: 'none',
      },
    },
  },
  itemTaskRow: {
    padding: '16px 20px',
    position: 'relative',
  },
  deleteButton: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    right: 0,
    marginRight: 16,
    padding: 0,
  },
  isHidden: hiddenClass,
  isCompleted: completedClass,
});

export const formStyles = mergeStyleSets({
  todoForm: {
    display: 'table-row',
  },
  textField: {
    display: 'table-cell',
    width: '100%',
    verticalAlign: 'top',
  },
  addButton: {
    display: 'table-cell',
    marginLeft: 16,
    whiteSpace: 'nowrap',
  },
});

export const tabsStyles = mergeStyleSets({
  todoPivot: {
    paddingTop: 24,
  },
  todoList: {
    marginTop: 20,
    borderTop: `1px solid ${theme.palette.neutralLight}`,
  },
});
