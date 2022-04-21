import * as React from 'react';
import { FluentGlobals, THEME_ID } from '@fluentui/react-storybook-addon';
import { tokens } from '@fluentui/react-theme';
import { shorthands, makeStyles } from '@griffel/react';
import { ThemePicker } from './ThemePicker.stories';

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    top: 0,
    ...shorthands.padding('5px'),
    width: '100%',
    backgroundColor: tokens.colorNeutralBackground3,
    boxShadow: `${tokens.shadow8}`,
    ...shorthands.border('1px', 'solid', tokens.colorTransparentStroke),
    zIndex: 1000,
  },
});

/**
 * Sticky header over the entire docs page
 */
export const FluentDocsHeader: React.FC<{ storybookGlobals: FluentGlobals }> = ({ storybookGlobals }) => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <ThemePicker selectedThemeId={storybookGlobals[THEME_ID]} />
    </div>
  );
};
