import * as React from 'react';
import {
  mergeStyleSets,
  DefaultButton,
  Separator,
  Checkbox,
  SpinButton,
  Spinner,
  DefaultPalette,
} from '@fluentui/react';

const styles = mergeStyleSets({
  stressComponent: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '10px',
    maxWidth: '300px',
    border: `1px solid ${DefaultPalette.neutralLight}`,
    borderRadius: '4px',
    padding: '10px',
  },
});

export type StressComponentProps = {
  id?: string;
  checked: boolean;
};

export const StressComponent: React.FC<StressComponentProps> = ({ id = '', checked }) => {
  return (
    <div className={styles.stressComponent} id={id}>
      <DefaultButton>A button</DefaultButton>
      <Separator />
      <Checkbox label="Check me out" checked={checked} />
      <Separator />
      <Spinner />
      <Separator />
      <SpinButton defaultValue="0" />
      <Separator />
    </div>
  );
};
