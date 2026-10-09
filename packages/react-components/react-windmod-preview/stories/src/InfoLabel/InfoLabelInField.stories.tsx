import * as React from 'react';
import { Field } from '@fluentui/react-windmod-preview/field';
import { InfoLabel } from '@fluentui/react-windmod-preview/info-label';
import { Input } from '@fluentui/react-windmod-preview/input';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import type { LabelProps } from '@fluentui/react-windmod-preview/label';

import styles from '../compare.module.css';

/** A label render function replaces the whole slot, so the InfoLabel carries the label contract
 * itself and the Field's size travels through it to the glyph. */
export const InField = (): React.ReactNode => (
  <FluentProvider>
    <div className={styles.stack}>
      <Field
        size="large"
        required
        label={{
          children: (_first: unknown, props: LabelProps) => (
            <InfoLabel {...props} info="Example info">
              Field with info label
            </InfoLabel>
          ),
        }}
      >
        <Input />
      </Field>
    </div>
  </FluentProvider>
);
