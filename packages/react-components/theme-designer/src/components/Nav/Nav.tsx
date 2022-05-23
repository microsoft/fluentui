import * as React from 'react';
import { makeStyles } from "@griffel/react";

export interface ComponentProps {}

const useStyles = makeStyles({
  nav: {
  }
});

export const Nav: React.FC<ComponentProps> = props => {
  const styles = useStyles();
  return (
    <div className={styles.nav}>Nav</div>
  );
};
