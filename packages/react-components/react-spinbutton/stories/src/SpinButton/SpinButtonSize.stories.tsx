import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { useId, Label, SpinButton } from '@fluentui/react-components';

import styles from './SpinButtonSize.module.css';

const useLayoutStyles = () => styles;

export const Size = (): JSXElement => {
  const layoutStyles = useLayoutStyles();
  const smallId = useId('small-id');
  const mediumId = useId('medium-id');

  return (
    <div className={layoutStyles.base}>
      <div>
        <Label htmlFor={smallId}>Small</Label>
        <SpinButton size="small" id={smallId} />
      </div>

      <div>
        <Label htmlFor={mediumId}>Medium (default)</Label>
        <SpinButton id={mediumId} />
      </div>
    </div>
  );
};

Size.parameters = {
  docs: {
    description: {
      story: `SpinButton can have different sizes.`,
    },
  },
};
