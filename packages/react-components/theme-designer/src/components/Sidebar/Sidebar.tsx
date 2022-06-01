import * as React from 'react';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { TabList, Tab, Label, Input, useId, Subtitle2, tokens, Badge } from '@fluentui/react-components';

export interface SidebarProps {
  className?: string;
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    ...shorthands.borderRight('1px', 'solid', '#D1D1D1'),
    ...shorthands.gap(tokens.spacingVerticalXXL),
  },
  inputs: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    ...shorthands.gap(tokens.spacingVerticalS),
  },
  labels: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

export const Sidebar: React.FC<SidebarProps> = props => {
  const styles = useStyles();
  return (
    <div className={mergeClasses(styles.root, props.className)}>
      <TabList size="medium">
        <Tab value="tab1">Use</Tab>
        <Tab value="tab2">Edit</Tab>
      </TabList>
      <div className={styles.inputs}>
        <div className={styles.labels}>
          <Label htmlFor={useId('input-underline')}>Key Color Value</Label>
          <Badge size="extra-large" />
        </div>
        <Input appearance="underline" id={useId('input-underline')} />
      </div>
      <div className={styles.inputs}>
        <Subtitle2>Contrast References</Subtitle2>
        <div className={styles.labels}>
          <Label htmlFor={useId('input-underline')}>Light Theme</Label>
          <Badge size="extra-large" />
        </div>
        <Input appearance="underline" id={useId('input-underline')} />
        <div className={styles.labels}>
          <Label htmlFor={useId('input-underline')}>Dark Theme</Label>
          <Badge size="extra-large" />
        </div>
        <Input appearance="underline" id={useId('input-underline')} />
      </div>
      Additional Background Colors
    </div>
  );
};
