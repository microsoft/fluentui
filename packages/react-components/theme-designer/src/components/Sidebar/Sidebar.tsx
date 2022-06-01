import * as React from 'react';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { Button, TabList, Tab, Label, Input, useId, Subtitle2, tokens, Badge } from '@fluentui/react-components';
import { AddCircleRegular } from '@fluentui/react-icons';

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
  content: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalXXL),
  },
  tabs: {
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'space-around',
    width: '100%',
    ...shorthands.borderBottom('1px', 'solid', '#D1D1D1'),
  },
  tab: {
    display: 'flex',
    flexGrow: 1,
    paddingLeft: 0,
    paddingRight: 0,
  },
  inputs: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  labels: {
    display: 'grid',
    gridTemplateColumns: '135px auto',
    columnGap: '15px',
  },
});

export const Sidebar: React.FC<SidebarProps> = props => {
  const styles = useStyles();
  return (
    <div className={mergeClasses(styles.root, props.className)}>
      <TabList className={styles.tabs} size="medium" defaultSelectedValue="use">
        <Tab className={styles.tab} value="use">
          Use
        </Tab>
        <Tab disabled className={styles.tab} value="edit">
          Edit
        </Tab>
      </TabList>
      <div className={styles.content}>
        <div className={styles.inputs}>
          <Label htmlFor={useId('input-underline')}>Key Color Value</Label>
          <div className={styles.labels}>
            <Input size="large" appearance="underline" id={useId('input-underline')} />
            <Badge size="extra-large" />
          </div>
        </div>
        <Subtitle2>Contrast References</Subtitle2>
        <div className={styles.inputs}>
          <Label htmlFor={useId('input-underline')}>Light Theme</Label>
          <div className={styles.labels}>
            <Input size="small" appearance="underline" id={useId('input-underline')} />
            <Badge size="extra-large" />
          </div>
        </div>
        <div className={styles.inputs}>
          <Label htmlFor={useId('input-underline')}>Dark Theme</Label>
          <div className={styles.labels}>
            <Input size="small" appearance="underline" id={useId('input-underline')} />
            <Badge size="extra-large" />
          </div>
        </div>
      </div>
      <Button appearance="transparent" icon={<AddCircleRegular />} iconPosition="before">
        Add Background Colors
      </Button>
    </div>
  );
};
