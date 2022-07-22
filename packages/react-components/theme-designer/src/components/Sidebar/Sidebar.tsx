/* eslint-disable react/jsx-no-bind */
import * as React from 'react';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { useId, tokens, Switch } from '@fluentui/react-components';
import type { CustomAttributes } from '../../useThemeDesignerReducer';
import { useContextSelector } from '@fluentui/react-context-selector';
import { AppContext } from '../../ThemeDesigner';
import { Form } from './Form';

export interface SidebarProps {
  className?: string;
}

const useStyles = makeStyles({
  root: {
    marginTop: '25px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    ...shorthands.borderRight('1px', 'solid', tokens.colorNeutralStroke1),
    ...shorthands.gap(tokens.spacingVerticalXXL, tokens.spacingHorizontalXXL),
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
    vibrancy: 0,
  });

  const handleIsDarkChange = () => {
    setIsDark(!isDark);
    dispatchAppState({ type: 'isDark', isDark: !isDark });
  };

  return (
    <div className={mergeClasses(styles.root, props.className)}>
      <Form sidebarId={sidebarId} formState={formState} setFormState={setFormState} />
      <Switch checked={isDark} onChange={handleIsDarkChange} label={isDark ? 'dark theme' : 'light theme'} />
    </div>
  );
};
