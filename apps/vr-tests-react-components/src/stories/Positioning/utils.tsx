import * as React from 'react';
import { createArrowStyles } from '@fluentui/react-positioning';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';

export const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    ...shorthands.gap('5px'),
    backgroundColor: tokens.colorNeutralBackground1,

    '& .target': {
      color: tokens.colorNeutralForeground1,
      backgroundColor: tokens.colorNeutralBackground1,
      ...shorthands.border('2px', 'dashed', 'green'),
      width: '400px',
      height: '200px',
    },
  },

  gridWrapper: {
    width: '400px',
    height: '400px',
    display: 'grid',
    gridTemplateColumns: 'auto auto auto',
    columnGap: '20px',
    rowGap: '50px',
  },

  boundary: {
    ...shorthands.border('2px', 'dashed', 'red'),
  },

  box: {
    ...shorthands.padding('15px'),
    ...shorthands.border('1px', 'solid', 'blue'),
    backgroundColor: 'white',
  },
  boxBold: {
    ...shorthands.borderWidth('3px'),
  },

  arrow: {
    ...createArrowStyles({
      arrowHeight: 12,
      borderStyle: 'solid',
      borderColor: 'blue',
      borderWidth: '3px',
    }),
  },

  seeThrough: {
    opacity: 0.6,
  },

  visibilityModifiers: {
    backgroundColor: '#ccc',
    minHeight: '60px',
    width: '200px',

    '[data-popper-reference-hidden]': {
      outlineWidth: '5px',
      outlineStyle: 'solid',
      outlineColor: 'red',
    },
    '[data-popper-escaped]': {
      backgroundColor: 'yellow',
    },
    '[data-popper-is-intersecting]': {
      outlineWidth: '5px',
      outlineStyle: 'solid',
      outlineColor: 'green',
    },
  },
});

export const positions = [
  ['above', 'start'],
  ['above', 'center'],
  ['above', 'end'],
  ['below', 'start'],
  ['below', 'center'],
  ['below', 'end'],
  ['before', 'top'],
  ['before', 'center'],
  ['before', 'bottom'],
  ['after', 'top'],
  ['after', 'center'],
  ['after', 'bottom'],
] as const;

export const Box = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => {
  const styles = useStyles();
  return (
    <div {...props} className={mergeClasses(styles.box, props.className)} ref={ref}>
      {props.children}
    </div>
  );
});
