import * as React from 'react';
import { useId, Button, Label, makeStyles } from '@fluentui/react-components';
import { ColorArea, ColorAreaProps } from '@fluentui/react-color-picker-preview';
import { tinycolor } from '@ctrl/tinycolor';

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
  const id = useId();
  const hue = 0;
  const [x, setX] = React.useState(100);
  const [y, setY] = React.useState(100);
  const [color, setColor] = React.useState('');
  const onChange: ColorAreaProps['onChange'] = (_, data) => {
    data.x && setX(data.x);
    data.y && setY(data.y);
  };

  React.useEffect(() => {
    const _color = { h: hue, s: x, v: y };
    setColor(tinycolor(_color).toHexString());
  }, [x, y]);

  const resetSlider = () => {
    setX(0);
    setY(0);
  };

  return (
    <div className={styles.example}>
      <Label htmlFor={id}>
        ColorArea [ Current Values: X: {x} Y: {y} ]
      </Label>
      <ColorArea color={`hsl(${hue}, 100%, 50%)`} onChange={onChange} id={id} />
      <div className={styles.previewColor} style={{ backgroundColor: color }} />
      <Button onClick={resetSlider}>Reset</Button>
    </div>
  );
};
