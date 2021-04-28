import { makeStyles } from '@fluentui/react-make-styles';

const rootSlot = 'root';

export const useStyles = makeStyles({
  [rootSlot]: { color: 'red', padding: '4px' },
  [rootSlot + 'primary']: { background: 'green', marginLeft: '4px' },
});
