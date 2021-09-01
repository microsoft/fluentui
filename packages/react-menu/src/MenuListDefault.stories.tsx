import * as React from 'react';

import { MenuList, MenuItem } from './index';
import { makeStyles } from '@fluentui/react-make-styles';

const useStyles = makeStyles({
  container: theme => ({
    backgroundColor: theme.alias.color.neutral.neutralBackground1,
    minWidth: '128px',
    minHeight: '48px',
    maxWidth: '300px',
    width: 'max-content',
    boxShadow: `${theme.alias.shadow.shadow16}`,
    paddingTop: '4px',
    paddingBottom: '4px',
  }),
});

const Container: React.FC = props => {
  const styles = useStyles();
  return <div className={styles.container}>{props.children}</div>;
};

export const Default = () => (
  <Container>
    <MenuList>
      <MenuItem>Cut</MenuItem>
      <MenuItem>Paste</MenuItem>
      <MenuItem>Edit</MenuItem>
    </MenuList>
  </Container>
);
