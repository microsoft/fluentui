import * as React from 'react';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { Button, TabList, Tab, Label, Input, useId, tokens } from '@fluentui/react-components';
import { AddCircleRegular } from '@fluentui/react-icons';

export interface SidebarProps {
  className?: string;
  keyColor: string;
  setKeyColor: React.Dispatch<React.SetStateAction<string>>;
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    ...shorthands.borderRight('1px', 'solid', tokens.colorNeutralStroke1),
    ...shorthands.gap(tokens.spacingVerticalXXL, tokens.spacingHorizontalXXL),
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalXXL, tokens.spacingHorizontalXXL),
  },
  tabs: {
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'space-around',
    width: '100%',
    ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke1),
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
  keyColor: {
    paddingLeft: '0px',
  },
  labels: {
    display: 'grid',
    gridTemplateColumns: '135px auto',
    columnGap: '15px',
  },
  colorPicker: {
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke1),
    ...shorthands.borderRadius('25px'),
    height: '30px',
    width: '30px',
    ...shorthands.overflow('hidden'),
  },
  color: {
    ...shorthands.padding('0px'),
    ...shorthands.border('0px'),
    opacity: '0',
  },
});

export const Sidebar: React.FC<SidebarProps> = props => {
  const styles = useStyles();

  const keyColorId = useId();

  const handleOnBlur = React.useCallback(e => props.setKeyColor(e.target.value), [props]);
  const handleOnChange = React.useCallback(e => props.setKeyColor(e.target.value), [props]);

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
          <Label htmlFor={keyColorId}>Key Color Value</Label>
          <div className={styles.labels}>
            <Input
              className={styles.keyColor}
              size="large"
              appearance="underline"
              id={keyColorId}
              value={props.keyColor}
              onChange={handleOnChange}
            />
            <div className={styles.colorPicker} style={{ backgroundColor: props.keyColor }}>
              <input className={styles.color} type="color" id={keyColorId} onBlur={handleOnBlur} />
            </div>
          </div>
        </div>
      </div>
      <Button appearance="transparent" icon={<AddCircleRegular />} iconPosition="before">
        Add Background Colors
      </Button>
    </div>
  );
};
