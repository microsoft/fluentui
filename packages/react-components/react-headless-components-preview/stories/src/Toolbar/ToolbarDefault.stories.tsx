import * as React from 'react';
import {
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
  ToolbarGroup,
  ToolbarRadioGroup,
  ToolbarToggleButton,
} from '@fluentui/react-headless-components-preview/toolbar';
import {
  ClipboardPasteRegular,
  CopyRegular,
  CutRegular,
  TextAlignCenterRegular,
  TextAlignLeftRegular,
  TextAlignRightRegular,
  TextBoldRegular,
  TextItalicRegular,
  TextUnderlineRegular,
} from '@fluentui/react-icons';

import styles from './toolbar.module.css';
import storySource from './ToolbarDefault.stories?raw';
import { withStorySource } from '../_helpers/withStorySource';
const alignIcons = {
  left: TextAlignLeftRegular,
  center: TextAlignCenterRegular,
  right: TextAlignRightRegular,
} as const;

export const Default = (): React.ReactNode => {
  const [align, setAlign] = React.useState<'left' | 'center' | 'right'>('left');

  return (
    <Toolbar className={styles.toolbar} aria-label="Text formatting">
      <ToolbarButton className={styles.btn} aria-label="Cut" icon={<CutRegular />} />
      <ToolbarButton className={styles.btn} aria-label="Copy" icon={<CopyRegular />} />
      <ToolbarButton className={styles.btn} aria-label="Paste" icon={<ClipboardPasteRegular />} />

      <ToolbarDivider className={styles.divider} />

      <ToolbarGroup className={styles.group} aria-label="Text formatting">
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

      <ToolbarDivider className={styles.divider} />

      <ToolbarRadioGroup className={styles.group} aria-label="Text alignment">
        {(Object.entries(alignIcons) as Array<['left' | 'center' | 'right', typeof TextAlignLeftRegular]>).map(
          ([option, Icon]) => (
            <ToolbarButton
              key={option}
              className={`${styles.btn}${align === option ? ` ${styles.btnActive}` : ''}`}
              aria-label={`Align ${option}`}
              aria-pressed={align === option}
              icon={<Icon />}
              onClick={() => setAlign(option)}
            />
          ),
        )}
      </ToolbarRadioGroup>
    </Toolbar>
  );
};

Default.parameters = withStorySource(storySource);
