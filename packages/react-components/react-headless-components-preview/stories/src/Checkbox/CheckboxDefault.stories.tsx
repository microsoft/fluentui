import * as React from 'react';
import { Checkbox } from '@fluentui/react-headless-components-preview/checkbox';
import { CheckmarkRegular } from '@fluentui/react-icons';

import styles from '../../../../../../theme/components/checkbox.module.css';
import storySource from './CheckboxDefault.stories?raw';
import { withStorySource } from '../_helpers/withStorySource';
export const Default = (): React.ReactNode => (
  <div className={styles.list}>
    <Checkbox
      label={{ children: 'Send me updates', className: styles.label }}
      className={styles.row}
      input={{ className: styles.input }}
      indicator={{
        className: styles.indicator,
        children: <CheckmarkRegular className={styles.iconCheck} aria-hidden />,
      }}
    />
    <Checkbox
      defaultChecked
      label={{ children: 'Subscribe to newsletter', className: styles.label }}
      className={styles.row}
      input={{ className: styles.input }}
      indicator={{
        className: styles.indicator,
        children: <CheckmarkRegular className={styles.iconCheck} aria-hidden />,
      }}
    />
    <Checkbox
      disabled
      label={{ children: 'Disabled option', className: styles.label }}
      className={styles.row}
      input={{ className: styles.input }}
      indicator={{
        className: styles.indicator,
        children: <CheckmarkRegular className={styles.iconCheck} aria-hidden />,
      }}
    />
  </div>
);

Default.parameters = withStorySource(storySource);
