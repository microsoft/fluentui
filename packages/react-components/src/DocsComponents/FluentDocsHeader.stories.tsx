import * as React from 'react';
import { FluentGlobals } from '@fluentui/react-storybook-addon';
import { makeStyles } from '../index';
import { ThemePicker } from './ThemePicker.stories';

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    top: 0,
    padding: '5px',
  },
});

/**
 * Sticky header over the entire docs page
 */
export const FluentDocsHeader: React.FC<{ storybookGlobals: FluentGlobals }> = ({ storybookGlobals }) => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <ThemePicker selectedThemeId={storybookGlobals['storybook/fluentui-react-addon/theme']} />
    </div>
  );
};
