import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { useId, Input, Label } from '@fluentui/react-components';

import styles from './InputSize.module.css';

export const Size = (): JSXElement => {
  const smallId = useId('input-small');
  const mediumId = useId('input-medium');
  const largeId = useId('input-large');

  return (
    <div className={styles.root}>
      <div>
        <Label size="small" htmlFor={smallId}>
          Small input
        </Label>
        <Input size="small" id={smallId} />
      </div>

      <div>
        <Label size="medium" htmlFor={mediumId}>
          Medium input
        </Label>
        <Input size="medium" id={mediumId} />
      </div>

      <div>
        <Label size="large" htmlFor={largeId}>
          Large input
        </Label>
        <Input size="large" id={largeId} />
      </div>
    </div>
  );
};

Size.parameters = {
  docs: {
    description: {
      story: 'An input can have different sizes.',
    },
  },
};
