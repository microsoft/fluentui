import * as React from 'react';
import { Nav, NavProps, NavGroup } from '@fluentui/react-nav-preview';
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {},
});

export const WithDefaultSelection = (props: Partial<NavProps>) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Nav defaultSelectedValue={'2'}>
        <NavGroup value="1">First</NavGroup>
        <NavGroup value="2">Second</NavGroup>
        <NavGroup value="3">Third</NavGroup>
      </Nav>
    </div>
  );
};
