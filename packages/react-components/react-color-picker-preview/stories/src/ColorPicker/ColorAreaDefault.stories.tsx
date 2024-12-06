import * as React from 'react';
import { Button, makeStyles, tokens } from '@fluentui/react-components';
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
    border: `1px solid ${tokens.colorNeutralStroke1}`,
  },
});

const DEFAULT_COLOR_HSV = tinycolor('#804066').toHsv();

export const ColorAreaExample = () => {
  const styles = useStyles();

  const [color, setColor] = React.useState(DEFAULT_COLOR_HSV);
  const onChange: ColorAreaProps['onChange'] = (_, data) => setColor({ ...data.color, a: data.color.a ?? 1 });
  const resetSlider = () => setColor(DEFAULT_COLOR_HSV);

  return (
    <div className={styles.example}>
      <ColorArea color={color} onChange={onChange} />
      <div className={styles.previewColor} style={{ backgroundColor: tinycolor(color).toHexString() }} />
      <Button onClick={resetSlider}>Reset</Button>
    </div>
  );
};

ColorAreaExample.parameters = {
  docs: {
    description: {
      story:
        'The `ColorArea` component allows users to adjust two channels of HSB color values against a two-dimensional gradient background.',
    },
  },
};
