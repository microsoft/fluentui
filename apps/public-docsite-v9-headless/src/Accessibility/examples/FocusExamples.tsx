import * as React from 'react';
import { Button } from '@fluentui/react-headless-components-preview/button';

import { Example, ExampleGrid } from './Example';
import styles from './accessibility.module.css';

export const FocusRingExamples = (): React.ReactElement => (
  <ExampleGrid>
    <Example variant="bad" hint="Tab to the button: there is no ring">
      <Button className={`${styles.button} ${styles.noRing}`}>Save</Button>
    </Example>
    <Example variant="good" hint="Tab to the button">
      <Button className={`${styles.button} ${styles.ring}`}>Save</Button>
    </Example>
  </ExampleGrid>
);
