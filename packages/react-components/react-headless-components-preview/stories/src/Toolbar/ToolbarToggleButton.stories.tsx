import * as React from 'react';
import { Toolbar, ToolbarGroup, ToolbarToggleButton } from '@fluentui/react-headless-components-preview/toolbar';
import { TextBoldRegular, TextItalicRegular, TextUnderlineRegular } from '@fluentui/react-icons';

import styles from './toolbar.module.css';
export const Toggle = (): React.ReactNode => (
  <Toolbar className={styles.toolbar} aria-label="Text formatting toggles">
    <ToolbarGroup className={styles.group} aria-label="Toggle states">
      <ToolbarToggleButton
        name="format"
        value="bold"
        className={styles.btn}
        aria-label="Bold"
        icon={<TextBoldRegular />}
      />
      <ToolbarToggleButton
        name="format"
        value="italic"
        className={styles.btn}
        aria-label="Italic"
        icon={<TextItalicRegular />}
      />
      <ToolbarToggleButton
        name="format"
        value="underline"
        className={styles.btn}
        aria-label="Underline"
        icon={<TextUnderlineRegular />}
      />
    </ToolbarGroup>
  </Toolbar>
);
