import { makeStyles, shorthands, tokens } from '@fluentui/react-components';

export const usePosterStyles = makeStyles({
  root: {
    ...shorthands.padding('40px'),
    ...shorthands.overflow('auto'),
    width: 'fit-content',
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
  },
  items: {
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    justifyItems: 'flex-start',
    width: 'unset', //Needed to prevent cascade of width:fit-content
  },
  row: {
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    justifyItems: 'flex-start',
  },
  legend: {
    ...shorthands.margin(0, '40px'),
  },
});
