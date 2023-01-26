import * as React from 'react';
import { makeStyles, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import { TableColumnId } from '../../hooks/types';

type DefaultResizeHandleProps = {
  columnId?: TableColumnId;
  mouseDown?: (mouseDownEvent: React.MouseEvent<HTMLElement>) => void;
};

const useDefaultHandleStyles = makeStyles({
  root: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: '16px',
    ...shorthands.margin(0, '-8px'),
    cursor: 'col-resize',
    opacity: 0,
    transitionProperty: 'opacity',
    transitionDuration: '.2s',
    zIndex: 1,

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

  // Make sure the clicks on the ResizeHandle are not propagated to other components that might have
  // listeners, e.g. sorting.
  const onClick = React.useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  if (props.mouseDown) {
    return <div className={styles.root} onMouseDown={props.mouseDown} onClick={onClick} />;
  }
  return null;
};
