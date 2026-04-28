import * as React from 'react';
import { Select } from '@fluentui/react-headless-components-preview/select';
import { ChevronDownRegular } from '@fluentui/react-icons';

import fieldStyles from '../../../../../../theme/components/field.module.css';
import styles from '../../../../../../theme/components/select.module.css';
import storySource from './SelectDefault.stories?raw';
import { withStorySource } from '../_helpers/withStorySource';
export const Default = (): React.ReactNode => (
  <div className={`${fieldStyles.field} ${styles.demo}`}>
    <label className={fieldStyles.label} htmlFor="color-select">
      Color
    </label>
    <Select
      className={styles.wrap}
      id="color-select"
      select={{ className: styles.select }}
      icon={{ className: styles.icon, children: <ChevronDownRegular aria-hidden /> }}
    >
      <option>Red</option>
      <option>Green</option>
      <option>Blue</option>
      <option>Magenta</option>
    </Select>
  </div>
);

Default.parameters = withStorySource(storySource);
