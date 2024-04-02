import * as React from 'react';
import { HeartFilled } from '@fluentui/react-icons';
import { makeStyles, shorthands } from '@fluentui/react-components';
import { ColorSwatch } from '@fluentui/react-swatch-picker-preview';

const useStyles = makeStyles({
  example: {
    display: 'flex',
    ...shorthands.gap('8px'),
  },
});

export const ColorSwatchVariants = () => {
  const styles = useStyles();
  return (
    <div className={styles.example}>
      <ColorSwatch color="purple" value="purple-color" aria-label="Purple" />
      <ColorSwatch color="#E3008C" value="hot-pink-color" aria-label="Hot pink" />
      <ColorSwatch color="linear-gradient(0deg, #E3008C, #fff232)" value="gradient" aria-label="Gradient yellow pink" />
      <ColorSwatch color="#6fc8ff" disabled value="light-blue" aria-label="light-blue" />
      <ColorSwatch color="#c8eeff" icon={<HeartFilled color="red" />} value="icon" aria-label="heart-icon" />
      <ColorSwatch color="#016ab0" disabled value="blue" aria-label="blue" />
      <ColorSwatch color="#ff659a" value="initials" aria-label="initials">
        A
      </ColorSwatch>
    </div>
  );
};
