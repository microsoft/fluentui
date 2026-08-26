import * as React from 'react';
import { Dropdown, FluentProvider, Option, OptionGroup } from '@fluentui/react-windmod-preview';

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
          <Dropdown key={appearance} appearance={appearance} defaultValue={appearance}>
            {fruit}
          </Dropdown>
        ))}
      </div>
      <div className={styles.row}>
        {sizes.map(size => (
          <Dropdown key={size} size={size} defaultValue={size}>
            {fruit}
          </Dropdown>
        ))}
      </div>
      <div className={styles.row}>
        <Dropdown placeholder="Pick a fruit">{fruit}</Dropdown>
        <Dropdown clearable defaultSelectedOptions={['apple']} defaultValue="Apple">
          {fruit}
        </Dropdown>
        <Dropdown multiselect defaultSelectedOptions={['apple', 'cherry']} defaultValue="Apple, Cherry">
          {fruit}
        </Dropdown>
      </div>
      <div className={styles.row}>
        {appearances.map(appearance => (
          <Dropdown key={appearance} appearance={appearance} aria-invalid defaultValue="Invalid">
            {fruit}
          </Dropdown>
        ))}
      </div>
      <div className={styles.row}>
        {appearances.map(appearance => (
          <Dropdown key={appearance} appearance={appearance} disabled defaultValue="Disabled">
            {fruit}
          </Dropdown>
        ))}
      </div>
      <div className={styles.row}>
        <Dropdown placeholder="Grouped">
          <OptionGroup label="Citrus">
            <Option value="lemon">Lemon</Option>
            <Option value="lime">Lime</Option>
          </OptionGroup>
          <OptionGroup label="Berries">
            <Option value="strawberry">Strawberry</Option>
          </OptionGroup>
        </Dropdown>
      </div>
    </div>
  </FluentProvider>
);
