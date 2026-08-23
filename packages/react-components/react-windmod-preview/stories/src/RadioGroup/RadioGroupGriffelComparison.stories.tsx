import * as React from 'react';
import { FluentProvider, Radio, RadioGroup } from '@fluentui/react-windmod-preview';
import {
  FluentProvider as GriffelFluentProvider,
  Radio as GriffelRadio,
  RadioGroup as GriffelRadioGroup,
  webLightTheme,
} from '@fluentui/react-components';

import styles from '../compare.module.css';

type GroupProps = {
  defaultValue?: string;
  disabled?: boolean;
  layout?: 'vertical' | 'horizontal' | 'horizontal-stacked';
  required?: boolean;
};

type ItemProps = {
  disabled?: boolean;
  labelPosition?: 'after' | 'below';
};

/**
 * Every windmod variant next to its Griffel-suite twin (inside a Griffel FluentProvider).
 * The pair in each row must be pixel-identical — including the `required` row, because neither
 * side renders an asterisk for a Radio.
 */
export const GriffelComparison = (): React.ReactNode => {
  const variants: Array<{ label: string; group: GroupProps; item?: ItemProps }> = [
    { label: 'vertical', group: { defaultValue: 'a' } },
    { label: 'horizontal', group: { defaultValue: 'a', layout: 'horizontal' } },
    { label: 'horizontal-stacked', group: { defaultValue: 'a', layout: 'horizontal-stacked' } },
    { label: 'no selection', group: { layout: 'horizontal' } },
    { label: 'group disabled', group: { defaultValue: 'a', disabled: true, layout: 'horizontal' } },
    { label: 'radio disabled', group: { defaultValue: 'a', layout: 'horizontal' }, item: { disabled: true } },
    { label: 'label below', group: { defaultValue: 'a', layout: 'horizontal' }, item: { labelPosition: 'below' } },
    { label: 'required (no asterisk)', group: { defaultValue: 'a', layout: 'horizontal', required: true } },
  ];

  return (
    <div className={styles.grid}>
      <div className={styles.header}>Variant</div>
      <div className={styles.header}>Windmod</div>
      <div className={styles.header}>Griffel</div>
      {variants.map(({ label, group, item }) => (
        <React.Fragment key={label}>
          <div className={styles.label}>{label}</div>
          <div>
            <FluentProvider>
              <RadioGroup {...group}>
                <Radio label="A" value="a" {...item} />
                <Radio label="B" value="b" {...item} />
              </RadioGroup>
            </FluentProvider>
          </div>
          <div>
            <GriffelFluentProvider theme={webLightTheme}>
              <GriffelRadioGroup {...group}>
                <GriffelRadio label="A" value="a" {...item} />
                <GriffelRadio label="B" value="b" {...item} />
              </GriffelRadioGroup>
            </GriffelFluentProvider>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};
