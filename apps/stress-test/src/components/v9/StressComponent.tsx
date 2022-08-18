import * as React from 'react';
import {
  makeStyles,
  tokens,
  shorthands,
  Button,
  Divider,
  Checkbox,
  Label,
  SpinButton,
  Spinner,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  stressComponent: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '10px',
    maxWidth: '300px',
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke1),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.padding('10px'),
  },
});

export type StressComponentProps = {
  id?: string;
  checked: boolean;
};

export const StressComponent: React.FC<StressComponentProps> = ({ id = '', checked }) => {
  const styles = useStyles();

  return (
    <div className={styles.stressComponent} id={id}>
      <Button>A button</Button>
      <Divider />
      <Label htmlFor={`checkbox-${id}`}>Check me out</Label>
      <Checkbox id={`checkbox-${id}`} checked={checked} />
      <Divider />
      <Spinner />
      <Divider />
      <SpinButton defaultValue={0} />
      <Divider />
    </div>
  );
};
