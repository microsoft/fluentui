import * as React from 'react';
import { makeStyles } from "@griffel/react";

export interface ComponentProps {}

const useStyles = makeStyles({
  root: {
  }
});

export const Sidebar: React.FC<ComponentProps> = props => {
  const styles = useStyles();
  return (
    <div className={styles.root}>Sidebar</div>
  );
};
