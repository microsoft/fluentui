import * as React from 'react';
import { Combobox, FluentProvider, Option, OptionGroup } from '@fluentui/react-windmod-preview';

import styles from '../compare.module.css';

const appearances = ['outline', 'underline', 'filled-darker', 'filled-lighter'] as const;
const sizes = ['small', 'medium', 'large'] as const;

const fruit = (
  <>
    <Option value="apple">Apple</Option>
    <Option value="banana">Banana</Option>
    <Option value="cherry">Cherry</Option>
  </>
);

export const Default = (): React.ReactNode => (
  <FluentProvider>
    <div className={styles.stack}>
      <div className={styles.row}>
        {appearances.map(appearance => (
          <Combobox key={appearance} appearance={appearance} defaultValue={appearance}>
            {fruit}
          </Combobox>
        ))}
      </div>
      <div className={styles.row}>
        {sizes.map(size => (
          <Combobox key={size} size={size} defaultValue={size}>
            {fruit}
          </Combobox>
        ))}
      </div>
      <div className={styles.row}>
        <Combobox placeholder="Pick a fruit">{fruit}</Combobox>
        <Combobox clearable defaultSelectedOptions={['apple']} defaultValue="Apple">
          {fruit}
        </Combobox>
        <Combobox multiselect defaultSelectedOptions={['apple', 'cherry']} defaultValue="Apple, Cherry">
          {fruit}
        </Combobox>
      </div>
      <div className={styles.row}>
        {appearances.map(appearance => (
          <Combobox key={appearance} appearance={appearance} aria-invalid defaultValue="Invalid">
            {fruit}
          </Combobox>
        ))}
      </div>
      <div className={styles.row}>
        {appearances.map(appearance => (
          <Combobox key={appearance} appearance={appearance} disabled defaultValue="Disabled">
            {fruit}
          </Combobox>
        ))}
      </div>
      <div className={styles.row}>
        <Combobox placeholder="Grouped">
          <OptionGroup label="Citrus">
            <Option value="lemon">Lemon</Option>
            <Option value="lime">Lime</Option>
          </OptionGroup>
          <OptionGroup label="Berries">
            <Option value="strawberry">Strawberry</Option>
          </OptionGroup>
        </Combobox>
      </div>
    </div>
  </FluentProvider>
);
