import * as React from 'react';
import { Nav, NavItem, NavItemProps } from '@fluentui/react-nav-preview';
import { Folder20Regular, Folder20Filled } from '@fluentui/react-icons';

import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: { display: 'flex', flexDirection: 'column', rowGap: '60px' },
});

export const Default = (props: Partial<NavItemProps>) => {
  const classes = useStyles();

  const someClickHandler = () => {
    console.log('someClickHandler');
  };

  return (
    <div className={classes.root}>
      <Nav defaultSelectedValue={'2'}>
        <NavItem value="1" target="_blank" onClick={someClickHandler}>
          Not Selected, no Icon
        </NavItem>
        <NavItem value="2" target="_blank" onClick={someClickHandler}>
          Selected, no icon
        </NavItem>
      </Nav>
      <Nav defaultSelectedValue={'2'}>
        <NavItem
          value="1"
          selectedIcon={<Folder20Filled />}
          unSelectedIcon={<Folder20Regular />}
          target="_blank"
          onClick={someClickHandler}
        >
          Not Selected, icon present
        </NavItem>
        <NavItem
          value="2"
          selectedIcon={<Folder20Filled />}
          unSelectedIcon={<Folder20Regular />}
          target="_blank"
          onClick={someClickHandler}
        >
          Selected, icon present
        </NavItem>
      </Nav>
    </div>
  );
};
