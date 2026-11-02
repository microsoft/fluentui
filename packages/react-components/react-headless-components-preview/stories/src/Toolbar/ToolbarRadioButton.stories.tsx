import * as React from 'react';
import { Toolbar, ToolbarRadioButton, ToolbarRadioGroup } from '@fluentui/react-headless-components-preview/toolbar';
import { TextAlignCenterRegular, TextAlignLeftRegular, TextAlignRightRegular } from '@fluentui/react-icons';

import styles from './toolbar.module.css';

const alignOptions = [
  { value: 'left', label: 'Align left', Icon: TextAlignLeftRegular },
  { value: 'center', label: 'Align center', Icon: TextAlignCenterRegular },
  { value: 'right', label: 'Align right', Icon: TextAlignRightRegular },
] as const;

export const RadioButton = (): React.ReactNode => (
  <Toolbar className={styles.toolbar} defaultCheckedValues={{ align: ['left'] }} aria-label="Text alignment">
    <ToolbarRadioGroup className={styles.group} aria-label="Alignment">
      {alignOptions.map(({ value, label, Icon }) => (
        <ToolbarRadioButton key={value} name="align" value={value} className={styles.btn} aria-label={label}>
          <Icon />
        </ToolbarRadioButton>
      ))}
    </ToolbarRadioGroup>
  </Toolbar>
);
