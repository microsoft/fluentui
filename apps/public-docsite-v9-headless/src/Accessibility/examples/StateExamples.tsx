'use client';

import * as React from 'react';
import { Button } from '@fluentui/react-headless-components-preview/button';
import { ToggleButton } from '@fluentui/react-headless-components-preview/toggle-button';

import { Example, ExampleGrid } from './Example';
import styles from './accessibility.module.css';

export const DisabledFocusableExamples = (): React.ReactElement => (
  <ExampleGrid>
    <Example variant="bad" hint="Styles only :disabled, so the second button looks enabled">
      <Button className={`${styles.button} ${styles.disabledNativeOnly}`} disabled>
        Disabled
      </Button>
      <Button className={`${styles.button} ${styles.disabledNativeOnly}`} disabledFocusable>
        Disabled focusable
      </Button>
    </Example>
    <Example variant="good" hint="Tab: the focusable one keeps its ring">
      <Button className={`${styles.button} ${styles.disabledBoth}`} disabled>
        Disabled
      </Button>
      <Button className={`${styles.button} ${styles.disabledBoth}`} disabledFocusable>
        Disabled focusable
      </Button>
    </Example>
  </ExampleGrid>
);

export const ToggleStateExamples = (): React.ReactElement => {
  const [pressed, setPressed] = React.useState(false);
  const togglePressed = React.useCallback(() => setPressed(value => !value), []);

  return (
    <ExampleGrid>
      <Example variant="bad" hint="Looks pressed, but screen readers hear a plain button">
        <Button
          className={`${styles.button} ${styles.toggle} ${pressed ? styles.pressed : ''}`}
          onClick={togglePressed}
        >
          Bold
        </Button>
      </Example>
      <Example variant="good" hint="aria-pressed and data-checked come from the component">
        <ToggleButton className={`${styles.button} ${styles.toggle}`}>Bold</ToggleButton>
      </Example>
    </ExampleGrid>
  );
};
