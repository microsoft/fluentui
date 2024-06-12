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

export const Bounds = () => {
  const layoutStyles = useLayoutStyles();
  const id = useId();

  return (
    <div className={layoutStyles.base}>
      <Label htmlFor={id}>Bounded SpinButton</Label>
      <SpinButton defaultValue={10} min={0} max={20} id={id} />
      <p>min: 0, max: 20</p>
    </div>
  );
};

Bounds.parameters = {
  docs: {
    description: {
      story: `SpinButton can be bounded with the \`min\` and \`max\` props.
      Using the spin buttons or hotkeys will clamp values in the range of [min, max].
      Users may type a value outside the range into the text input and it will not be clamped
      by the control. Pressing the "home" key will set the value to \`min\` and pressing the "end"
      key will set the value to \`max\` when the props are set.`,
    },
  },
};
