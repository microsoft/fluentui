import * as React from 'react';
import {
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
  ToolbarGroup,
} from '@fluentui/react-headless-components-preview/toolbar';
import {
  ClipboardPasteRegular,
  CopyRegular,
  CutRegular,
  TextBoldRegular,
  TextItalicRegular,
  TextUnderlineRegular,
} from '@fluentui/react-icons';

import styles from './toolbar.module.css';
import storySource from './ToolbarVertical.stories?raw';
import { withStorySource } from '../_helpers/withStorySource';
export const Vertical = (): React.ReactNode => (
  <Toolbar className={styles.toolbar} vertical aria-label="Text formatting">
    <ToolbarButton className={styles.btn} aria-label="Cut" icon={<CutRegular />} />
    <ToolbarButton className={styles.btn} aria-label="Copy" icon={<CopyRegular />} />
    <ToolbarButton className={styles.btn} aria-label="Paste" icon={<ClipboardPasteRegular />} />

    <ToolbarDivider className={styles.divider} />

    <ToolbarGroup className={styles.group} aria-label="Text formatting">
      <ToolbarButton className={styles.btn} aria-label="Bold" icon={<TextBoldRegular />} />
      <ToolbarButton className={styles.btn} aria-label="Italic" icon={<TextItalicRegular />} />
      <ToolbarButton className={styles.btn} aria-label="Underline" icon={<TextUnderlineRegular />} />
    </ToolbarGroup>
  </Toolbar>
);

Vertical.parameters = withStorySource(storySource);
