import * as React from 'react';
import { FluentProvider, Radio, RadioGroup } from '@fluentui/react-windmod-preview';

import styles from '../compare.module.css';

const layouts = ['vertical', 'horizontal', 'horizontal-stacked'] as const;

const Controlled = () => {
  const [value, setValue] = React.useState('a');

  return (
    <RadioGroup layout="horizontal" onChange={(_, data) => setValue(data.value)} value={value}>
      <Radio label="A" value="a" />
      <Radio label="B" value="b" />
      <Radio label="C" value="c" />
    </RadioGroup>
  );
};

export const Default = (): React.ReactNode => (
  <FluentProvider>
    <div className={styles.stack}>
      <div className={styles.row}>
        {layouts.map(layout => (
          <RadioGroup key={layout} defaultValue="a" layout={layout}>
            <Radio label="A" value="a" />
            <Radio label="B" value="b" />
          </RadioGroup>
        ))}
      </div>
      <div className={styles.row}>
        <Controlled />
      </div>
      <div className={styles.row}>
        <RadioGroup defaultValue="a" disabled layout="horizontal">
          <Radio label="Group disabled" value="a" />
          <Radio label="B" value="b" />
        </RadioGroup>
        <RadioGroup defaultValue="a" layout="horizontal">
          <Radio label="A" value="a" />
          <Radio disabled label="Radio disabled" value="b" />
        </RadioGroup>
      </div>
      <div className={styles.row}>
        <RadioGroup defaultValue="a" layout="horizontal">
          <Radio label="Label below" labelPosition="below" value="a" />
          <Radio label="Label after" labelPosition="after" value="b" />
        </RadioGroup>
      </div>
      <div className={styles.row}>
        <RadioGroup defaultValue="a" layout="horizontal">
          <Radio
            indicator={{ children: <span style={{ display: 'block', width: 8, height: 8, background: '#c50f1f' }} /> }}
            label="Custom indicator"
            value="a"
          />
          <Radio
            indicator={{ children: <span style={{ display: 'block', width: 8, height: 8, background: '#c50f1f' }} /> }}
            label="B"
            value="b"
          />
        </RadioGroup>
      </div>
      <div className={styles.row}>
        <RadioGroup defaultValue="a" layout="horizontal">
          <Radio value="a" />
          <Radio value="b" />
        </RadioGroup>
      </div>
    </div>
  </FluentProvider>
);
