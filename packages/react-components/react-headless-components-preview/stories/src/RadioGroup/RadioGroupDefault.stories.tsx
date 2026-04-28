import * as React from 'react';
import { RadioGroup, Radio } from '@fluentui/react-headless-components-preview/radio-group';

import styles from '../../../../../../bebop/components/radio-group.module.css';
import storySource from './RadioGroupDefault.stories?raw';
import { withStorySource } from '../_helpers/withStorySource';
const plans = [
  { value: 'free', title: 'Free', subtitle: '$0 / month · Up to 3 projects' },
  { value: 'standard', title: 'Standard', subtitle: '$12 / month · Up to 20 projects' },
  { value: 'pro', title: 'Pro', subtitle: '$29 / month · Unlimited projects' },
];

export const Default = (): React.ReactNode => (
  <RadioGroup defaultValue="standard" className={`${styles.group} ${styles.demo}`}>
    {plans.map(plan => (
      <Radio
        key={plan.value}
        value={plan.value}
        label={{
          className: styles.text,
          children: (
            <>
              <span className={styles.title}>{plan.title}</span>
              <span className={styles.subtitle}>{plan.subtitle}</span>
            </>
          ),
        }}
        className={styles.row}
        input={{ className: styles.input }}
        indicator={{ className: styles.indicator }}
      />
    ))}
  </RadioGroup>
);

Default.parameters = withStorySource(storySource);
