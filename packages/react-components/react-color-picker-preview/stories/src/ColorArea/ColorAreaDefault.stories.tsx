import * as React from 'react';
import { Button, makeStyles } from '@fluentui/react-components';
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
    border: '1px solid #ccc',
  },
});
export const Default = () => {
  const styles = useStyles();
  const defaultColor = '#ff0000';
  const [color, setColor] = React.useState(defaultColor);
  const onChange: ColorAreaProps['onChange'] = (_, data) => setColor(data.color);
  const resetSlider = () => setColor(defaultColor);

  return (
    <div className={styles.example}>
      <ColorArea color={defaultColor} onChange={onChange} />
      <div className={styles.previewColor} style={{ backgroundColor: color }} />
      <Button onClick={resetSlider}>Reset</Button>
    </div>
  );
};
