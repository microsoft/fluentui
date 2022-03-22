import * as React from 'react';
import { FluentGlobals, THEME_ID } from '@fluentui/react-storybook-addon';
import { makeStyles } from '../index';
import { ThemePicker } from './ThemePicker.stories';
import { VersionSelector } from './VersionSelector.stories';

const useStyles = makeStyles({
  root: theme => ({
    position: 'fixed',
    top: 0,
    padding: '5px',
    width: '100%',
    background: theme.colorNeutralBackground3,
    boxShadow: `${theme.shadow8}`,
    borderBottom: `1px solid ${theme.colorTransparentStroke}`,
    zIndex: 1000,
  }),
});

/**
 * Sticky header over the entire docs page
 */
export const FluentDocsHeader: React.FC<{ storybookGlobals: FluentGlobals }> = ({ storybookGlobals }) => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <ThemePicker selectedThemeId={storybookGlobals[THEME_ID]} />
      <VersionSelector />
    </div>
  );
};
