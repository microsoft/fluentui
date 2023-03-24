/* eslint-disable react/jsx-no-bind */
import * as React from 'react';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens, Switch } from '@fluentui/react-components';
import { Form } from './Form';
import { useThemeDesigner } from '../../Context/ThemeDesignerContext';

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

  const {
    state: { isDark },
    dispatch,
  } = useThemeDesigner();
  const handleIsDarkChange = () => {
    dispatch({ type: 'isDark', payload: !isDark });
  };

  return (
    <div className={mergeClasses(styles.root, props.className)}>
      <Form />
      <Switch checked={isDark} onChange={handleIsDarkChange} label={isDark ? 'dark theme' : 'light theme'} />
    </div>
  );
};
