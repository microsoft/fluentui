import * as React from 'react';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { Button, TabList, Tab, Label, Input, useId, Subtitle2, tokens } from '@fluentui/react-components';
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
  const lightThemeId = useId();
  const darkThemeId = useId();

  const [keyColor, setKeyColor] = React.useState<string>('#006BC7');
  const changeKeyColor = React.useCallback(e => setKeyColor(e.target.value), [setKeyColor]);

  const [lightTheme, setLightTheme] = React.useState<string>('#FFFFFF');
  const changeLightTheme = React.useCallback(e => setLightTheme(e.target.value), [setLightTheme]);

  const [darkTheme, setDarkTheme] = React.useState<string>('#000000');
  const changeDarkTheme = React.useCallback(e => setDarkTheme(e.target.value), [setDarkTheme]);

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
            <Input size="large" appearance="underline" id={keyColorId} />
            <div className={styles.colorPicker} style={{ backgroundColor: keyColor }}>
              <input className={styles.color} type="color" id={keyColorId} onChange={changeKeyColor} />
            </div>
          </div>
        </div>
        <Subtitle2>Contrast References</Subtitle2>
        <div className={styles.inputs}>
          <Label htmlFor={lightThemeId}>Light Theme</Label>
          <div className={styles.labels}>
            <Input size="small" appearance="underline" id={lightThemeId} />
            <div className={styles.colorPicker} style={{ backgroundColor: lightTheme }}>
              <input className={styles.color} type="color" id={lightThemeId} onChange={changeLightTheme} />
            </div>
          </div>
        </div>
        <div className={styles.inputs}>
          <Label htmlFor={darkThemeId}>Dark Theme</Label>
          <div className={styles.labels}>
            <Input size="small" appearance="underline" id={darkThemeId} />
            <div className={styles.colorPicker} style={{ backgroundColor: darkTheme }}>
              <input className={styles.color} type="color" id={darkThemeId} onChange={changeDarkTheme} />
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
