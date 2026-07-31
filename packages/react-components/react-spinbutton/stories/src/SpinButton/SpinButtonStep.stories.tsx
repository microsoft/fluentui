import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { useId, Label, SpinButton } from '@fluentui/react-components';

import styles from './SpinButtonStep.module.css';

const useLayoutStyles = () => styles;

export const Step = (): JSXElement => {
  const layoutStyles = useLayoutStyles();
  const id = useId();

  return (
    <div className={layoutStyles.base}>
      <Label htmlFor={id}>Step Size</Label>
      <SpinButton defaultValue={10} step={2} stepPage={20} id={id} />
    </div>
  );
};

Step.parameters = {
  docs: {
    description: {
      story: `SpinButton step size can be set. Additionally \`stepPage\` can be
      set to a large value to allow bulk steps via the \`Page Up\` and \`Page Down\` keys.`,
    },
  },
};
