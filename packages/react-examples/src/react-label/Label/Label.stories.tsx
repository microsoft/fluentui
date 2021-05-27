import * as React from 'react';
import { Label } from '@fluentui/react-label';
import { makeStyles } from '@fluentui/react-make-styles';

const useStyles = makeStyles({
  examplesContainer: {
    display: 'flex',
    flexDirection: 'row',
    margin: '20px',
    gap: '20px',
  },
});

export const BasicLabelExample = () => {
  const styles = useStyles();

  return (
    <div className={styles.examplesContainer}>
      <Label>Label</Label>
      <Label disabled>Label</Label>
      <Label required>Label</Label>
      <Label required="**">Label</Label>
      <Label size="small" required>
        Label
      </Label>
      <Label size="small" required="**">
        Label
      </Label>
      <Label size="large" required>
        Label
      </Label>
      <Label size="large" required="**">
        Label
      </Label>
      <Label strong required>
        Label
      </Label>
      <Label strong required="**">
        Label
      </Label>
    </div>
  );
};
