import * as React from 'react';
import { makeStyles, shorthands } from '@griffel/react';
import { useTableContext } from '../../contexts/tableContext';
import { tokens } from '@fluentui/react-theme';
import { ColumnId } from '../../hooks/types';

type DefaultResizeHandleProps = {
  columnId?: ColumnId;
};

const useDefaultHandleStyles = makeStyles({
  root: {
    position: 'absolute',
    right: '0px',
    top: 0,
    bottom: 0,
    width: '16px',
    ...shorthands.margin(0, '-16px'),
    cursor: 'col-resize',
    opacity: 0,
    transitionProperty: 'opacity',
    transitionDuration: '.2s',

    ':hover': {
      opacity: 1,
    },

    ':after': {
      content: '" "',
      display: 'block',
      width: '1px',
      position: 'absolute',
      left: '50%',
      top: 0,
      bottom: 0,
      backgroundColor: tokens.colorNeutralStroke1,
    },
  },
});

export const ResizeHandle: React.FC<DefaultResizeHandleProps> = props => {
  const styles = useDefaultHandleStyles();
  const { columnSizingState } = useTableContext();

  // Make sure the clicks on the ResizeHandle are not propagated to other components that might have
  // listeners, e.g. sorting.
  const onClick = React.useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  if (props.columnId && columnSizingState?.getOnMouseDown) {
    return (
      <div className={styles.root} onMouseDown={columnSizingState?.getOnMouseDown(props.columnId)} onClick={onClick} />
    );
  }
  return null;
};
