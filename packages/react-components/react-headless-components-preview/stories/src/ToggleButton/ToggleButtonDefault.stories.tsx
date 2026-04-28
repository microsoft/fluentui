import * as React from 'react';
import { ToggleButton } from '@fluentui/react-headless-components-preview/toggle-button';
import { TextBoldRegular, TextItalicRegular, TextUnderlineRegular } from '@fluentui/react-icons';

import styles from '../../../../../../bebop/components/toggle-button.module.css';
import storySource from './ToggleButtonDefault.stories?raw';
import { withStorySource } from '../_helpers/withStorySource';
export const Default = (): React.ReactNode => {
  const [bold, setBold] = React.useState(false);
  const [italic, setItalic] = React.useState(false);
  const [underline, setUnderline] = React.useState(false);

  return (
    <div className={styles.demo}>
      <div className={styles.demoRow}>
        <ToggleButton className={styles.toggle} checked={bold} onClick={() => setBold(v => !v)}>
          {bold ? 'On' : 'Off'}
        </ToggleButton>
        <ToggleButton className={styles.toggle} disabled>
          Disabled
        </ToggleButton>
      </div>

      <div className={styles.group} role="group" aria-label="Text formatting">
        <ToggleButton className={styles.groupItem} aria-label="Bold" checked={bold} onClick={() => setBold(v => !v)}>
          <TextBoldRegular />
        </ToggleButton>
        <ToggleButton
          className={styles.groupItem}
          aria-label="Italic"
          checked={italic}
          onClick={() => setItalic(v => !v)}
        >
          <TextItalicRegular />
        </ToggleButton>
        <ToggleButton
          className={styles.groupItem}
          aria-label="Underline"
          checked={underline}
          onClick={() => setUnderline(v => !v)}
        >
          <TextUnderlineRegular />
        </ToggleButton>
      </div>
    </div>
  );
};

Default.parameters = withStorySource(storySource);
