import * as React from 'react';

import { MenuList, MenuItem } from '../index';

import { makeStyles } from '@fluentui/react-make-styles';

export const useMenuListContainerStyles = makeStyles({
  container: theme => ({
    backgroundColor: theme.colorNeutralBackground1,
    minWidth: '128px',
    minHeight: '48px',
    maxWidth: '300px',
    width: 'max-content',
    boxShadow: `${theme.shadow16}`,
    paddingTop: '4px',
    paddingBottom: '4px',
  }),
});

export const Default = () => {
  const styles = useMenuListContainerStyles();
  return (
    <div className={styles.container}>
      <MenuList>
        <MenuItem>Cut</MenuItem>
        <MenuItem>Paste</MenuItem>
        <MenuItem>Edit</MenuItem>
      </MenuList>
    </div>
  );
};
