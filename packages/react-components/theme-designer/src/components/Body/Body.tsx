import * as React from 'react';
import { makeStyles } from "@griffel/react";

export interface ComponentProps {}

const useStyles = makeStyles({
  body: {
  }
});

export const Body: React.FC<ComponentProps> = props => {
  const styles = useStyles();
  return (
    <div className={styles.body}>Body</div>
  );
};
