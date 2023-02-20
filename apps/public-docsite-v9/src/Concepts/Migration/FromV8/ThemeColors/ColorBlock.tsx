import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import * as React from 'react';
import { ColorInfo } from './types';

const useStyles = makeStyles({
  root: {
    ...shorthands.borderTop('1px', 'solid', '#aaa'),
    ...shorthands.borderBottom('1px', 'solid', '#aaa'),
    ...shorthands.borderLeft('1px', 'solid', 'transparent'),
    ...shorthands.borderRight('1px', 'solid', '#aaa'),
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    gridTemplateRows: 'auto',
    columnGap: '10px',
    ...shorthands.padding('0', '5px', '0', '0'),
  },
  flipAlign: {
    ...shorthands.borderLeft('1px', 'solid', '#aaa'),
    ...shorthands.borderRight('1px', 'solid', 'transparent'),
    gridTemplateColumns: '1fr auto',
    ...shorthands.padding('0', '0', '0', '5px'),
  },
  color: {
    backgroundColor: 'var(--ColorBlock__background-color)',
    ...shorthands.borderLeft('1px', 'solid', '#aaa'),
    ...shorthands.borderRight('1px', 'solid', '#aaa'),
    width: '20px',
    alignSelf: 'stretch',
  },
  names: {
    alignSelf: 'flex-start',
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    gridTemplateRows: 'auto',
    columnGap: '5px',
    justifySelf: 'flex-start',
    '& label': {
      textAlign: 'right',
      color: '#aaa',
      ...shorthands.margin(0),
      ...shorthands.padding(0),
    },
  },
  blockName: {
    fontWeight: '700',
  },
  colorName: {},
  colorValue: {},
  comment: {
    color: 'green',
    maxWidth: '250px',
  },
});

type Props = ColorInfo & {
  flipAlign?: boolean;
  comment?: string;
};

const getLabels = (kind: string) => {
  switch (kind) {
    case 'v8-semantic':
      return {
        name: 'semantic',
        colorName: 'palette',
        colorValue: 'value',
      };
    case 'v8-palette':
      return {
        name: 'palette',
        colorName: '',
        colorValue: 'value',
      };
    case 'v9-alias':
      return {
        name: 'alias',
        colorName: 'global',
        colorValue: 'value',
      };
    case 'v9-global':
      return {
        name: 'global',
        colorName: '',
        colorValue: 'value',
      };
    default:
      return {
        name: 'name',
        colorName: 'color',
        colorValue: 'value',
      };
  }
};

export const ColorBlock = (props: Props) => {
  const { name, colorName, colorValue, kind, comment, flipAlign } = props;

  const styles = useStyles();
  const labels = getLabels(kind);

  const className = mergeClasses(styles.root, flipAlign && styles.flipAlign);

  const blockColorStyle = {
    ['--ColorBlock__background-color' as any]: `${colorValue || 'tranparent'}`,
  };

  return (
    <div className={className} style={blockColorStyle}>
      {!flipAlign && <div className={styles.color} />}
      <div className={styles.names}>
        <label>{labels.name}</label>
        <div className={styles.blockName}>{name}</div>
        <label>{labels.colorName}</label>
        <div className={styles.colorName}>{colorName}</div>
        <label>{labels.colorValue}</label>
        <div className={styles.colorValue}>{colorValue}</div>
        <label>{comment ? '//' : ' '}</label>
        <div className={styles.comment}>{comment}</div>
      </div>
      {flipAlign && <div className={styles.color} />}
    </div>
  );
};
