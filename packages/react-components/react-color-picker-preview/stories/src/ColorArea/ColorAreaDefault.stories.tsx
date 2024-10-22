import * as React from 'react';
import { Button, makeStyles, tokens } from '@fluentui/react-components';
import { ColorArea, ColorAreaProps } from '@fluentui/react-color-picker-preview';

const useStyles = makeStyles({
  example: {
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  previewColor: {
    width: '50px',
    height: '50px',
    borderRadius: '4px',
    border: `1px solid ${tokens.colorNeutralStroke1}`,
  },
});

const DEFAULT_COLOR = '#ff0000';

export const Default = () => {
  const styles = useStyles();

  const [color, setColor] = React.useState(DEFAULT_COLOR);
  const onChange: ColorAreaProps['onChange'] = (_, data) => setColor(data.color);
  const resetSlider = () => setColor(DEFAULT_COLOR);

  return (
    <div className={styles.example}>
      <ColorArea color={color} onChange={onChange} />
      <div className={styles.previewColor} style={{ backgroundColor: color }} />
      <Button onClick={resetSlider}>Reset</Button>
    </div>
  );
};
