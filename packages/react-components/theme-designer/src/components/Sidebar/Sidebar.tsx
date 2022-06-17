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
  Label,
  Input,
  useId,
  tokens,
  Slider,
} from '@fluentui/react-components';

export interface SidebarProps {
  className?: string;
  keyColor: string;
  setKeyColor: React.Dispatch<React.SetStateAction<string>>;
  hueTorsion: number;
  setHueTorsion: React.Dispatch<React.SetStateAction<number>>;
  darkCp: number;
  setDarkCp: React.Dispatch<React.SetStateAction<number>>;
  lightCp: number;
  setLightCp: React.Dispatch<React.SetStateAction<number>>;
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
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
  const handleTabChange = React.useCallback(
    (event, data) => {
      props.setTheme('Custom');
      setTab(data.value);
    },
    [props],
  );

  const keyColorId = useId();
  const handleOnChange = React.useCallback(e => props.setKeyColor(e.target.value), [props]);

  const hueTorsionId = useId();
  const handleHueTorsionChange = React.useCallback(e => props.setHueTorsion(e.target.value / 10), [props]);

  const lightCpId = useId();
  const handleLightCpChange = React.useCallback(e => props.setLightCp(e.target.value / 100), [props]);

  const darkCpId = useId();
  const handleDarkCpChange = React.useCallback(e => props.setDarkCp(e.target.value / 100), [props]);

  const themeId = useId();
  const handleThemeChange: MenuProps['onCheckedValueChange'] = React.useCallback(
    (e, data) => {
      props.setTheme(data.checkedItems[0] as string);
    },
    [props],
  );

  const Use = React.memo(() => (
    <div className={styles.content} role="tabpanel" aria-labelledby="Use">
      <div className={styles.inlineInputs}>
        <Label htmlFor={themeId}>Theme</Label>
        <Menu onCheckedValueChange={handleThemeChange}>
          <MenuTrigger>
            <Button>{props.theme}</Button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItemRadio name="Teams" value="Teams">
                Teams
              </MenuItemRadio>
              <MenuItemRadio name="Web" value="Web">
                Web
              </MenuItemRadio>
              <MenuItemRadio name="Office" value="Office">
                Office
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
  ));

  const Edit = React.memo(() => (
    <div className={styles.content} role="tabpanel" aria-labelledby="Edit">
      <div className={styles.inputs}>
        <Label htmlFor={keyColorId}>Key color value</Label>
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
        value={props.hueTorsion * 10}
        onChange={handleHueTorsionChange}
      />
      <Label htmlFor={lightCpId}>Light Control Point</Label>
      <Slider
        size="small"
        min={0}
        max={100}
        id={lightCpId}
        value={props.lightCp * 100}
        onChange={handleLightCpChange}
      />
      <Label htmlFor={darkCpId}>Dark Control Point</Label>
      <Slider size="small" min={0} max={100} id={darkCpId} value={props.darkCp * 100} onChange={handleDarkCpChange} />
    </div>
  ));

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
      {tab === 'use' && <Use />}
      {tab === 'edit' && <Edit />}
    </div>
  );
};
