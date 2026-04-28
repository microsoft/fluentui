import * as React from 'react';
import { SpinButton } from '@fluentui/react-headless-components-preview/spin-button';
import { ChevronDownRegular, ChevronUpRegular } from '@fluentui/react-icons';

import fieldStyles from '../../../../../../theme/components/field.module.css';
import styles from '../../../../../../theme/components/spin-button.module.css';
import storySource from './SpinButtonDefault.stories?raw';
import { withStorySource } from '../_helpers/withStorySource';
export const Default = (): React.ReactNode => (
  <div className={`${fieldStyles.field} ${styles.demo}`}>
    <label className={fieldStyles.label} htmlFor="quantity-spinbutton">
      Quantity
    </label>
    <SpinButton
      id="quantity-spinbutton"
      defaultValue={1}
      min={0}
      max={99}
      className={styles.wrap}
      input={{ className: styles.input }}
      incrementButton={{
        className: `${styles.btn} ${styles.btnUp}`,
        children: <ChevronUpRegular className={styles.icon} aria-hidden />,
      }}
      decrementButton={{
        className: `${styles.btn} ${styles.btnDown}`,
        children: <ChevronDownRegular className={styles.icon} aria-hidden />,
      }}
    />
  </div>
);

Default.parameters = withStorySource(storySource);
