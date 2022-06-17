/* eslint-disable react/jsx-no-bind */
import * as React from 'react';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import {
  Menu,
  MenuTrigger,
  Button,
  MenuPopover,
  MenuList,
  MenuItemRadio,
  MenuDivider,
  MenuProps,
  TabValue,
  TabList,
  Tab,
  SelectTabEvent,
  SelectTabData,
  Label,
  Input,
  useId,
  tokens,
  Switch,
  Slider,
} from '@fluentui/react-components';

export interface SidebarProps {
  className?: string;
  dispatchThemes: React.Dispatch<{
    type: string;
    keyColor?: string;
    hueTorsion?: number;
    darkCp?: number;
    lightCp?: number;
    isDark?: boolean;
  }>;
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
  inlineInputs: {
    display: 'flex',
    columnGap: '1em',
    flexDirection: 'row',
    alignItems: 'center',
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

  const [tab, setTab] = React.useState<TabValue>('use');
  const handleTabChange = (event: SelectTabEvent, data: SelectTabData) => {
    setTheme('Custom');
    setTab(data.value);
  };

  const keyColorId = useId();
  const hueTorsionId = useId();
  const lightCpId = useId();
  const darkCpId = useId();
  const themeId = useId();

  const [isDark, setIsDark] = React.useState<boolean>(false);
  const [keyColor, setKeyColor] = React.useState<string>('#006bc7');
  const [hueTorsion, setHueTorsion] = React.useState<number>(0);
  const [lightCp, setLightCp] = React.useState<number>(1 / 3);
  const [darkCp, setDarkCp] = React.useState<number>(2 / 3);
  const [theme, setTheme] = React.useState<string>('Custom');

  const dispatchCustom = () => {
    console.log(keyColor);
    props.dispatchThemes({
      type: 'Custom',
      keyColor: keyColor,
      hueTorsion: hueTorsion,
      darkCp: darkCp,
      lightCp: lightCp,
      isDark: isDark,
    });
  };

  const toggleTheme = React.useCallback(() => setIsDark(!isDark), [isDark, setIsDark]);
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyColor(e.target.value);
    dispatchCustom();
  };
  const handleHueTorsionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHueTorsion(parseInt(e.target.value, 10) / 10);
    dispatchCustom();
  };
  const handleLightCpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLightCp(parseInt(e.target.value, 10) / 100);
    dispatchCustom();
  };
  const handleDarkCpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDarkCp(parseInt(e.target.value, 10) / 100);
    dispatchCustom();
  };
  const handleThemeChange: MenuProps['onCheckedValueChange'] = (e, data) => {
    const newTheme = data.checkedItems[0] as string;
    if (newTheme === 'Custom') {
      dispatchCustom();
    } else {
      props.dispatchThemes({ type: newTheme });
    }
    setTheme(newTheme);
  };

  const RenderUseTab = () => (
    <div className={styles.content}>
      <div className={styles.inlineInputs} role="tabpanel" aria-labelledby="Use">
        <Label htmlFor={themeId}>Theme</Label>
        <Menu onCheckedValueChange={handleThemeChange}>
          <MenuTrigger>
            <Button>{theme}</Button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItemRadio name="Teams Light" value="Teams Light">
                Teams Light
              </MenuItemRadio>
              <MenuItemRadio name="Teams Dark" value="Teams Dark">
                Teams Dark
              </MenuItemRadio>
              <MenuItemRadio name="Web Light" value="Web Light">
                Web Light
              </MenuItemRadio>
              <MenuItemRadio name="Web Dark" value="Web Dark">
                Web Dark
              </MenuItemRadio>
              <MenuDivider />
              <MenuItemRadio name="Custom" value="Custom">
                Custom
              </MenuItemRadio>
            </MenuList>
          </MenuPopover>
        </Menu>
      </div>
    </div>
  );

  const RenderEditTab = () => (
    <div className={styles.content} role="tabpanel" aria-labelledby="Edit">
      <div className={styles.inputs}>
        <Label htmlFor={keyColorId}>Key color value</Label>
        <div className={styles.labels}>
          <Input
            className={styles.keyColor}
            size="large"
            appearance="underline"
            id={keyColorId}
            value={keyColor}
            onChange={handleOnChange}
          />
          <div className={styles.colorPicker} style={{ backgroundColor: keyColor }}>
            <input className={styles.color} type="color" id={keyColorId} onChange={handleOnChange} />
          </div>
        </div>
      </div>
      <Label htmlFor={hueTorsionId}>Hue Torsion</Label>
      <Slider
        size="small"
        min={-50}
        max={50}
        id={hueTorsionId}
        value={hueTorsion * 10}
        onChange={handleHueTorsionChange}
      />
      <Label htmlFor={lightCpId}>Light Control Point</Label>
      <Slider size="small" min={0} max={100} id={lightCpId} value={lightCp * 100} onChange={handleLightCpChange} />
      <Label htmlFor={darkCpId}>Dark Control Point</Label>
      <Slider size="small" min={0} max={100} id={darkCpId} value={darkCp * 100} onChange={handleDarkCpChange} />
      <Switch onChange={toggleTheme} label={isDark ? 'dark theme' : 'light theme'} />
    </div>
  );

  return (
    <div className={mergeClasses(styles.root, props.className)}>
      <TabList className={styles.tabs} size="medium" selectedValue={tab} onTabSelect={handleTabChange}>
        <Tab className={styles.tab} value="use">
          Use
        </Tab>
        <Tab className={styles.tab} value="edit">
          Edit
        </Tab>
      </TabList>
      {tab === 'use' && <RenderUseTab />}
      {tab === 'edit' && <RenderEditTab />}
    </div>
  );
};
