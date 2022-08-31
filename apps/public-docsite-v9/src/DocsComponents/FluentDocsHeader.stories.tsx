import * as React from 'react';
import { FluentGlobals, THEME_ID } from '@fluentui/react-storybook-addon';
import { shorthands, makeStyles } from '@griffel/react';
import { ThemePicker } from './ThemePicker.stories';

const useStyles = makeStyles({
  root: {
    textAlign: 'right',
    position: 'relative',
    width: 'auto',
    ...shorthands.margin('0px', 'auto'),
    maxWidth: '1200px',
    paddingRight: '15px',
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
