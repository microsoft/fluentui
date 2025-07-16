import * as React from 'react';
import { Button, makeStyles, tokens } from '@fluentui/react-components';
import { MenuGrid, MenuGridCell, MenuGridRow, MenuGridRowGroup } from '@fluentui/react-menu';

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
        <MenuGridRowGroup>
          <MenuGridRow>
            <MenuGridCell>First row</MenuGridCell>
            <MenuGridCell>
              <Button>First cell first action</Button>
            </MenuGridCell>
            <MenuGridCell>
              <Button>First row second action</Button>
            </MenuGridCell>
          </MenuGridRow>
          <MenuGridRow>
            <MenuGridCell>Second row</MenuGridCell>
            <MenuGridCell>
              <Button>Second cell first action</Button>
            </MenuGridCell>
            <MenuGridCell>
              <Button>Second row second action</Button>
            </MenuGridCell>
          </MenuGridRow>
        </MenuGridRowGroup>
      </MenuGrid>
    </div>
  );
};
