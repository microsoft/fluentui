import * as React from 'react';
import { Nav, NavProps, NavGroup } from '@fluentui/react-nav-preview';
import { makeStyles, shorthands } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    ...shorthands.padding('50px', '20px'),
    rowGap: '20px',
  },
});

export const Default = (props: Partial<NavProps>) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Nav>
        <NavGroup value="1">First</NavGroup>
        <NavGroup value="2">Second</NavGroup>
        <NavGroup value="3">Third</NavGroup>
      </Nav>
    </div>
  );
};
