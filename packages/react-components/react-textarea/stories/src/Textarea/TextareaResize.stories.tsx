import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Field, Textarea } from '@fluentui/react-components';

import styles from './TextareaResize.module.css';

export const Resize = (): JSXElement => {
  return (
    <div className={styles.base}>
      <Field label='Textarea with resize set to "none"'>
        <Textarea resize="none" />
      </Field>

      <Field label='Textarea with resize set to "vertical"'>
        <Textarea resize="vertical" />
      </Field>

      <Field label='Textarea with resize set to "horizontal"'>
        <Textarea resize="horizontal" />
      </Field>

      <Field label='Textarea with resize set to "both"'>
        <Textarea resize="both" />
      </Field>
    </div>
  );
};
