/* eslint-disable react/jsx-no-bind */
import * as React from 'react';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { TabValue, TabList, Tab, SelectTabEvent, SelectTabData, useId, tokens } from '@fluentui/react-components';
import type { CustomAttributes } from '../../useThemeDesignerReducer';
import { useContextSelector } from '@fluentui/react-context-selector';
import { UseTab } from './UseTab';
import { EditTab } from './EditTab';
import { AppContext } from '../../ThemeDesigner';

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

  const dispatchAppState = useContextSelector(AppContext, ctx => ctx.dispatchAppState);

  const sidebarId = useId();

  const [tab, setTab] = React.useState<TabValue>('use');
  const handleTabChange = (event: SelectTabEvent, data: SelectTabData) => {
    // this is outdated, but i'm going to leave it until arman gives me more clarity on what the sidebar will look like
    if (data.value === 'edit') {
      dispatchAppState({ type: 'Custom', customAttributes: formState, overrides: {} });
    } else if (data.value === 'use') {
      setTheme('Custom');
    }
    setTab(data.value);
  };

  const [theme, setTheme] = React.useState<string>('Web');
  const [isDark, setIsDark] = React.useState<boolean>(false);

  const [formState, setFormState] = React.useState<CustomAttributes>({
    keyColor: '#0F6CBD',
    hueTorsion: 0,
    darkCp: 0.66,
    lightCp: 0.33,
  });

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
      {tab === 'use' && (
        <UseTab
          sidebarId={sidebarId}
          theme={theme}
          setTheme={setTheme}
          setTab={setTab}
          formState={formState}
          setFormState={setFormState}
          isDark={isDark}
          setIsDark={setIsDark}
        />
      )}
      {tab === 'edit' && <EditTab />}
    </div>
  );
};
