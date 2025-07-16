import * as React from 'react';
import { makeStyles, tokens } from '@fluentui/react-components';
import { MenuGrid, MenuGridCell } from '@fluentui/react-menu';

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
        <MenuGridCell>Cut</MenuGridCell>
        <MenuGridCell>Paste</MenuGridCell>
        <MenuGridCell>Edit</MenuGridCell>
      </MenuGrid>
    </div>
  );
};
