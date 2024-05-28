import * as React from 'react';
import { ColorCompare } from './ColorCompare';
import { namedColorMap } from './themeMap';

import { makeStyles, shorthands } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    ...shorthands.padding('25px'),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  comparisons: {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    gridTemplateRows: 'auto',
    columnGap: '10px',
    rowGap: '5px',
  },
});

export const NamedColors = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <h2>Named Colors</h2>
      <div className={styles.comparisons}>
        <h3>v8 Palette</h3>
        <h3>v9 Global</h3>
        {namedColorMap.map(item => {
          return <ColorCompare key={item.name} {...item} />;
        })}
      </div>
    </div>
  );
};
