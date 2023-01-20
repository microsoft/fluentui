import * as React from 'react';
import { makeStyles, tokens, useId, Label, SpinButton } from '@fluentui/react-components';

const useLayoutStyles = makeStyles({
  base: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '500px',

    '> label': {
      marginBottom: tokens.spacingVerticalXXS,
    },
  },
});

export const Step = () => {
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
