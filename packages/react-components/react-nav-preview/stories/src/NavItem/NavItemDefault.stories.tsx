import * as React from 'react';
import { Nav, NavItem, NavItemProps } from '@fluentui/react-nav-preview';
import { Folder20Regular, Folder20Filled, bundleIcon } from '@fluentui/react-icons';
import { makeStyles, tokens } from '@fluentui/react-components';

const Folder = bundleIcon(Folder20Filled, Folder20Regular);

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '260px',
    rowGap: '60px',
    padding: '40px',
    backgroundColor: tokens.colorNeutralBackground4,
  },
});

export const Default = (props: Partial<NavItemProps>) => {
  const classes = useStyles();

  const someClickHandler = () => {
    console.log('someClickHandler');
  };

  return (
    <div className={classes.root}>
      <Nav defaultSelectedValue="2">
        <NavItem value="1" target="_blank" onClick={someClickHandler}>
          Not Selected, no Icon
        </NavItem>
        <NavItem value="2" target="_blank" onClick={someClickHandler}>
          Selected, no icon
        </NavItem>
      </Nav>
      <Nav defaultSelectedValue="2">
        <NavItem value="1" icon={<Folder />} target="_blank" onClick={someClickHandler}>
          Not Selected, icon present
        </NavItem>
        <NavItem value="2" icon={<Folder />} target="_blank" onClick={someClickHandler}>
          Selected, icon present
        </NavItem>
      </Nav>
    </div>
  );
};
