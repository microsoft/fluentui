import { makeStyles, shorthands } from '@fluentui/react-components';

export const useColorBlockStyles = makeStyles({
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
