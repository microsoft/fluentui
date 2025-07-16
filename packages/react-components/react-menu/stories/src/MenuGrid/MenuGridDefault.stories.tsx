import * as React from 'react';
import { makeStyles, tokens, MenuItem } from '@fluentui/react-components';
import { MenuGrid } from '@fluentui/react-menu';

const useMenuListContainerStyles = makeStyles({
  container: {
    backgroundColor: tokens.colorNeutralBackground1,
    minWidth: '128px',
    minHeight: '48px',
    maxWidth: '300px',
    width: 'max-content',
    boxShadow: `${tokens.shadow16}`,
    paddingTop: '4px',
    paddingBottom: '4px',
  },
});

export const Default = () => {
  const styles = useMenuListContainerStyles();
  return (
    <div className={styles.container}>
      <MenuGrid>
        <MenuItem>Cut</MenuItem>
        <MenuItem>Paste</MenuItem>
        <MenuItem>Edit</MenuItem>
      </MenuGrid>
    </div>
  );
};
