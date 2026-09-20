import * as React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { HeartFilled } from '@fluentui/react-icons';
import { ColorSwatch } from '@fluentui/react-modern-components-preview/swatch-picker';

const useStyles = makeStyles({
  example: {
    display: 'flex',
    gap: '8px',
  },
  icon: {
    '@media (forced-colors: active)': {
      forcedColorAdjust: 'none',
    },
  },
});

export const ColorSwatchVariants = (): React.ReactNode => {
  const styles = useStyles();
  return (
    <div className={styles.example}>
      <ColorSwatch color="#E3008C" value="hot-pink-color" aria-label="Hot pink" />
      <ColorSwatch color="linear-gradient(0deg, #E3008C, #fff232)" value="gradient" aria-label="Gradient yellow pink" />
      <ColorSwatch
        color="#c8eeff"
        icon={<HeartFilled color="red" className={styles.icon} />}
        value="icon"
        aria-label="heart icon"
      />
      <ColorSwatch color="#016ab0" disabled value="blue" aria-label="blue" />
      <ColorSwatch color="#ff659a" value="initials" aria-label="initials">
        A
      </ColorSwatch>
      <ColorSwatch disabled color="#c8eeff" value="light-blue" aria-label="light blue" />
    </div>
  );
};

ColorSwatchVariants.parameters = {
  docs: {
    description: {
      story: '`ColorSwatch` component can have color, gradient, icon and initials.',
    },
  },
};
