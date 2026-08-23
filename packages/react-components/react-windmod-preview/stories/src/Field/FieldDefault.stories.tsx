import * as React from 'react';
import { Field, FluentProvider, Input } from '@fluentui/react-windmod-preview';

import styles from '../compare.module.css';

const orientations = ['vertical', 'horizontal'] as const;
const sizes = ['small', 'medium', 'large'] as const;
const validationStates = ['error', 'warning', 'success', 'none'] as const;

export const Default = (): React.ReactNode => (
  <FluentProvider>
    <div className={styles.stack}>
      <div className={styles.row}>
        {orientations.map(orientation => (
          <Field key={orientation} label="Label" orientation={orientation}>
            <Input />
          </Field>
        ))}
      </div>
      <div className={styles.row}>
        {sizes.map(size => (
          <Field key={size} label="Label" size={size}>
            <Input />
          </Field>
        ))}
      </div>
      <div className={styles.row}>
        {sizes.map(size => (
          <Field key={size} label="Label" required size={size}>
            <Input />
          </Field>
        ))}
      </div>
      <div className={styles.row}>
        {validationStates.map(validationState => (
          <Field
            key={validationState}
            label="Label"
            validationMessage={`Validation message (${validationState})`}
            validationState={validationState}
          >
            <Input />
          </Field>
        ))}
      </div>
      <div className={styles.row}>
        <Field hint="Hint text" label="Label">
          <Input />
        </Field>
        <Field hint="Hint text" label="Label" required validationMessage="Validation message">
          <Input />
        </Field>
      </div>
      <div className={styles.row}>
        <Field orientation="horizontal" validationMessage="Validation message">
          <Input />
        </Field>
      </div>
    </div>
  </FluentProvider>
);
