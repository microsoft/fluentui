import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { useId, Label, SpinButton } from '@fluentui/react-components';

import styles from './SpinButtonUncontrolled.module.css';

const useLayoutStyles = () => styles;

export const Uncontrolled = (): JSXElement => {
  const layoutStyles = useLayoutStyles();
  const id = useId();

  return (
    <div className={layoutStyles.base}>
      <Label htmlFor={id}>Uncontrolled SpinButton</Label>
      <SpinButton defaultValue={10} id={id} />
    </div>
  );
};

Uncontrolled.parameters = {
  docs: {
    description: {
      story: `An uncontrolled SpinButton`,
    },
  },
};
