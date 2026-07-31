import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { useId, Label, SpinButton } from '@fluentui/react-components';

import styles from './SpinButtonDisabled.module.css';

const useLayoutStyles = () => styles;

export const Disabled = (): JSXElement => {
  const layoutStyles = useLayoutStyles();
  const id = useId();

  return (
    <div className={layoutStyles.base}>
      <Label htmlFor={id}>Disabled</Label>
      <SpinButton disabled id={id} />
    </div>
  );
};

Disabled.parameters = {
  docs: {
    description: {
      story: `SpinButton can be disabled.`,
    },
  },
};
